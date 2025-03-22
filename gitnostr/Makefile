CGO_ENABLED=0

.PHONY: git-nostr-bridge
git-nostr-bridge:
	go build -tags netgo -ldflags="-s -w" -trimpath -o ./bin/git-nostr-bridge ./cmd/git-nostr-bridge
	go build -tags netgo -ldflags="-s -w" -trimpath -o ./bin/git-nostr-ssh ./cmd/git-nostr-ssh

.PHONY: git-nostr-cli
git-nostr-cli:
	go build -tags netgo -ldflags="-s -w" -trimpath -o ./bin/gn ./cmd/git-nostr-cli

.PHONY: all
all: git-nostr-bridge git-nostr-cli