#!/bin/bash

# Git-Nostr-Bridge Dynamic Configuration Script
# This script generates git-nostr-bridge.json based on environment variables

CONFIG_DIR="/root/.config/git-nostr"
CONFIG_FILE="$CONFIG_DIR/git-nostr-bridge.json"

# Create config directory if it doesn't exist
mkdir -p "$CONFIG_DIR"

# Default values
DEFAULT_REPOSITORY_DIR="/root/git-nostr-repositories"
DEFAULT_DB_FILE="/root/.config/git-nostr/git-nostr-db.sqlite"
DEFAULT_RELAYS="wss://relay.damus.io,wss://nos.lol"
DEFAULT_GIT_REPO_OWNERS="d7a2565a3d29c05a72c315c9117594bb0c76eda7ebfdda3441d0eb6ba326c5e1"

# Environment variables with defaults
REPOSITORY_DIR=${GIT_NOSTR_REPOSITORY_DIR:-$DEFAULT_REPOSITORY_DIR}
DB_FILE=${GIT_NOSTR_DB_FILE:-$DEFAULT_DB_FILE}
RELAYS=${GIT_NOSTR_RELAYS:-$DEFAULT_RELAYS}
GIT_REPO_OWNERS=${GIT_NOSTR_REPO_OWNERS:-$DEFAULT_GIT_REPO_OWNERS}

# Convert comma-separated values to JSON arrays
relays_json=$(echo "$RELAYS" | sed 's/,/","/g' | sed 's/^/"/' | sed 's/$/"/')
owners_json=$(echo "$GIT_REPO_OWNERS" | sed 's/,/","/g' | sed 's/^/"/' | sed 's/$/"/')

# Generate the configuration file
cat > "$CONFIG_FILE" << EOF
{
    "repositoryDir": "$REPOSITORY_DIR",
    "DbFile": "$DB_FILE",
    "relays": [$relays_json],
    "gitRepoOwners": [$owners_json]
}
EOF

echo "Generated git-nostr-bridge configuration:"
cat "$CONFIG_FILE"
echo ""

# Start SSH service
echo "Starting SSH service..."
service ssh start

# Start git-nostr-bridge with the generated config
echo "Starting git-nostr-bridge..."
exec /usr/gitnostr/bin/git-nostr-bridge -config="$CONFIG_FILE"