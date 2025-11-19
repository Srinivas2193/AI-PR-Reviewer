# 🤖 AI Code Reviewer

An intelligent, automated code review system powered by AI (GPT-4 or Claude) that provides comprehensive feedback on GitHub pull requests.

## ✨ Features

- 🔍 **Comprehensive Code Analysis**: Reviews code for security, performance, and quality issues
- 💬 **Inline Comments**: Provides specific feedback on individual lines of code
- 📊 **Summary Reports**: Generates detailed summary with ratings and categorized feedback
- 🔌 **Multiple Deployment Options**: GitHub Actions, Webhook Server, or CLI
- 🤖 **Flexible AI Providers**: Support for both OpenAI (GPT-4) and Anthropic (Claude)
- ⚡ **Fast & Efficient**: Processes PRs quickly with intelligent file filtering
- 🔒 **Security Focused**: Identifies potential security vulnerabilities

## 🚀 Quick Start

> **⚡ New User?** Start here: **[GET_STARTED_NOW.md](./GET_STARTED_NOW.md)** - Get running in 10 minutes!

### Option 1: GitHub Actions (Recommended)

This is the easiest way to get started. The review runs automatically on every PR.

1. **Fork or clone this repository**

2. **Add secrets to your GitHub repository**:
   - Go to `Settings` → `Secrets and variables` → `Actions`
   - Add one of the following (depending on your AI provider):
     - For OpenAI: `OPENAI_API_KEY`
     - For Anthropic: `ANTHROPIC_API_KEY`

3. **Copy the workflow file to your target repository**:
   ```bash
   cp .github/workflows/ai-review.yml your-repo/.github/workflows/
   ```

4. **Edit the workflow file** to specify your AI provider and model:
   ```yaml
   env:
     AI_PROVIDER: openai  # or 'anthropic'
     OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
     OPENAI_MODEL: gpt-4-turbo-preview
   ```

5. **Push and create a PR** - The AI reviewer will automatically comment!

### Option 2: Webhook Server

Run as a standalone service that listens for GitHub webhooks.

1. **Clone and install**:
   ```bash
   git clone <your-repo>
   cd ai-code-reviewer
   npm install
   ```

2. **Configure environment**:
   ```bash
   cp .env.example .env
   # Edit .env with your credentials
   ```

3. **Build and start server**:
   ```bash
   npm run build
   npm run start
   ```

4. **Configure GitHub webhook**:
   - Go to your repo → `Settings` → `Webhooks` → `Add webhook`
   - Payload URL: `https://your-server.com/webhook`
   - Content type: `application/json`
   - Events: Select `Pull requests`
   - Secret: Use the same value as `GITHUB_WEBHOOK_SECRET` in `.env`

### Option 3: CLI (Manual Reviews)

Review PRs manually from the command line.

```bash
npm install
npm run build

# Review a specific PR
node dist/index.js review \
  --owner <github-owner> \
  --repo <repo-name> \
  --pr <pr-number>
```

### Option 4: Docker

```bash
# Copy and configure .env file
cp .env.example .env

# Build and run
docker-compose up -d

# View logs
docker-compose logs -f
```

