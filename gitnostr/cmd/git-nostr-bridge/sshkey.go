package main

import (
	"database/sql"
	"fmt"
	"log"
	"os"
	"path/filepath"
	"strings"

	"github.com/nbd-wtf/go-nostr"
	"github.com/spearson78/gitnostr"
	"github.com/spearson78/gitnostr/bridge"
)

func updateAuthorizedKeys(db *sql.DB) error {

	bridgeExePath, err := os.Readlink("/proc/self/exe")
	if err != nil {
		return err
	}
	cmd := filepath.Join(filepath.Dir(bridgeExePath), "git-nostr-ssh")

	sshDir, err := gitnostr.ResolvePath("~/.ssh")
	if err != nil {
		return err
	}

	newAuthorizedKeysPath := filepath.Join(sshDir, "authorized_keys.new")

	w, err := os.OpenFile(newAuthorizedKeysPath, os.O_WRONLY|os.O_TRUNC|os.O_CREATE, 0644)
	if err != nil {
		return err
	}
	defer w.Close()

	rows, err := db.Query("SELECT PubKey,SshKey FROM AuthorizedKeys")
	if err != nil {
		return err
	}
	defer rows.Close()

	for rows.Next() {
		var pubKey string
		var sshKey string

		err := rows.Scan(&pubKey, &sshKey)
		if err != nil {
			return err
		}

		fmt.Fprintf(w, "command=\"%v %v\",no-port-forwarding,no-X11-forwarding,no-agent-forwarding,no-pty %v\n", cmd, pubKey, sshKey)
	}
	err = rows.Close()
	if err != nil {
		return err
	}

	err = w.Close()
	if err != nil {
		return err
	}

	authorizedKeysPath := filepath.Join(sshDir, "authorized_keys")

	err = os.Rename(newAuthorizedKeysPath, authorizedKeysPath)
	if err != nil {
		return err
	}

	return nil
}

func handleSshKeyEvent(event nostr.Event, db *sql.DB, cfg bridge.Config) error {

	keyData := event.Content

	//TODO: more stringent checks
	if len(strings.Split(keyData, " ")) != 3 {
		return fmt.Errorf("invalid key data: %v", keyData)
	}

	updatedAt := event.CreatedAt.Unix()
	res, err := db.Exec("INSERT INTO AuthorizedKeys (PubKey,SshKey,UpdatedAt) VALUES (?,?,?) ON CONFLICT DO UPDATE SET SshKey=?,UpdatedAt=? WHERE UpdatedAt<?;", event.PubKey, keyData, updatedAt, keyData, updatedAt, updatedAt)
	if err != nil {
		return fmt.Errorf("insert ssh-key failed: %w", err)
	}

	affected, err := res.RowsAffected()
	if err != nil {
		return fmt.Errorf("rows affected failed: %w", err)
	}

	if affected == 1 {
		log.Println("ssh-key updated", event.Content)
	}

	return updateAuthorizedKeys(db)
}
