package gitnostr

import (
	"encoding/hex"
	"fmt"
	"log"
	"strings"

	"github.com/nbd-wtf/go-nostr/nip05"
)

func resolveNip05(name string) string {
	if name == "steve@localhost" {
		return "e0e7807d354ea7662412d99856335e1923b0b57b6668575bf320837f6b1816e3"
	}

	identifier := nip05.QueryIdentifier(name)

	return identifier
}

func ResolveHexPubKey(pubKeyStr string) (string, error) {

	if strings.Contains(pubKeyStr, "@") {
		resolved := resolveNip05(pubKeyStr)
		if resolved == "" {
			return "", fmt.Errorf("couldnot resolve nip05 pub key %v", pubKeyStr)
		} else {
			log.Println(pubKeyStr, "->", resolved)
			return resolved, nil
		}
	} else {
		_, err := hex.DecodeString(pubKeyStr)
		return pubKeyStr, err
	}
}