## ⚙️ Configuration

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GITHUB_TOKEN` | Yes | GitHub personal access token with `repo` scope |
| `AI_PROVIDER` | Yes | `openai` or `anthropic` |
| `OPENAI_API_KEY` | Conditional | Required if using OpenAI |
| `OPENAI_MODEL` | No | Default: `gpt-4-turbo-preview` |
| `ANTHROPIC_API_KEY` | Conditional | Required if using Anthropic |
| `ANTHROPIC_MODEL` | No | Default: `claude-3-5-sonnet-20241022` |
| `GITHUB_WEBHOOK_SECRET` | No | Secret for webhook verification |
| `PORT` | No | Server port (default: 3000) |
| `MAX_FILES_TO_REVIEW` | No | Max files per PR (default: 20) |
| `MAX_FILE_SIZE_KB` | No | Max file size in KB (default: 500) |

### GitHub Token Permissions

Your GitHub token needs these permissions:
- `repo` (full control) or at minimum:
  - `repo:status`
  - `public_repo` (for public repositories)
  - `pull_requests` (read and write)

**To create a token**:
1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token with required permissions
3. Copy the token and add it to your `.env` file or GitHub secrets

## 📚 Documentation

| Document | Description | When to Read |
|----------|-------------|--------------|
| **[GET_STARTED_NOW.md](./GET_STARTED_NOW.md)** | 10-minute quick start guide | 👈 **Start here!** |
| **[QUICK_START.md](./QUICK_START.md)** | 5-minute overview | Quick reference |
| **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** | Detailed setup for all methods | Full setup |
| **[DEVELOPMENT_PLAN.md](./DEVELOPMENT_PLAN.md)** | Complete deployment guide | Production deploy |
| **[TECH_STACK.md](./TECH_STACK.md)** | Technical architecture | Developers |
| **[PROJECT_STATUS.md](./PROJECT_STATUS.md)** | What's included | Project overview |
| **[PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)** | Complete summary | High-level view |
| **[CONTRIBUTING.md](./CONTRIBUTING.md)** | Contribution guide | Contributors |

## 📖 How It Works

1. **Trigger**: PR is opened or updated (or manually triggered)
2. **Fetch**: Retrieves PR metadata, file diffs, and full file contents
3. **Analyze**: AI analyzes the code for:
   - Security vulnerabilities
   - Performance issues
   - Code quality problems
   - Best practice violations
   - Bugs and logic errors
4. **Comment**: Posts:
   - Inline comments on specific issues
   - Comprehensive summary comment with ratings

## 🎯 Example Review Output

The AI reviewer will post comments like:

```markdown
## 🤖 AI Code Review

### 🟢 Overall Rating: 8/10

This PR introduces a new authentication system with generally good code quality...

### 🔒 Security Issues
- ⚠️ SQL injection vulnerability in user login query
- ⚠️ Passwords are not being hashed before storage

### ⚡ Performance Issues
- Consider adding database indexes on the email field

### 💡 Best Practice Suggestions
- Use environment variables for API keys
- Add input validation for user email

### ✅ Positive Points
- Good error handling implementation
- Well-structured and readable code

---
📊 **Stats:** 5 files changed | +234 -12
💬 **Inline Comments:** 3 specific suggestions
```

## 🔧 Customization

### Adjust Review Severity

Edit `src/ai/base.ts` to modify the review prompt and focus:

```typescript
// Focus more on security
const prompt = this.buildReviewPrompt(context);
prompt += "\nPay special attention to security vulnerabilities.";
```

### Custom AI Models

Update `.env`:
```bash
# Use GPT-4 Turbo
OPENAI_MODEL=gpt-4-turbo-preview

# Use Claude 3 Opus for more thorough reviews
ANTHROPIC_MODEL=claude-3-opus-20240229
```

### File Filtering

Edit `src/config.ts` to change which files are reviewed:

```typescript
review: {
  maxFiles: 20,          // Max files per PR
  maxFileSizeKB: 500,    // Skip files larger than this
  severity: 'medium',    // low | medium | high
}
```

## 📊 Cost Estimation

Approximate costs per PR review:

| Provider | Model | Cost per PR* |
|----------|-------|--------------|
| OpenAI | GPT-4 Turbo | $0.10 - $0.50 |
| OpenAI | GPT-3.5 Turbo | $0.01 - $0.05 |
| Anthropic | Claude 3.5 Sonnet | $0.15 - $0.60 |
| Anthropic | Claude 3 Haiku | $0.01 - $0.05 |

*Based on typical PR with 5-10 files and moderate changes

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

MIT License - feel free to use this in your projects!

## 🆘 Troubleshooting

### "Failed to fetch PR context"
- Verify your `GITHUB_TOKEN` has correct permissions
- Check if the repository is accessible with your token

### "AI provider error"
- Verify API keys are correct
- Check API rate limits
- Ensure you have credits/quota available

### "Webhook not receiving events"
- Verify webhook URL is publicly accessible
- Check webhook secret matches
- Review GitHub webhook delivery logs

### "Comments not appearing on PR"
- Ensure token has `pull_requests` write permission
- Check if you're using the correct repository owner/name
- Review application logs for errors

## 🔗 Useful Links

- [OpenAI API Docs](https://platform.openai.com/docs)
- [Anthropic API Docs](https://docs.anthropic.com)
- [GitHub Webhooks Guide](https://docs.github.com/en/developers/webhooks-and-events/webhooks)
- [Octokit Documentation](https://octokit.github.io/rest.js/)

---

**Made with ❤️ for better code reviews**

#   T e s t i n g   A I   r e v i e w e r  
 #   T r i g g e r   a f t e r   b i l l i n g   s e t u p  
 