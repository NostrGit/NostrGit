package main

import (
	"database/sql"
	"encoding/json"
	"errors"
	"fmt"
	"io/fs"
	"log"
	"os"
	"os/exec"
	"path/filepath"

	"github.com/nbd-wtf/go-nostr"
	"github.com/spearson78/gitnostr"
	"github.com/spearson78/gitnostr/bridge"
	"github.com/spearson78/gitnostr/protocol"
)

func handleRepositoryEvent(event nostr.Event, db *sql.DB, cfg bridge.Config) error {

	var repo protocol.Repository
	err := json.Unmarshal([]byte(event.Content), &repo)
	if err != nil {
		return fmt.Errorf("malformed repository: %w : %v", err, event.Content)
	}

	if !bridge.IsValidRepoName(repo.RepositoryName) {
		return fmt.Errorf("invalid repository name: %v", repo.RepositoryName)
	}

	updatedAt := event.CreatedAt.Unix()
	res, err := db.Exec("INSERT INTO Repository (OwnerPubKey,RepositoryName,PublicRead,PublicWrite,UpdatedAt) VALUES (?,?,?,?,?) ON CONFLICT DO UPDATE SET PublicRead=?,PublicWrite=?,UpdatedAt=? WHERE UpdatedAt<?;", event.PubKey, repo.RepositoryName, repo.PublicRead, repo.PublicWrite, updatedAt, repo.PublicRead, repo.PublicWrite, updatedAt, updatedAt)
	if err != nil {
		return fmt.Errorf("insert repository failed: %w", err)
	}

	affected, err := res.RowsAffected()
	if err != nil {
		return fmt.Errorf("rows affected failed: %w", err)
	}

	if affected == 1 {
		log.Println("repository updated", event.Content)
	}

	reposDir, err := gitnostr.ResolvePath(cfg.RepositoryDir)
	if err != nil {
		return fmt.Errorf("resolve repos path : %w", err)
	}

	repoParentPath := filepath.Join(reposDir, event.PubKey)
	err = os.MkdirAll(repoParentPath, 0700)
	if err != nil {
		if errors.Is(err, fs.ErrExist) {
			//Ignore
		} else {
			return fmt.Errorf("repository path mkdir: %w", err)
		}
	}

	_, err = os.Stat(filepath.Join(repoParentPath, repo.RepositoryName+".git"))
	if err != nil {
		if errors.Is(err, fs.ErrNotExist) {
			log.Println("git", "init", "--bare", repo.RepositoryName+".git")
			cmd := exec.Command("git", "init", "--bare", repo.RepositoryName+".git")
			cmd.Dir = repoParentPath

			err = cmd.Run()
			if err != nil {
				return fmt.Errorf("git init --bare failed : %w", err)
			}
		} else {
			return fmt.Errorf("git repository stat: %w", err)
		}
	}

	return nil
}

func handleRepositorPermission(event nostr.Event, db *sql.DB, cfg bridge.Config) error {

	var perm protocol.RepositoryPermission
	err := json.Unmarshal([]byte(event.Content), &perm)
	if err != nil {
		return fmt.Errorf("malformed permission: %w : %v", err, event.Content)
	}

	if !bridge.IsValidRepoName(perm.RepositoryName) {
		return fmt.Errorf("invalid repository name: %v", perm.RepositoryName)
	}

	updatedAt := event.CreatedAt.Unix()
	res, err := db.Exec("INSERT INTO RepositoryPermission (OwnerPubKey,RepositoryName,TargetPubKey,Permission,UpdatedAt) VALUES (?,?,?,?,?) ON CONFLICT DO UPDATE SET Permission=?,UpdatedAt=? WHERE UpdatedAt<?;", event.PubKey, perm.RepositoryName, perm.TargetPubKey, perm.Permission, updatedAt, perm.Permission, updatedAt, updatedAt)
	if err != nil {
		return fmt.Errorf("insert permission failed: %w", err)
	}

	affected, err := res.RowsAffected()
	if err != nil {
		return fmt.Errorf("rows affected failed: %w", err)
	}

	if affected == 1 {
		log.Println("permission updated", event.Content)
	}

	return nil
}
