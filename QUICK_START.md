# ⚡ Quick Start Guide

Get your AI Code Reviewer running in **5 minutes**!

---

## 🎯 Choose Your Path

### Path 1: GitHub Actions (Easiest) ⭐ Recommended

**Perfect for**: Single repository, automatic reviews

1. **Get an OpenAI API Key** (or Anthropic)
   - Visit: https://platform.openai.com/api-keys
   - Click "Create new secret key"
   - Copy the key (starts with `sk-...`)

2. **Add API Key to GitHub Secrets**
   - Go to your repository on GitHub
   - Click: `Settings` → `Secrets and variables` → `Actions`
   - Click `New repository secret`
   - Name: `OPENAI_API_KEY`
   - Value: Paste your API key
   - Click `Add secret`

3. **The workflow file already exists!**
   - It's at: `.github/workflows/ai-review.yml`
   - It's already configured to run on PR events

4. **Test it!**
   ```bash
   git checkout -b test-ai-reviewer
   echo "console.log('hello');" > test.js
   git add test.js
   git commit -m "Test AI reviewer"
   git push origin test-ai-reviewer
   ```
   - Go to GitHub and create a Pull Request
   - Watch for the AI review comment (30-60 seconds)

**Done!** 🎉

---

### Path 2: Test Locally First

**Perfect for**: Testing before deployment

1. **Clone and Install**
   ```bash
   git clone <your-repo-url>
   cd ai-code-reviewer
   npm install
   ```

2. **Create .env File**
   ```bash
   cp env.example .env
   ```

3. **Edit .env File**
   ```bash
   # Open in your editor
   code .env   # VS Code
   # OR
   notepad .env   # Windows
   # OR
   nano .env   # Linux/Mac
   ```

   Add your credentials:
   ```bash
   GITHUB_TOKEN=ghp_your_github_token_here
   AI_PROVIDER=openai
   OPENAI_API_KEY=sk-your_openai_key_here
   ```

4. **Build**
   ```bash
   npm run build
   ```

