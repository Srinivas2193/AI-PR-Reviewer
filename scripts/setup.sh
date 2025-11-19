#!/bin/bash

# Complete setup script for AI Code Reviewer
# This will guide you through the entire setup process

set -e

echo "🤖 AI Code Reviewer - Setup Script"
echo "===================================="
echo ""

# Step 1: Check Node.js version
echo "📋 Step 1: Checking Node.js version..."
if ! command -v node &> /dev/null; then
    echo "❌ Error: Node.js is not installed"
    echo "Please install Node.js 18+ from https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Error: Node.js version $NODE_VERSION is too old"
    echo "Please upgrade to Node.js 18 or higher"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"
echo ""

# Step 2: Install dependencies
echo "📦 Step 2: Installing dependencies..."
npm install
echo "✅ Dependencies installed"
echo ""

# Step 3: Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "⚙️  Step 3: Creating .env file..."
    cp env.example .env
    echo "✅ .env file created from env.example"
    echo ""
    echo "⚠️  IMPORTANT: You need to edit .env file with your credentials:"
    echo ""
    echo "Required:"
    echo "  - GITHUB_TOKEN (get from https://github.com/settings/tokens)"
    echo "  - AI_PROVIDER (choose 'openai' or 'anthropic')"
    echo "  - OPENAI_API_KEY or ANTHROPIC_API_KEY"
    echo ""
    echo "Opening .env file for editing..."
    echo ""
    
    # Try to open in editor
    if command -v code &> /dev/null; then
        code .env
    elif command -v nano &> /dev/null; then
        nano .env
    elif command -v vi &> /dev/null; then
        vi .env
    else
        echo "Please edit .env manually"
    fi
else
    echo "⚙️  Step 3: .env file already exists"
    echo "✅ Skipping creation"
    echo ""
fi

# Step 4: Build project
echo "🔨 Step 4: Building project..."
npm run build
echo "✅ Build completed"
echo ""

# Step 5: Validate configuration
echo "✅ Step 5: Validating configuration..."

# Check if required env vars are set
source .env 2>/dev/null || true

if [ -z "$GITHUB_TOKEN" ] || [ "$GITHUB_TOKEN" = "ghp_your_github_personal_access_token_here" ]; then
    echo "⚠️  Warning: GITHUB_TOKEN not configured"
    MISSING_CONFIG=true
fi

if [ -z "$AI_PROVIDER" ]; then
    echo "⚠️  Warning: AI_PROVIDER not set"
    MISSING_CONFIG=true
fi

if [ "$AI_PROVIDER" = "openai" ]; then
    if [ -z "$OPENAI_API_KEY" ] || [ "$OPENAI_API_KEY" = "sk-your_openai_api_key_here" ]; then
        echo "⚠️  Warning: OPENAI_API_KEY not configured"
        MISSING_CONFIG=true
    fi
fi

if [ "$AI_PROVIDER" = "anthropic" ]; then
    if [ -z "$ANTHROPIC_API_KEY" ] || [ "$ANTHROPIC_API_KEY" = "sk-ant-your_anthropic_api_key_here" ]; then
        echo "⚠️  Warning: ANTHROPIC_API_KEY not configured"
        MISSING_CONFIG=true
    fi
fi

echo ""
echo "======================================"
echo "🎉 Setup Complete!"
echo "======================================"
echo ""

if [ "$MISSING_CONFIG" = true ]; then
    echo "⚠️  Configuration incomplete. Please edit .env file with your credentials."
    echo ""
    echo "Next steps:"
    echo "  1. Edit .env file with your API keys"
    echo "  2. Test with: npm run dev"
    echo "  3. Or test a PR: ./scripts/test-review.sh facebook react 28000"
else
    echo "✅ Configuration looks good!"
    echo ""
    echo "You can now:"
    echo "  1. Test a PR: ./scripts/test-review.sh facebook react 28000"
    echo "  2. Run server: npm run start"
    echo "  3. Deploy to GitHub Actions (see README.md)"
fi

echo ""
echo "📚 Documentation:"
echo "  - README.md - Quick start guide"
echo "  - SETUP_GUIDE.md - Detailed setup instructions"
echo "  - DEVELOPMENT_PLAN.md - Complete deployment guide"
echo ""

