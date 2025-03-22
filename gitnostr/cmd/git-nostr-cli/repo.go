package main

import (
	"context"
	"encoding/json"
	"flag"
	"fmt"
	"log"
	"os"
	"os/exec"
	"strings"
	"time"

	"github.com/nbd-wtf/go-nostr"
	"github.com/spearson78/gitnostr"
	"github.com/spearson78/gitnostr/protocol"
)

func repoCreate(cfg Config, pool *nostr.RelayPool) {
	flags := flag.NewFlagSet("repo create", flag.ContinueOnError)

	publicRead := flags.Bool("public-read", true, "repository will be readable by all users")
	publicWrite := flags.Bool("public-write", false, "repository will be writeable by all users")

	flags.Parse(os.Args[3:])

	repoName := flags.Args()[0]

	log.Println("repo create --public-read=", *publicRead, " --public-write=", *publicWrite, " ", repoName)

	repoJson, err := json.Marshal(protocol.Repository{
		RepositoryName: repoName,
		PublicRead:     *publicRead,
		PublicWrite:    *publicWrite,
		GitSshBase:     cfg.GitSshBase,
	})
	if err != nil {
		log.Fatal("repo marshal :", err)
	}

	var tags nostr.Tags
	_, statuses, err := pool.PublishEvent(&nostr.Event{
		CreatedAt: time.Now(),
		Kind:      protocol.KindRepository,
		Tags:      tags,
		Content:   string(repoJson),
	})
	if err != nil {
		log.Fatal(err)
	}

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	publishSuccess := false

	for {
		select {
		case <-ctx.Done():
			if !publishSuccess {
				fmt.Printf("repository was not published")
				os.Exit(1)
			}
			return
		case status := <-statuses:
			switch status.Status {
			case nostr.PublishStatusSent:
				publishSuccess = true
				fmt.Printf("published repository to '%s'.\n", status.Relay)
			case nostr.PublishStatusFailed:
				fmt.Printf("failed to publish repository to '%s'.\n", status.Relay)
			case nostr.PublishStatusSucceeded:
				publishSuccess = true
				fmt.Printf("published repository to '%s'.\n", status.Relay)
			}
		}
	}
}

func repoPermission(cfg Config, pool *nostr.RelayPool) {

	targetPubKey, err := gitnostr.ResolveHexPubKey(os.Args[4])
	if err != nil {
		log.Fatal(err)
	}

	permJson, err := json.Marshal(protocol.RepositoryPermission{
		RepositoryName: os.Args[3],
		TargetPubKey:   targetPubKey,
		Permission:     os.Args[5],
	})

	if err != nil {
		log.Fatal("permission marshal :", err)
	}

	var tags nostr.Tags
	_, statuses, err := pool.PublishEvent(&nostr.Event{
		CreatedAt: time.Now(),
		Kind:      protocol.KindRepositoryPermission,
		Tags:      tags,
		Content:   string(permJson),
	})
	if err != nil {
		log.Fatal(err)
	}

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	publishSuccess := false

	for {
		select {
		case <-ctx.Done():
			if !publishSuccess {
				fmt.Printf("permission was not published")
				os.Exit(1)
			}
			return
		case status := <-statuses:
			switch status.Status {
			case nostr.PublishStatusSent:
				publishSuccess = true
				fmt.Printf("published permission to '%s'.\n", status.Relay)
			case nostr.PublishStatusFailed:
				fmt.Printf("failed to publish permission to '%s'.\n", status.Relay)
			case nostr.PublishStatusSucceeded:
				publishSuccess = true
				fmt.Printf("published permission to '%s'.\n", status.Relay)
			}
		}
	}

}

func repoClone(cfg Config, pool *nostr.RelayPool) {

	repoParam := os.Args[3]
	// steve@localhost:public

	split := strings.SplitN(repoParam, ":", 2)

	name := split[0]
	repoName := split[1]

	identifier, err := gitnostr.ResolveHexPubKey(name)
	if err != nil {
		log.Fatal(err)
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	_, subchan := pool.Sub(nostr.Filters{{Kinds: []int{protocol.KindRepository}, Authors: []string{identifier}}})

	var pubKey string
	var repository protocol.Repository

	for {
		select {
		case <-ctx.Done():
			if pubKey != "" {
				log.Println("git", "clone", repository.GitSshBase+":"+pubKey+"/"+repoName)
				cmd := exec.Command("git", "clone", repository.GitSshBase+":"+pubKey+"/"+repoName)
				cmd.Stdout = os.Stdout
				cmd.Stdin = os.Stdin
				cmd.Stderr = os.Stderr
				err := cmd.Run()
				if err != nil {
					log.Fatal(err)
				}
			} else {
				log.Fatal("Repo not found")
			}

			return
		case event := <-subchan:
			var checkRepo protocol.Repository

			err := json.Unmarshal([]byte(event.Event.Content), &checkRepo)
			if err != nil {
				log.Println("Failed to parse repository.")
			}

			if checkRepo.RepositoryName == repoName {
				repository = checkRepo
				pubKey = event.Event.PubKey
			}
		}
	}
}