5. **Test on a Real PR**
   ```bash
   node dist/index.js review --owner facebook --repo react --pr 28000
   ```

   This will review a React PR (won't post comments, just show output)

**Success!** 🎉

---

### Path 3: Webhook Server

**Perfect for**: Multiple repositories, centralized management

1. **Setup** (from Path 2)
   ```bash
   npm install
   cp env.example .env
   # Edit .env with your credentials
   npm run build
   ```

2. **Start Server**
   ```bash
   npm run start
   ```

3. **Test Health Endpoint**
   ```bash
   curl http://localhost:3000/health
   # Should return: {"status":"ok","timestamp":"..."}
   ```

4. **Deploy to Cloud**
   
   **Option A: Railway (Easiest)**
   - Go to https://railway.app/
   - Click "New Project" → "Deploy from GitHub"
   - Select this repository
   - Add environment variables (from your .env)
   - Deploy!
   - Railway gives you a URL automatically

   **Option B: Docker**
   ```bash
   docker-compose up -d
   ```

5. **Configure GitHub Webhook**
   - Repository Settings → Webhooks → Add webhook
   - Payload URL: `https://your-server.com/webhook`
   - Content type: `application/json`
   - Events: "Pull requests"
   - Add webhook

**Live!** 🎉

---

## 🔑 Getting API Keys

### OpenAI (GPT-4)

1. Visit: https://platform.openai.com/signup
2. Complete signup
3. Add payment method: https://platform.openai.com/account/billing
4. Go to: https://platform.openai.com/api-keys
5. Click "Create new secret key"
6. Copy and save it (starts with `sk-...`)

**Cost**: ~$0.10-0.50 per PR review

### Anthropic (Claude)

1. Visit: https://console.anthropic.com/
2. Complete signup
3. Add payment method
4. Go to: https://console.anthropic.com/settings/keys
5. Click "Create Key"
6. Copy and save it (starts with `sk-ant-...`)

**Cost**: ~$0.15-0.60 per PR review

### GitHub Token

1. Visit: https://github.com/settings/tokens
2. Click "Tokens (classic)" → "Generate new token (classic)"
3. Give it a name: "AI Code Reviewer"
4. Select scopes:
   - ✅ `repo` (full control)
5. Click "Generate token"
6. Copy and save it (starts with `ghp_...`)

**Note**: For GitHub Actions, you can use `${{ secrets.GITHUB_TOKEN }}` (automatic)

---

## ⚙️ Configuration

### Minimal .env for OpenAI

```bash
GITHUB_TOKEN=ghp_your_token
AI_PROVIDER=openai
OPENAI_API_KEY=sk-your_key
```

### Minimal .env for Anthropic

```bash
GITHUB_TOKEN=ghp_your_token
AI_PROVIDER=anthropic
ANTHROPIC_API_KEY=sk-ant-your_key
```

### Full .env (All Options)

```bash
# Required
GITHUB_TOKEN=ghp_your_token
AI_PROVIDER=openai

# OpenAI (if provider=openai)
OPENAI_API_KEY=sk-your_key
OPENAI_MODEL=gpt-4-turbo-preview

# Anthropic (if provider=anthropic)
ANTHROPIC_API_KEY=sk-ant-your_key
ANTHROPIC_MODEL=claude-3-5-sonnet-20241022

# Optional
PORT=3000
MAX_FILES_TO_REVIEW=20
MAX_FILE_SIZE_KB=500
```

---

## 🧪 Testing

### Test CLI
```bash
npm install
npm run build
node dist/index.js review --owner facebook --repo react --pr 28000
```

### Test Server
```bash
npm run start
# In another terminal:
curl http://localhost:3000/health
```

### Test GitHub Actions
1. Push code to a branch
2. Create a PR
3. Check Actions tab for logs
4. Check PR for AI comments

---

## ❓ Troubleshooting

### "GITHUB_TOKEN is required"
→ Add `GITHUB_TOKEN` to your `.env` file

### "OPENAI_API_KEY is required"
→ Add `OPENAI_API_KEY` to your `.env` file (or `ANTHROPIC_API_KEY`)

### "Failed to fetch PR context"
→ Check your GitHub token has `repo` scope

### "No comments appearing"
→ GitHub Actions: Check the token has `pull-requests: write` permission
→ Webhook: Check webhook is active and URL is correct

### "Build failed"
→ Make sure Node.js 18+ is installed: `node -v`

---

## 📚 Next Steps

Now that it's working:

1. **Customize**: Edit `src/ai/base.ts` to adjust the review prompt
2. **Scale**: Add to more repositories
3. **Monitor**: Track costs and performance
4. **Learn**: Read full docs in README.md and SETUP_GUIDE.md

---

## 🎓 Examples

### Review a Public PR (Testing)
```bash
# React PR
node dist/index.js review --owner facebook --repo react --pr 28000

# VS Code PR
node dist/index.js review --owner microsoft --repo vscode --pr 195000

# Node.js PR
node dist/index.js review --owner nodejs --repo node --pr 45000
```

### Review Your Own PR
```bash
node dist/index.js review --owner your-username --repo your-repo --pr 1
```

---

## 💡 Tips

1. **Start Small**: Test on 1-2 repos first
2. **Watch Costs**: Monitor your AI API usage
3. **Customize Prompts**: Adjust for your tech stack
4. **Use Cheaper Models**: GPT-3.5 or Claude Haiku for cost savings
5. **Limit File Sizes**: Skip large generated files

---

## 🆘 Need Help?

- 📖 Read: [SETUP_GUIDE.md](./SETUP_GUIDE.md) - Detailed guide
- 📖 Read: [DEVELOPMENT_PLAN.md](./DEVELOPMENT_PLAN.md) - Complete plan
- 🐛 Issue: Open a GitHub issue
- 💬 Discuss: Check existing issues

---

**You're all set! Happy reviewing! 🚀**

