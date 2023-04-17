package main

import (
	"fmt"
	"log"
	"os"
	"time"

	"github.com/nbd-wtf/go-nostr"
	"github.com/spearson78/gitnostr"
)

func advertiseRelays(pool *nostr.RelayPool, relays []string) {
	var tags nostr.Tags

	for _, relay := range relays {
		tags = append(tags, nostr.Tag{"r", relay})
	}

	_, _, err := pool.PublishEvent(&nostr.Event{
		CreatedAt: time.Now(),
		Kind:      10002, //Relay list metadata
		Tags:      tags,
		Content:   "",
	})
	if err != nil {
		log.Println("advertise relays", err)
	}
}

func connectNostr(relays []string) (*nostr.RelayPool, error) {

	pool := nostr.NewRelayPool()

	for _, relay := range relays {
		cherr := pool.Add(relay, nostr.SimplePolicy{
			Read:  true,
			Write: true,
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

func main() {

	if len(os.Args) > 1 && os.Args[1] == "license" {
		fmt.Println(gitnostr.Licenses)
		os.Exit(0)
	}

	cfg, err := LoadConfig("~/.config/git-nostr")
	if err != nil {
		log.Fatal(err)
	}

	pool, err := connectNostr(cfg.Relays)
	if err != nil {
		log.Fatal(err)
	}
	pool.SecretKey = &cfg.PrivateKey

	//Doesn't seem to be supported by any relays
	//advertiseRelays(pool, cfg.Relays)

	cmd := os.Args[1]
	switch cmd {
	case "repo":
		subcmd := os.Args[2]
		switch subcmd {
		case "create":
			repoCreate(cfg, pool)
		case "clone":
			repoClone(cfg, pool)
		case "permission":
			repoPermission(cfg, pool)
		default:
			log.Fatalf("unknown repo sub command %v", subcmd)
		}
	case "ssh-key":
		subcmd := os.Args[2]
		switch subcmd {
		case "add":
			sshKeyAdd(cfg, pool)
		default:
			log.Fatalf("unknown repo sub command %v", subcmd)
		}
	default:
		log.Fatalf("unknown command %v", cmd)
	}
}
