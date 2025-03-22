package main

import (
	"context"
	"flag"
	"fmt"
	"io/ioutil"
	"log"
	"os"
	"strings"
	"time"

	"github.com/nbd-wtf/go-nostr"
	"github.com/spearson78/gitnostr/protocol"
)

func sshKeyAdd(cfg Config, pool *nostr.RelayPool) {

	flags := flag.NewFlagSet("ssh-key add", flag.ContinueOnError)

	title := flags.String("title", "", "override the title from the key file")

	flags.Parse(os.Args[3:])

	keyFilePath := flags.Arg(0)

	keyData, err := ioutil.ReadFile(keyFilePath)
	if err != nil {
		log.Fatalf("read key file : %v", err)
	}

	split := strings.Split(string(keyData), " ")
	if len(split) != 3 {
		log.Fatal("key file parse error")
	}

	if *title != "" {
		split[2] = *title
	}

	var tags nostr.Tags
	_, statuses, err := pool.PublishEvent(&nostr.Event{
		CreatedAt: time.Now(),
		Kind:      protocol.KindSshKey,
		Tags:      tags,
		Content:   strings.Join(split, " "),
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
				fmt.Printf("ssh-key was not added")
				os.Exit(1)
			}
			return
		case status := <-statuses:
			switch status.Status {
			case nostr.PublishStatusSent:
				publishSuccess = true
				fmt.Printf("ssh-key added to '%s'.\n", status.Relay)
			case nostr.PublishStatusFailed:
				fmt.Printf("failed to add ssh-key to '%s'.\n", status.Relay)
			case nostr.PublishStatusSucceeded:
				publishSuccess = true
				fmt.Printf("ssh-key added to '%s'.\n", status.Relay)
			}
		}
	}

}
