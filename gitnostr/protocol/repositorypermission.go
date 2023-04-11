package protocol

type RepositoryPermission struct {
	RepositoryName string `json:"repositoryName"`
	TargetPubKey   string `json:"targetPubKey"`
	Permission     string `json:"permission"`
}
