# 🚀 5-Minute Setup Guide: Use AI Code Reviewer in Any Repository

Follow these simple steps to add AI Code Review to your React, Python, Java, or any other project!

---

## ✅ Prerequisites (1 minute)

Before you start, make sure you have:
- ✅ A GitHub repository (any language/framework)
- ✅ A free Google Gemini API key

**Don't have a Gemini API key yet?**
1. Go to: https://aistudio.google.com/app/apikey
2. Click **"Create API Key"**
3. Copy the key (starts with `AIza...`)

---

## 📝 Step-by-Step Guide

### Step 1: Merge This PR (1 minute)

**First, make the AI reviewer available on your main branch:**

1. Go to: https://github.com/Srinivas2193/AI-PR-Reviewer/pull/1
2. Click **"Merge pull request"**
3. Click **"Confirm merge"**
4. ✅ Done! The AI reviewer is now ready to use.

---

### Step 2: Go to Your Other Repository (30 seconds)

Open the repository where you want AI code reviews (e.g., your React project):

```
https://github.com/YOUR_USERNAME/YOUR_REACT_PROJECT
```

---

### Step 3: Create Workflow File (2 minutes)

#### Option A: Using GitHub Web Interface (Easier)

1. **Go to your repository** on GitHub
2. Click **"Add file"** → **"Create new file"**
3. **File name**: `.github/workflows/ai-review.yml`
   - Type this exactly, including the `.github/workflows/` part
4. **Paste this content**:

```yaml
name: AI Code Review

on:
  pull_request:
    types: [opened, synchronize, reopened]

jobs:
  ai-code-review:
    uses: Srinivas2193/AI-PR-Reviewer/.github/workflows/ai-review.yml@main
    secrets:
      GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      GEMINI_API_KEY: ${{ secrets.GEMINI_API_KEY }}
```

5. Click **"Commit new file"**

#### Option B: Using Command Line

In your repository folder:

```bash
# Create the directory
mkdir -p .github/workflows

# Create the file
cat > .github/workflows/ai-review.yml << 'EOF'
name: AI Code Review

on:
  pull_request:
    types: [opened, synchronize, reopened]

jobs:
  ai-code-review:
    uses: Srinivas2193/AI-PR-Reviewer/.github/workflows/ai-review.yml@main
    secrets:
      GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      GEMINI_API_KEY: ${{ secrets.GEMINI_API_KEY }}
EOF

# Commit and push
git add .github/workflows/ai-review.yml
git commit -m "Add AI Code Reviewer"
git push origin main
```

---

### Step 4: Add API Key Secret (1 minute)

1. **Go to your repository settings**:
   ```
   https://github.com/YOUR_USERNAME/YOUR_REPO/settings/secrets/actions
   ```

2. Click **"New repository secret"**

3. **Fill in**:
   - **Name**: `GEMINI_API_KEY` (exactly like this, all caps)
   - **Secret**: Paste your Gemini API key

4. Click **"Add secret"**

5. ✅ You should see: `GEMINI_API_KEY` in your secrets list

---

### Step 5: Test It! (2 minutes)

Now let's test the AI reviewer:

#### Create a Test Branch

```bash
# Create a new branch
git checkout -b test-ai-reviewer

# Create a test file with an intentional issue
cat > test.js << 'EOF'
// Test file for AI reviewer
const API_KEY = "hardcoded-secret-key";  // Security issue!

function divideNumbers(a, b) {
  return a / b;  // Bug: no zero check!
}
EOF

# Commit and push
git add test.js
git commit -m "Test: Add file with issues for AI review"
git push origin test-ai-reviewer
```

#### Create Pull Request

1. **Go to your repository** on GitHub
2. You'll see a banner: **"Compare & pull request"** - Click it
3. Click **"Create pull request"**

#### Watch the Magic! ✨

Within 1-2 minutes, you'll see:

1. ✅ A check called **"AI Code Review"** appears
2. 🤖 **Comments from github-actions[bot]** on your code:
   ```
   🤖 AI Code Reviewer [SECURITY]
   
   Hardcoded credentials detected. API keys should be 
   loaded from environment variables...
   ```
3. 📝 A **summary comment** with overall rating

---

## 🎉 Success! You're Done!

Your AI Code Reviewer is now active! It will automatically review every pull request in this repository.

---

## 📊 What Happens Now?

### Every time you create or update a PR:

