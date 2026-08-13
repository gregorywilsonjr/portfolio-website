#!/bin/bash

# Setup IAM User for SES Email Sending
# This script creates an IAM user with minimal permissions to send emails via SES
#
# Usage:
#   ./setup-ses-iam-user.sh [aws-profile] [from-address] [region]

set -euo pipefail

PROFILE="${1:-con}"
FROM_ADDRESS="${2:-contact@gregorywilsonjr.com}"
REGION="${3:-us-east-1}"
USER_NAME="construct-ses-mailer"
POLICY_NAME="ConstructSESSendPolicy"
ENV_FILE=".env.local"

echo "🔧 Creating IAM user for SES email sending..."
echo "Profile: $PROFILE"
echo "User: $USER_NAME"
echo "From: $FROM_ADDRESS"
echo ""

ACCOUNT_ID=$(aws sts get-caller-identity \
  --profile "$PROFILE" \
  --query 'Account' \
  --output text)

IDENTITY_ARN="arn:aws:ses:${REGION}:${ACCOUNT_ID}:identity/${FROM_ADDRESS}"

# Create IAM user
echo "📝 Creating IAM user: $USER_NAME"
aws iam create-user \
  --user-name "$USER_NAME" \
  --profile "$PROFILE" \
  2>/dev/null || echo "User already exists, continuing..."

# Scoped to the one verified identity, and conditioned on the From address so
# these credentials cannot be used to send as anyone else in the account.
POLICY_DOCUMENT=$(cat <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "ses:SendEmail",
        "ses:SendRawEmail"
      ],
      "Resource": "${IDENTITY_ARN}",
      "Condition": {
        "StringEquals": {
          "ses:FromAddress": "${FROM_ADDRESS}"
        }
      }
    }
  ]
}
EOF
)

# Create and attach policy
echo "📋 Creating and attaching SES send policy..."
POLICY_ARN=$(aws iam create-policy \
  --policy-name "$POLICY_NAME" \
  --policy-document "$POLICY_DOCUMENT" \
  --profile "$PROFILE" \
  --query 'Policy.Arn' \
  --output text 2>/dev/null) || {
    echo "Policy already exists, publishing a new default version..."
    POLICY_ARN=$(aws iam list-policies \
      --profile "$PROFILE" \
      --query "Policies[?PolicyName=='$POLICY_NAME'].Arn" \
      --output text)

    # Re-running must actually apply the scoped policy, not silently keep
    # whatever version was attached first
    aws iam create-policy-version \
      --policy-arn "$POLICY_ARN" \
      --policy-document "$POLICY_DOCUMENT" \
      --set-as-default \
      --profile "$PROFILE" \
      --output text > /dev/null
  }

echo "Policy ARN: $POLICY_ARN"

# Attach policy to user
echo "🔗 Attaching policy to user..."
aws iam attach-user-policy \
  --user-name "$USER_NAME" \
  --policy-arn "$POLICY_ARN" \
  --profile "$PROFILE" \
  2>/dev/null || echo "Policy already attached"

# Create access key
echo "🔑 Creating access key..."
ACCESS_KEY_OUTPUT=$(aws iam create-access-key \
  --user-name "$USER_NAME" \
  --profile "$PROFILE" \
  --output json)

ACCESS_KEY_ID=$(echo "$ACCESS_KEY_OUTPUT" | grep -o '"AccessKeyId": "[^"]*"' | cut -d'"' -f4)
SECRET_ACCESS_KEY=$(echo "$ACCESS_KEY_OUTPUT" | grep -o '"SecretAccessKey": "[^"]*"' | cut -d'"' -f4)

# Written straight to disk rather than echoed. Printing the secret would leave
# it in terminal scrollback and in CI logs, and passing it as a CLI argument
# would expose it in shell history and the process list.
if [ -e "$ENV_FILE" ]; then
  echo "⚠️  $ENV_FILE already exists; not overwriting."
  echo "    Add the new key manually, then delete the unused one in IAM."
  exit 1
fi

(
  umask 077
  cat > "$ENV_FILE" <<EOF
AWS_REGION=${REGION}
AWS_ACCESS_KEY_ID=${ACCESS_KEY_ID}
AWS_SECRET_ACCESS_KEY=${SECRET_ACCESS_KEY}
SES_FROM_EMAIL=${FROM_ADDRESS}
EOF
)

unset SECRET_ACCESS_KEY ACCESS_KEY_OUTPUT

echo ""
echo "✅ IAM User created successfully!"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔐 Credentials written to $ENV_FILE (mode 600)"
echo "   Access key ID: $ACCESS_KEY_ID"
echo "   The secret was not printed. Read it from $ENV_FILE if needed."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "⚠️  Confirm $ENV_FILE is git-ignored before committing anything."
echo ""
