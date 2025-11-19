#!/bin/bash

# Quick test script for AI Code Reviewer
# Usage: ./scripts/test-review.sh <owner> <repo> <pr-number>

set -e

echo "🤖 AI Code Reviewer - Test Script"
echo "=================================="
echo ""

# Check if arguments provided
if [ $# -lt 3 ]; then
    echo "Usage: $0 <owner> <repo> <pr-number>"
    echo ""
    echo "Examples:"
    echo "  $0 facebook react 28000"
    echo "  $0 microsoft vscode 195000"
    echo ""
    exit 1
fi

OWNER=$1
REPO=$2
PR_NUMBER=$3

# Check if .env file exists
if [ ! -f .env ]; then
    echo "❌ Error: .env file not found"
    echo "Please create .env file from .env.example"
    echo ""
    echo "cp env.example .env"
    echo "# Then edit .env with your credentials"
    exit 1
fi

# Check if node_modules exists
if [ ! -d node_modules ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Check if dist exists
if [ ! -d dist ]; then
    echo "🔨 Building project..."
    npm run build
fi

echo "📊 Testing PR Review"
echo "--------------------"
echo "Owner:  $OWNER"
echo "Repo:   $REPO"
echo "PR:     #$PR_NUMBER"
echo ""

# Run the review
echo "🚀 Starting review..."
echo ""

node dist/index.js review \
    --owner "$OWNER" \
    --repo "$REPO" \
    --pr "$PR_NUMBER"

EXIT_CODE=$?

echo ""
if [ $EXIT_CODE -eq 0 ]; then
    echo "✅ Review completed successfully!"
else
    echo "❌ Review failed with exit code $EXIT_CODE"
fi

exit $EXIT_CODE