1. **Automatic trigger**: Workflow starts within seconds
2. **AI analysis**: Reviews all changed files (1-2 minutes)
3. **Comments posted**: Inline comments + summary
4. **You get feedback**: Security, bugs, performance, quality

### The AI will check:
- 🔒 **Security**: Hardcoded secrets, SQL injection, XSS
- ⚡ **Performance**: Slow algorithms, N+1 queries
- 🐛 **Bugs**: Null checks, edge cases, type errors
- 📝 **Quality**: Error handling, code structure
- 💡 **Best Practices**: Framework-specific patterns

---

## 🔄 Use in Multiple Repositories

**Repeat Steps 2-4** for each repository where you want AI code reviews!

Quick checklist:
- [ ] Create `.github/workflows/ai-review.yml`
- [ ] Add `GEMINI_API_KEY` secret
- [ ] Test with a PR
- [ ] Done! ✅

---

## 💡 Pro Tips

### Tip 1: Use Organization Secrets (If you have many repos)

Instead of adding the API key to each repository:

1. Go to: `https://github.com/organizations/YOUR_ORG/settings/secrets/actions`
   - Or personal: `https://github.com/settings/secrets/actions`
2. Add `GEMINI_API_KEY` there
3. Select **"All repositories"**
4. Now all your repos can use the same key! 🎉

### Tip 2: Customize for Your Needs

Change the workflow file to use different AI models:

```yaml
jobs:
  ai-code-review:
    uses: Srinivas2193/AI-PR-Reviewer/.github/workflows/ai-review.yml@main
    secrets:
      GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      GEMINI_API_KEY: ${{ secrets.GEMINI_API_KEY }}
    with:
      ai_provider: 'gemini'
      gemini_model: 'gemini-1.5-pro'  # or 'gemini-1.5-flash' for faster reviews
```

### Tip 3: Works with ANY Language

No configuration needed! The AI automatically detects:
- React, Vue, Angular, Svelte
- Python, Java, .NET, Go, Ruby, PHP
- TypeScript, JavaScript
- And literally any programming language!

---

## 🆘 Troubleshooting

### Issue: "Workflow not found"
**Solution**: Make sure you merged the PR in Step 1, so the workflow exists on `main` branch of AI-PR-Reviewer repo.

### Issue: "Secret not found"
**Solution**: Double-check the secret name is exactly `GEMINI_API_KEY` (all caps, with underscores).

### Issue: "Permission denied"
**Solution**: Make sure the workflow file has `pull-requests: write` permission. The example above handles this automatically.

### Issue: "API key invalid"
**Solution**: 
1. Get a new key from: https://aistudio.google.com/app/apikey
2. Update the secret in your repository settings

### Issue: "No comments appearing"
**Solution**: Check the Actions tab to see if the workflow ran. Look at the logs for any errors.

---

## 📸 Visual Guide

### What You'll See in Your PR:

**1. The Check Status:**
```
✅ AI Code Review / ai-code-review (pull_request)
```

**2. Inline Comments:**
```
🤖 AI Code Reviewer [SECURITY]

Hardcoded API key detected. Secrets should be loaded 
from environment variables to prevent exposure.

Suggested change:
- const API_KEY = "hardcoded-secret";
+ const API_KEY = process.env.API_KEY;
```

**3. Summary Comment:**
```
# 🤖 AI Code Reviewer

> Automated code review powered by AI

### 🟡 Overall Rating: 7/10

This PR introduces a few security concerns...

🔒 Security Issues
⚠️ Hardcoded credentials found...

⚡ Performance Issues
• N+1 query problem detected...
```

---

## 🎯 Quick Reference

**Minimum setup (3 files total):**

1. **In AI-PR-Reviewer repo**: Merge PR to main ✅
2. **In your other repo**: Add `.github/workflows/ai-review.yml`
3. **In your repo settings**: Add `GEMINI_API_KEY` secret

**That's it!** 🎉

---

## 🚀 Next Steps

1. ✅ Test it with a real feature branch in your project
2. ✅ Add it to all your repositories
3. ✅ Share with your team!
4. ✅ Enjoy automated code reviews! 🎉

---

## 📞 Need Help?

- Check the main [README.md](README.md)
- See [SUPPORTED_LANGUAGES.md](SUPPORTED_LANGUAGES.md) for language-specific info
- See [DEPLOY_TO_OTHER_REPOS.md](DEPLOY_TO_OTHER_REPOS.md) for advanced options

**Happy coding with your AI code reviewer!** 🤖✨

