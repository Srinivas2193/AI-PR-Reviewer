# 🚀 Deployment Checklist - Get Your AI PR Reviewer Running NOW!

Follow these steps to deploy your AI PR reviewer in the next 15 minutes.

---

## ✅ Step 1: Get Your OpenAI API Key (5 minutes)

### Option A: OpenAI (Recommended for getting started)

1. **Go to**: https://platform.openai.com/signup
2. **Sign up** or **Log in**
3. **Add payment method**: https://platform.openai.com/account/billing
   - You need a credit card (charges only for usage)
   - Very affordable: ~$0.10-0.50 per PR review
4. **Get API Key**: https://platform.openai.com/api-keys
   - Click "Create new secret key"
   - Name it: "AI PR Reviewer"
   - **COPY IT NOW** (starts with `sk-...`)
   - Save it somewhere safe - you won't see it again!

### Option B: Anthropic (Alternative)

1. **Go to**: https://console.anthropic.com/
2. **Sign up** or **Log in**
3. **Add payment method**
4. **Get API Key**: https://console.anthropic.com/settings/keys
   - Click "Create Key"
   - **COPY IT NOW** (starts with `sk-ant-...`)

---

## ✅ Step 2: Get GitHub Personal Access Token (3 minutes)

**For testing locally (optional):**

1. **Go to**: https://github.com/settings/tokens
2. Click **"Tokens (classic)"** → **"Generate new token (classic)"**
3. **Name**: "AI PR Reviewer - Local Testing"
4. **Expiration**: 30 days (or longer)
5. **Scopes** - Select:
   - ✅ `repo` (full control of repositories)
6. Click **"Generate token"**
7. **COPY IT NOW** (starts with `ghp_...`)

**Note**: For GitHub Actions, you DON'T need this - it uses `${{ secrets.GITHUB_TOKEN }}` automatically!

---

## ✅ Step 3: Choose Your Deployment Method

### 🎯 Method 1: GitHub Actions (Easiest - Recommended!)

**Best for**: Automatic reviews on every PR

**Steps**:

1. **Add API Key to GitHub Secrets**
   ```
   1. Go to your repository on GitHub
   2. Click: Settings → Secrets and variables → Actions
   3. Click: "New repository secret"
   4. Name: OPENAI_API_KEY
   5. Value: [Paste your API key from Step 1]
   6. Click: "Add secret"
   ```

2. **The workflow file already exists!**
   - Location: `.github/workflows/ai-review.yml`
   - Already configured ✅
   - Will trigger automatically on PR events ✅

3. **Test it!**
   ```bash
   # Create a test branch
   git checkout -b test-ai-reviewer
   
   # Make a simple change
   echo "console.log('Testing AI reviewer');" > test-review.js
   
   # Commit and push
   git add test-review.js
   git commit -m "Test: AI PR reviewer"
   git push origin test-ai-reviewer
   ```

4. **Create a Pull Request on GitHub**
   - Go to your repository
   - Click "Compare & pull request"
   - Create the PR
   - Wait 30-60 seconds
   - **See the magic! 🎉**

**Status**: ✅ Ready to use right now!

---

### 🎯 Method 2: Test Locally First

**Best for**: Testing before deploying

**Steps**:

1. **Create .env file**
   ```bash
   # Copy the example
   cp env.example .env
   ```

2. **Edit .env file**
   
   Open `.env` in your editor and replace:
   ```bash
   GITHUB_TOKEN=ghp_YOUR_TOKEN_FROM_STEP_2
   AI_PROVIDER=openai
   OPENAI_API_KEY=sk-YOUR_KEY_FROM_STEP_1
   OPENAI_MODEL=gpt-4-turbo-preview
   ```

3. **Build the project**
   ```bash
   npm run build
   ```

