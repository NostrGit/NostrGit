package main

import (
	"database/sql"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/nbd-wtf/go-nostr"
	"github.com/spearson78/gitnostr"
	"github.com/spearson78/gitnostr/bridge"
	"github.com/spearson78/gitnostr/protocol"
)

func getSshKeyPubKeys(db *sql.DB) ([]string, error) {

	var sshKeyPubKeys []string
	rows, err := db.Query("SELECT DISTINCT(TargetPubKey) FROM RepositoryPermission")
	if err != nil {
		return nil, err
	}

	for rows.Next() {
		var targetPubKey string
		err := rows.Scan(&targetPubKey)
		if err != nil {
			return nil, err
		}

		sshKeyPubKeys = append(sshKeyPubKeys, targetPubKey)
	}

	return sshKeyPubKeys, nil

}

func connectNostr(relays []string) (*nostr.RelayPool, error) {

	pool := nostr.NewRelayPool()

	for _, relay := range relays {
		cherr := pool.Add(relay, nostr.SimplePolicy{
			Read:  true,
			Write: false,
		})
		err := <-cherr
		if err != nil {
			log.Printf("relay connect failed : %v\n", err)
		}
	}

	relayConnected := false
	pool.Relays.Range(func(key string, r *nostr.Relay) bool {
		relayConnected = true
		return false
	})
	if !relayConnected {
		return nil, fmt.Errorf("no relays connected")
	}

	go func() {
		for notice := range pool.Notices {
			log.Printf("notice: %s '%s'\n", notice.Relay, notice.Message)
		}
	}()

	return pool, nil
}

func updateSince(kind int, updatedAt int64, db *sql.DB) error {
	_, err := db.Exec("INSERT INTO Since (Kind,UpdatedAt) VALUES (?,?) ON CONFLICT DO UPDATE SET UpdatedAt=? WHERE UpdatedAt<?;", kind, updatedAt, updatedAt, updatedAt)
	if err != nil {
		return fmt.Errorf("insert since failed: %w", err)
	}

	return nil
}

func getSince(db *sql.DB) (map[int]*time.Time, error) {

	since := make(map[int]*time.Time)
	rows, err := db.Query("SELECT Kind,UpdatedAt FROM Since")
	if err != nil {
		return nil, err
	}

	for rows.Next() {
		var kind int
		var updatedAt int64
		err := rows.Scan(&kind, &updatedAt)
		if err != nil {
			return nil, err
		}

		t := time.Unix(updatedAt, 0).Add(-1 * time.Hour) //Subtract an hour to avoid missing events due to clock skew
		since[kind] = &t
	}

	return since, nil
}

func main() {

	if len(os.Args) > 1 && os.Args[1] == "license" {
		fmt.Println(gitnostr.Licenses)
		os.Exit(0)
	}

	cfg, err := bridge.LoadConfig("~/.config/git-nostr")
	if err != nil {
		log.Fatal(err)
	}

	db, err := bridge.OpenDb(cfg.DbFile)
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	sshDir, err := gitnostr.ResolvePath("~/.ssh")
	if err != nil {
		log.Fatal(err)
	}
	os.MkdirAll(sshDir, 0700)

	err = updateAuthorizedKeys(db)
	if err != nil {
		log.Fatal(err)
	}

	sshKeyPubKeys, err := getSshKeyPubKeys(db)
	if err != nil {
		log.Fatal(err)
	}

	for {
		pool, err := connectNostr(cfg.Relays)
		if err != nil {
			log.Fatal(err)
		}

		since, err := getSince(db)
		if err != nil {
			log.Fatal(err)
		}

		_, gitNostrEvents := pool.Sub(nostr.Filters{
			{
				Authors: cfg.GitRepoOwners,
				Kinds:   []int{protocol.KindRepository, protocol.KindRepositoryPermission},
				Since:   since[protocol.KindRepository],
			},
			{
				Authors: sshKeyPubKeys,
				Kinds:   []int{protocol.KindSshKey},
				Since:   since[protocol.KindSshKey],
			},
		})

	exit:
		for event := range nostr.Unique(gitNostrEvents) {
			switch event.Kind {
			case protocol.KindRepository:
				err := handleRepositoryEvent(event, db, cfg)
				if err != nil {
					log.Println(err)
					continue
				}

				err = updateSince(protocol.KindRepository, event.CreatedAt.Unix(), db)
				if err != nil {
					log.Println(err)
					continue
				}

			case protocol.KindSshKey:
				err := handleSshKeyEvent(event, db, cfg)
				if err != nil {
					log.Println(err)
					continue
				}

				err = updateSince(protocol.KindSshKey, event.CreatedAt.Unix(), db)
				if err != nil {
					log.Println(err)
					continue
				}

			case protocol.KindRepositoryPermission:
				err := handleRepositorPermission(event, db, cfg)
				if err != nil {
					log.Println(err)
					continue
				}

				err = updateSince(protocol.KindRepository, event.CreatedAt.Unix(), db) //Permissions are queried in the same filter as KindRepository
				if err != nil {
					log.Println(err)
					continue
				}

				newSshKeyPubKeys, err := getSshKeyPubKeys(db)
				if err != nil {
					log.Println(err)
					continue
				}

				if len(newSshKeyPubKeys) != len(sshKeyPubKeys) {
					sshKeyPubKeys = newSshKeyPubKeys
					//There doesn't seem to be a function to cancel the subscription and resubscribe so I have to reconnect
					pool.Relays.Range(func(key string, value *nostr.Relay) bool {
						pool.Remove(key)
						value.Close()
						return true
					})
					break exit
				}

			}
		}
	}

}
