# 🚀 Deploy AI Code Reviewer to Other Repositories

This guide shows you how to use your AI Code Reviewer in any of your other repositories (React, Node.js, Python, etc.)

---

## ✅ Option 1: Copy Workflow (Easiest - 2 minutes)

### Step 1: Add Workflow File

In your other repository, create `.github/workflows/ai-review.yml`:

```yaml
name: AI Code Review

on:
  pull_request:
    types: [opened, synchronize, reopened]

jobs:
  ai-review:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      pull-requests: write
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install AI Reviewer
        run: |
          npm install -g @octokit/rest node-fetch

      - name: Run AI Code Review
        uses: Srinivas2193/AI-PR-Reviewer@main
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          ai_provider: gemini
          gemini_api_key: ${{ secrets.GEMINI_API_KEY }}
          gemini_model: gemini-1.5-pro
```

### Step 2: Add API Key

1. Go to your repository settings: `https://github.com/YOUR_USERNAME/YOUR_REPO/settings/secrets/actions`
2. Click **"New repository secret"**
3. Name: `GEMINI_API_KEY`
4. Value: Your Gemini API key
5. Click **"Add secret"**

### Step 3: Test It!

Create a PR in that repository and the AI will review it automatically! 🎉

---

## ✅ Option 2: Use as Reusable Workflow (Recommended for Multiple Repos)

This is better if you have many repositories.

### Step 1: Make Your AI Reviewer Workflow Reusable

In **this repository** (`AI-PR-Reviewer`), update `.github/workflows/ai-review.yml`:

```yaml
name: AI Code Review

on:
  workflow_call:
    inputs:
      ai_provider:
        description: 'AI provider (gemini, openai, or anthropic)'
        required: false
        type: string
        default: 'gemini'
    secrets:
      GITHUB_TOKEN:
        required: true
      GEMINI_API_KEY:
        required: false
      OPENAI_API_KEY:
        required: false
      ANTHROPIC_API_KEY:
        required: false

  pull_request:
    types: [opened, synchronize, reopened]

jobs:
  ai-review:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      pull-requests: write
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm install

      - name: Build project
        run: npm run build

      - name: Run AI Code Review
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          PR_NUMBER: ${{ github.event.pull_request.number }}
          GITHUB_REPOSITORY: ${{ github.repository }}
          AI_PROVIDER: ${{ inputs.ai_provider || 'gemini' }}
          GEMINI_API_KEY: ${{ secrets.GEMINI_API_KEY }}
          GEMINI_MODEL: gemini-1.5-pro
        run: npm run action
```

### Step 2: In Your Other Repositories

Create `.github/workflows/ai-review.yml`:

```yaml
name: AI Code Review

on:
  pull_request:
    types: [opened, synchronize, reopened]

jobs:
  call-ai-reviewer:
    uses: Srinivas2193/AI-PR-Reviewer/.github/workflows/ai-review.yml@main
    secrets:
      GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      GEMINI_API_KEY: ${{ secrets.GEMINI_API_KEY }}
```

### Step 3: Add API Key to Each Repo

Add `GEMINI_API_KEY` to each repository's secrets (or use organization secrets - see Option 3)

---

## ✅ Option 3: Organization-Wide Secrets (Best for Many Repos)

If you have multiple repositories, set the API key once for your entire organization/account!

### Step 1: Add Organization Secret

1. Go to: `https://github.com/organizations/YOUR_ORG/settings/secrets/actions`
   - Or for personal: `https://github.com/settings/secrets/actions`
2. Click **"New organization secret"** (or **"New secret"**)
3. Name: `GEMINI_API_KEY`
4. Value: Your Gemini API key
5. **Repository access**: Select "All repositories" or choose specific ones
6. Click **"Add secret"**

### Step 2: Use in Any Repository

Now you can use the workflow from Option 2 in **any repository** without adding the secret again!

---

## 🎯 Quick Start for Your React Repositories

### For Each React Repo:

1. **Create** `.github/workflows/ai-review.yml` (use Option 1 or 2 above)
2. **Add** `GEMINI_API_KEY` secret (if not using org-wide secret)
3. **Create a test PR** to verify it works
4. **Done!** ✅

---

## 🔧 Advanced: Customize for Specific File Types

You can customize the reviewer to focus on React/JavaScript patterns:

### Update `src/ai/base.ts` prompt for React:

Add React-specific checks:
- Hook dependencies
- PropTypes/TypeScript interfaces
- Component performance (useMemo, useCallback)
- Accessibility issues
- Key props in lists

---

## 📊 Supported Languages

Your AI reviewer works with **any language**:
- ✅ React.js / TypeScript
- ✅ Node.js
- ✅ Python
- ✅ Java
- ✅ Go
- ✅ PHP
- ✅ And more!

The AI understands all programming languages! 🎉

---

## 🆘 Troubleshooting

### Issue: "Resource not accessible by integration"
**Fix**: Make sure the workflow has `pull-requests: write` permission

### Issue: "API key not found"
**Fix**: Double-check the secret name matches exactly: `GEMINI_API_KEY`

### Issue: "Workflow not triggering"
**Fix**: Make sure the workflow file is on the default branch (main/master)

---

## 🎉 You're Done!

Your AI Code Reviewer is now available for all your repositories! 🚀

**Questions?** Check the main [README.md](README.md) for more details.

