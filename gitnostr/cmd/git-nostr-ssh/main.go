package main

import (
	"database/sql"
	"encoding/hex"
	"errors"
	"fmt"
	"os"
	"os/exec"
	"path/filepath"
	"strings"

	"github.com/spearson78/gitnostr"
	"github.com/spearson78/gitnostr/bridge"
)

func isReadAllowed(rights *string) bool {
	return rights != nil && (*rights == "ADMIN" || *rights == "READ" || *rights == "WRITE")
}

func isWriteAllowed(rights *string) bool {
	return rights != nil && (*rights == "ADMIN" || *rights == "WRITE")
}

func isAdminAllowed(rights *string) bool {
	return rights != nil && (*rights == "ADMIN")
}

func main() {
	if len(os.Args) > 1 && os.Args[1] == "license" {
		fmt.Println(gitnostr.Licenses)
		os.Exit(1)
	}

	if len(os.Args) != 2 {
		fmt.Fprintln(os.Stderr, "interactive login not allowed")
		os.Exit(1)
	}

	targetPubKey := os.Args[1]

	sshCommand := os.Getenv("SSH_ORIGINAL_COMMAND")
	if sshCommand == "" {
		fmt.Fprintln(os.Stderr, "interactive login not allowed")
		os.Exit(1)
	}

	cfg, err := bridge.LoadConfig("~/.config/git-nostr")
	if err != nil {
		fmt.Fprintln(os.Stderr, "config error :", err)
		os.Exit(1)
	}

	split := strings.SplitN(sshCommand, " ", 2)
	verb := split[0]
	repoParam := strings.Trim(split[1], "'")
	repoSplit := strings.SplitN(repoParam, "/", 2)
	if len(repoSplit) != 2 {
		fmt.Fprintf(os.Stderr, "repository name missing / : %v", repoParam)
		os.Exit(1)
	}

	ownerPubKey := repoSplit[0]
	_, err = hex.DecodeString(ownerPubKey)
	if err != nil {
		fmt.Fprintln(os.Stderr, "invalid repository pubkey", repoParam)
		os.Exit(1)
	}

	repoName := repoSplit[1]
	if !bridge.IsValidRepoName(repoName) {
		fmt.Fprintln(os.Stderr, "invalid repository name", repoName)
		os.Exit(1)
	}

	reposDir, err := gitnostr.ResolvePath(cfg.RepositoryDir)
	if err != nil {
		fmt.Fprintln(os.Stderr, "config error")
		os.Exit(1)
	}

	repoParentPath := filepath.Join(reposDir, ownerPubKey)

	repoPath := filepath.Join(repoParentPath, repoName+".git")
	_, err = os.Stat(repoPath)
	if err != nil {
		fmt.Fprintln(os.Stderr, "repository not found")
		os.Exit(1)
	}

	db, err := bridge.OpenDb(cfg.DbFile)
	if err != nil {
		fmt.Fprintln(os.Stderr, "config error db")
		os.Exit(1)
	}
	defer db.Close()

	row := db.QueryRow("SELECT Repository.PublicRead,Repository.PublicWrite,RepositoryPermission.Permission FROM Repository LEFT OUTER JOIN RepositoryPermission ON Repository.OwnerPubKey=RepositoryPermission.OwnerPubKey AND Repository.RepositoryName=RepositoryPermission.RepositoryName AND TargetPubKey=? WHERE Repository.OwnerPubKey=? AND Repository.RepositoryName=?", targetPubKey, ownerPubKey, repoName)

	var publicRead bool
	var publicWrite bool
	var permission *string
	err = row.Scan(&publicRead, &publicWrite, &permission)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			//ignore
		} else {
			fmt.Fprintln(os.Stderr, "permission error")
			os.Exit(1)
		}
	}

	row = db.QueryRow("SELECT PublicRead,PublicWrite FROM RepositoryPermission WHERE OwnerPubKey=? AND RepositoryName=? AND TargetPubKey=?", ownerPubKey, repoName, targetPubKey)

	switch verb {
	case "git-upload-pack":
		if !publicRead && !isReadAllowed(permission) {
			fmt.Fprintln(os.Stderr, "permission denied")
			os.Exit(1)
		}
	case "git-receive-pack":
		if !publicWrite && !isWriteAllowed(permission) {
			fmt.Fprintln(os.Stderr, "permission denied")
			os.Exit(1)
		}
	default:
		if !isAdminAllowed(permission) {
			fmt.Fprintln(os.Stderr, "permission denied")
			os.Exit(1)
		}
	}

	c := exec.Command("git", "shell", "-c", verb+" '"+repoPath+"'")
	c.Stdout = os.Stdout
	c.Stdin = os.Stdin
	c.Stderr = os.Stderr

	err = c.Run()
	if err != nil {
		fmt.Fprintln(os.Stderr, "git error:", err)
		if e := (&exec.ExitError{}); errors.As(err, &e) {
			os.Exit(e.ExitCode())
		} else {
			os.Exit(1)
		}
	}
}
