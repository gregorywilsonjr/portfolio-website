#!/bin/bash

# Helper script to create .env.local file with AWS credentials
#
# Usage:
#   ./create-env-file.sh <ACCESS_KEY_ID> [REGION]
#
# The secret access key is read from a prompt, never from the command line.
# Arguments are visible in shell history and to anyone who can list processes,
# which makes them the wrong channel for a long-lived credential.

set -euo pipefail

if [ "$#" -lt 1 ] || [ "$#" -gt 2 ]; then
    echo "Usage: $0 <ACCESS_KEY_ID> [REGION]"
    exit 1
fi

ACCESS_KEY_ID=$1
REGION="${2:-us-east-1}"
ENV_FILE=".env.local"

# Check if .env.local already exists
if [ -f "$ENV_FILE" ]; then
    echo "⚠️  $ENV_FILE already exists!"
    read -p "Do you want to overwrite it? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Aborted."
        exit 1
    fi
fi

read -r -s -p "AWS secret access key: " SECRET_ACCESS_KEY
echo

if [ -z "$SECRET_ACCESS_KEY" ]; then
    echo "✗ No secret access key entered. Aborted."
    exit 1
fi

# Subshell so the restrictive umask applies to the new file only
(
    umask 077
    cat > "$ENV_FILE" << EOF
# AWS SES Configuration
# Generated on $(date)
AWS_REGION=$REGION
AWS_ACCESS_KEY_ID=$ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY=$SECRET_ACCESS_KEY
EOF
)

unset SECRET_ACCESS_KEY

echo "✅ Created $ENV_FILE successfully (mode 600)!"
echo ""
echo "🔒 Security reminder:"
echo "   - Never commit this file to version control"
echo "   - Confirm it is matched by .gitignore before your next commit"
echo ""
