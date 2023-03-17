# Use the official Go image as a base
FROM golang:latest

# Set the working directory
WORKDIR /usr/gitnostr

# Copy the source code
COPY . .

# Install openssh-server
RUN apt-get update && apt-get install -y openssh-server

# Generate a new SSH key for the root user
RUN ssh-keygen -t rsa -f /root/.ssh/id_rsa -N ''

# Allow root login via SSH
RUN sed -i 's/#PermitRootLogin prohibit-password/PermitRootLogin yes/' /etc/ssh/sshd_config

# Build the binary
RUN CGO_ENABLED=0 go build -tags netgo -ldflags="-s -w" -trimpath -o ./bin/git-nostr-bridge ./cmd/git-nostr-bridge
RUN CGO_ENABLED=0 go build -tags netgo -ldflags="-s -w" -trimpath -o ./bin/git-nostr-ssh ./cmd/git-nostr-ssh
RUN CGO_ENABLED=0 go build -tags netgo -ldflags="-s -w" -trimpath -o ./bin/gn ./cmd/git-nostr-cli

# Create config
RUN mkdir -p /root/.config/git-nostr

# Configure git-nostr-bridge
# Replace gitRepoOwners key with your public key (hex)
RUN echo '{"repositoryDir": "/root/git-nostr-repositories","DbFile": "/root/.config/git-nostr/git-nostr-db.sqlite","relays": ["wss://relay.damus.io", "wss://nostr.fmt.wiz.biz", "wss://nos.lol"],"gitRepoOwners": ["d7a2565a3d29c05a72c315c9117594bb0c76eda7ebfdda3441d0eb6ba326c5e1"]}' > /root/.config/git-nostr/git-nostr-bridge.json

# Set the default command to run when the container starts
CMD service ssh start && /usr/gitnostr/bin/git-nostr-bridge -config=/root/.config/git-nostr/git-nostr-bridge.json