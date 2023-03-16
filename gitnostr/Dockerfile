# Use the official Go image as a base
FROM golang:latest

# Set the working directory
WORKDIR /usr/src/gitnostr

# Copy the source code
COPY . .

# Build the binary
RUN CGO_ENABLED=0 go build -tags netgo -ldflags="-s -w" -trimpath -o ./bin/git-nostr-bridge ./cmd/git-nostr-bridge
RUN CGO_ENABLED=0 go build -tags netgo -ldflags="-s -w" -trimpath -o ./bin/git-nostr-ssh ./cmd/git-nostr-ssh
RUN CGO_ENABLED=0 go build -tags netgo -ldflags="-s -w" -trimpath -o ./bin/gn ./cmd/git-nostr-cli

# Create a non-root user
RUN adduser --disabled-password --gecos '' git-nostr

# Change ownership of config directory to appuser
RUN mkdir -p /home/git-nostr/.config/git-nostr && chown -R git-nostr:git-nostr /home/git-nostr/.config

# Switch to the appuser
USER git-nostr

# Configure git-nostr-bridge
RUN echo `{"repositoryDir": "~/git-nostr-repositories","DbFile": "~/.config/git-nostr/git-nostr-db.sqlite","relays": ["wss://relay.damus.io", "wss://nostr.fmt.wiz.biz", "wss://nos.lol"],"gitRepoOwners": ["d110dbcc4f87d21e367987f5348eb763228e8a6eec79a2f97ebe728b3d7874a7"]}` >> ~/.config/git-nostr/git-nostr-bridge.json

# Set the default command to run when the container starts
CMD ["./bin/git-nostr-bridge", "-config=/home/appuser/.config/git-nostr/git-nostr-bridge.json"]