package protocol

type Repository struct {
	RepositoryName string `json:"repositoryName"`
	PublicRead     bool   `json:"publicRead"`
	PublicWrite    bool   `json:"publicWrite"`
	GitSshBase     string `json:"gitSshBase"`
}
