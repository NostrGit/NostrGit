package gitnostr

import (
	"fmt"
	"os/user"
	"path/filepath"
	"strings"
)

func ResolvePath(path string) (string, error) {

	usr, err := user.Current()
	if err != nil {
		return path, fmt.Errorf("current user : %w", err)
	}
	homeDir := usr.HomeDir

	if path == "~" {
		return homeDir, nil
	} else if strings.HasPrefix(path, "~/") {
		return filepath.Join(homeDir, path[2:]), nil
	} else {
		return path, nil
	}
}
