# 🚀 Complete Setup Guide for AI Code Reviewer

This guide will walk you through setting up the AI Code Reviewer step-by-step.

## Prerequisites

- Node.js 18+ installed
- A GitHub account
- An API key from OpenAI or Anthropic
- Basic knowledge of Git and GitHub

## Step-by-Step Setup

### 1. Get Your API Keys

#### Option A: OpenAI (GPT-4)

1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in
3. Navigate to [API Keys](https://platform.openai.com/api-keys)
4. Click "Create new secret key"
5. Copy the key (starts with `sk-...`)
6. Add billing information if you haven't already

**Recommended Model**: `gpt-4-turbo-preview` (fast and cost-effective)

#### Option B: Anthropic (Claude)

1. Go to [Anthropic Console](https://console.anthropic.com/)
2. Sign up or log in
3. Navigate to [API Keys](https://console.anthropic.com/settings/keys)
4. Click "Create Key"
5. Copy the key (starts with `sk-ant-...`)
6. Add billing information if you haven't already

**Recommended Model**: `claude-3-5-sonnet-20241022` (excellent balance)

### 2. Get a GitHub Personal Access Token

1. Go to [GitHub Settings](https://github.com/settings/tokens)
2. Click "Tokens (classic)" → "Generate new token (classic)"
3. Give it a name like "AI Code Reviewer"
4. Set expiration (or "No expiration" for testing)
5. Select these scopes:
   - ✅ `repo` (Full control of private repositories)
   - ✅ `workflow` (Update GitHub Action workflows)
6. Click "Generate token"
7. **COPY THE TOKEN NOW** (you won't see it again!)

### 3. Clone and Install

```bash
# Clone the repository
git clone https://github.com/yourusername/ai-code-reviewer.git
cd ai-code-reviewer

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

### 4. Configure Your Environment

Edit the `.env` file:

```bash
# GitHub Configuration
GITHUB_TOKEN=ghp_your_github_token_here

# AI Provider (choose one)
AI_PROVIDER=openai

# OpenAI Settings (if using OpenAI)
OPENAI_API_KEY=sk-your_openai_key_here
OPENAI_MODEL=gpt-4-turbo-preview

# OR Anthropic Settings (if using Claude)
# AI_PROVIDER=anthropic
# ANTHROPIC_API_KEY=sk-ant-your_anthropic_key_here
# ANTHROPIC_MODEL=claude-3-5-sonnet-20241022
```

### 5. Build the Project

```bash
npm run build
```

### 6. Test Locally (Optional)

Test on a specific PR:

```bash
node dist/index.js review \
  --owner github-username \
  --repo repository-name \
  --pr 123
```

Example:
```bash
node dist/index.js review \
  --owner facebook \
  --repo react \
  --pr 28000
```

## Deployment Options

### Option A: GitHub Actions (Easiest - Recommended)

#### For a Single Repository

1. **Add your AI API key as a secret**:
   - Go to your repo → Settings → Secrets and variables → Actions
   - Click "New repository secret"
   - Name: `OPENAI_API_KEY` (or `ANTHROPIC_API_KEY`)
   - Value: Your API key
   - Click "Add secret"

2. **Copy the workflow file**:
   ```bash
   # Make sure you're in your target repository
   mkdir -p .github/workflows
   cp path/to/ai-code-reviewer/.github/workflows/ai-review.yml .github/workflows/
   ```

3. **Commit and push**:
   ```bash
   git add .github/workflows/ai-review.yml
   git commit -m "Add AI code reviewer"
   git push
   ```

4. **Test it**:
   - Create a new branch
   - Make some code changes
   - Open a pull request
   - Watch the AI reviewer comment! ✨

#### For Multiple Repositories (Organization-wide)

1. **Create a new repository** for the action (e.g., `ai-code-reviewer-action`)

2. **Copy all files** from this project to that repository

3. **Publish it as a reusable action**:
   Create `action.yml` in the root:
   ```yaml
   name: 'AI Code Reviewer'
   description: 'Automated PR reviews using AI'
   inputs:
     github-token:
       description: 'GitHub token'
       required: true
     ai-provider:
       description: 'AI provider (openai or anthropic)'
       required: true
       default: 'openai'
     ai-api-key:
       description: 'AI API key'
       required: true
   runs:
     using: 'node20'
     main: 'dist/action.js'
   ```

4. **Use it in other repositories**:
   ```yaml
   name: AI Code Review
   on:
     pull_request:
       types: [opened, synchronize]

   jobs:
     review:
       runs-on: ubuntu-latest
       steps:
         - uses: your-org/ai-code-reviewer-action@v1
           with:
             github-token: ${{ secrets.GITHUB_TOKEN }}
             ai-provider: 'openai'
             ai-api-key: ${{ secrets.OPENAI_API_KEY }}
   ```

### Option B: Webhook Server (For High Volume)

Best for organizations with many repositories.

#### Deploy to a Cloud Server

1. **Choose a hosting provider**:
   - Railway.app (easiest)
   - Heroku
   - DigitalOcean
   - AWS EC2
   - Your own VPS

2. **Deploy using Docker**:
   ```bash
   # Build the image
   docker build -t ai-reviewer .

   # Run the container
   docker run -d \
     -p 3000:3000 \
     -e GITHUB_TOKEN=your_token \
     -e OPENAI_API_KEY=your_key \
     -e AI_PROVIDER=openai \
     --name ai-reviewer \
     ai-reviewer
   ```

3. **Or use docker-compose**:
   ```bash
   # Edit .env file with your credentials
   docker-compose up -d
   ```

4. **Set up GitHub webhook**:
   - Go to repo Settings → Webhooks → Add webhook
   - Payload URL: `https://your-server.com/webhook`
   - Content type: `application/json`
   - Secret: (generate a random string and add to `.env` as `GITHUB_WEBHOOK_SECRET`)
   - Events: Select "Pull requests"
   - Click "Add webhook"

#### Deploy to Railway (Recommended Cloud Option)

1. Go to [Railway.app](https://railway.app/)
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your `ai-code-reviewer` repository
5. Add environment variables:
   - `GITHUB_TOKEN`
   - `OPENAI_API_KEY` (or `ANTHROPIC_API_KEY`)
   - `AI_PROVIDER`
6. Railway will automatically deploy and give you a URL
7. Use that URL for your GitHub webhook

### Option C: Organization-Wide Bot (Advanced)

Create a GitHub App for your organization.

1. **Create a GitHub App**:
   - Go to Settings → Developer settings → GitHub Apps → New GitHub App
   - Name: "AI Code Reviewer"
   - Homepage URL: Your server URL
   - Webhook URL: `https://your-server.com/webhook`
   - Webhook secret: Generate and save
   - Permissions:
     - Repository permissions:
       - Pull requests: Read & write
       - Contents: Read
   - Subscribe to events: Pull request
   - Where can this app be installed: Any account

2. **Install the app** on your organization or repositories

3. **Update the code** to use GitHub App authentication (see GitHub's docs)

## Verification

### Check if Everything Works

1. **Test the connection**:
   ```bash
   # If running server
   curl http://localhost:3000/health
   # Should return: {"status":"ok","timestamp":"..."}
   ```

2. **Create a test PR**:
   ```bash
   git checkout -b test-ai-review
   echo "console.log('test');" > test.js
   git add test.js
   git commit -m "Test AI review"
   git push origin test-ai-review
   # Create PR on GitHub
   ```

3. **Watch for the review** - should appear within 30-60 seconds!

## Troubleshooting

### Issue: No review appears

**Check**:
1. GitHub Actions logs (Actions tab in your repo)
2. Server logs: `docker-compose logs -f`
3. Webhook deliveries (Settings → Webhooks → Recent Deliveries)

### Issue: "API key invalid"

**Solution**:
- Verify your API key is correct
- Check if you have credits/quota
- Ensure there are no extra spaces in `.env`

### Issue: "Permission denied"

**Solution**:
- Regenerate GitHub token with correct scopes
- For GitHub Actions, ensure `permissions` in workflow file:
  ```yaml
  permissions:
    contents: read
    pull-requests: write
  ```

### Issue: "Rate limit exceeded"

**Solution**:
- Add delays between reviews
- Upgrade API plan
- Implement caching

## Cost Management

### Reduce Costs

1. **Use cheaper models**:
   ```bash
   # OpenAI
   OPENAI_MODEL=gpt-3.5-turbo  # Much cheaper than GPT-4

   # Anthropic
   ANTHROPIC_MODEL=claude-3-haiku-20240307  # Cheapest Claude
   ```

2. **Limit file size**:
   ```bash
   MAX_FILES_TO_REVIEW=10
   MAX_FILE_SIZE_KB=200
   ```

3. **Skip certain files**:
   Edit `src/github/client.ts` to filter out files:
   ```typescript
   const files = filesData.filter(file => 
     !file.filename.includes('package-lock.json') &&
     !file.filename.includes('.min.js') &&
     !file.filename.includes('dist/')
   );
   ```

## Next Steps

- ✅ Set up monitoring and alerts
- ✅ Customize the review prompt for your needs
- ✅ Add more AI providers
- ✅ Create custom review rules
- ✅ Integrate with your CI/CD pipeline

## Support

- Check the [main README](./README.md) for more info
- Review issues on GitHub
- Check AI provider documentation

---

**Happy Reviewing! 🎉**