4. **Test on a public PR** (won't post comments)
   ```bash
   # Test on a React PR
   node dist/index.js review --owner facebook --repo react --pr 28000
   ```
   
   This will show you the AI review in your console!

5. **Test on your own PR** (will post comments if you have access)
   ```bash
   node dist/index.js review --owner YOUR_USERNAME --repo YOUR_REPO --pr PR_NUMBER
   ```

**Status**: Ready to test!

---

### 🎯 Method 3: Webhook Server (Advanced)

**Best for**: Organizations with many repos

**Steps**:

1. **Create .env file** (same as Method 2, steps 1-2)

2. **Start the server**
   ```bash
   npm run build
   npm run start
   ```

3. **Test health endpoint**
   ```bash
   curl http://localhost:3000/health
   ```
   Should return: `{"status":"ok","timestamp":"..."}`

4. **Deploy to cloud** (choose one):
   
   **Railway (Easiest)**:
   - Go to: https://railway.app/
   - Connect GitHub
   - Deploy this repo
   - Add environment variables from your .env
   - Get your URL
   
   **Docker**:
   ```bash
   docker-compose up -d
   ```

5. **Configure GitHub Webhook**
   - Repository Settings → Webhooks → Add webhook
   - Payload URL: `https://your-server.com/webhook`
   - Content type: `application/json`
   - Events: Pull requests
   - Add webhook

**Status**: Ready for advanced users!

---

## 🎯 Recommended Path for You

Based on being Windows user wanting quick results:

### ⭐ Start with GitHub Actions (Method 1)

**Why**: 
- ✅ No local setup needed
- ✅ Works automatically
- ✅ Easiest to get started
- ✅ Takes 5 minutes

**Do this now**:
1. Get OpenAI API key (Step 1)
2. Add to GitHub Secrets
3. Create test PR
4. Done! 🎉

---

## 📋 Quick Verification Checklist

Before creating your first PR:

- [ ] Got OpenAI API key (starts with `sk-...`)
- [ ] Added `OPENAI_API_KEY` to GitHub Secrets
- [ ] Workflow file exists at `.github/workflows/ai-review.yml` ✅
- [ ] Ready to create test PR

---

## 🧪 Test Your Setup

### Test 1: GitHub Actions

```bash
# Create test branch
git checkout -b test-ai-review

# Make a change with an obvious issue
cat > test-security.js << 'EOF'
// This file has security issues for testing
const express = require('express');
const app = express();

app.get('/user', (req, res) => {
  const userId = req.query.id;
  // Security issue: SQL injection vulnerability
  const query = "SELECT * FROM users WHERE id = " + userId;
  res.send(query);
});
EOF

git add test-security.js
git commit -m "Test: Add file with security issues"
git push origin test-ai-review
```

Create PR on GitHub and watch for AI comments about the SQL injection!

### Test 2: Local CLI

```bash
# If you set up .env
npm run build
node dist/index.js review --owner facebook --repo react --pr 28000
```

---

## 💰 Cost Tracking

After your first week, check:
- OpenAI Dashboard: https://platform.openai.com/usage
- See how many tokens used
- Adjust `MAX_FILES_TO_REVIEW` if needed

**Expected costs**:
- 10 PRs: ~$1-5
- 50 PRs: ~$5-25
- 200 PRs: ~$20-100

---

## ❓ Troubleshooting

### "No review appears on my PR"

**Check**:
1. GitHub Actions tab - any errors?
2. Secrets properly added? (Settings → Secrets)
3. Workflow file exists? (`.github/workflows/ai-review.yml`) ✅
4. PR is not from a fork? (Actions don't run on forks by default)

**Fix**: Check Actions logs for error messages

---

### "API key invalid"

**Check**:
1. Key copied correctly (no extra spaces)?
2. Key is active? (check API provider dashboard)
3. Billing is set up? (required for OpenAI)

**Fix**: Generate new key and update secret

---

### "Permission denied"

**Check**: Workflow has correct permissions

The workflow already includes:
```yaml
permissions:
  contents: read
  pull-requests: write
```
✅ This is already set!

---

## 🎉 Next Steps After First Success

Once you see your first AI review:

1. **Week 1**: 
   - [ ] Monitor costs daily
   - [ ] Gather team feedback
   - [ ] Adjust settings if needed

2. **Week 2**:
   - [ ] Add to more repositories
   - [ ] Customize prompts (optional)
   - [ ] Set up cost alerts

3. **Month 1**:
   - [ ] Measure impact
   - [ ] Optimize configuration
   - [ ] Consider webhook server for scale

---

## 🚀 Ready to Start?

### For GitHub Actions (Recommended):

1. ✅ **Now**: Get OpenAI API key
2. ✅ **2 min**: Add to GitHub Secrets  
3. ✅ **3 min**: Create test PR
4. ✅ **1 min**: Watch AI review appear!

**Total time**: ~10 minutes

---

### For Local Testing:

1. ✅ **Now**: Get API keys (OpenAI + GitHub)
2. ✅ **2 min**: Create `.env` file
3. ✅ **1 min**: Run `npm run build`
4. ✅ **1 min**: Test with example command

**Total time**: ~5 minutes

---

## 📞 Need Help?

- 📖 Read: [GET_STARTED_NOW.md](./GET_STARTED_NOW.md)
- 📖 Read: [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- 🐛 Issue: Check GitHub Actions logs
- 💬 Stuck: Open a GitHub issue

---

## ✨ You're Almost There!

Pick Method 1 (GitHub Actions) and follow the steps above.

In 10 minutes, you'll have AI reviewing your PRs! 🎉

**Let's do this! 🚀**

