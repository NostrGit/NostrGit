package bridge

import "strings"

func IsValidRepoName(repoName string) bool {
	return len(repoName) > 0 && !strings.ContainsAny(repoName, " /.")
}
