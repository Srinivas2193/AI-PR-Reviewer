# 🔧 Troubleshooting Workflow Failure

## Current Status
Workflow is failing after 4 seconds - this indicates a configuration issue, not a code issue.

## Most Common Issues

### 1. ⚠️ Missing OPENAI_API_KEY Secret (Most Likely!)

**Check if secret exists:**
1. Go to: https://github.com/Srinivas2193/AI-PR-Reviewer/settings/secrets/actions
2. Look for: `OPENAI_API_KEY` in the Repository secrets list

**If missing, add it:**
1. Click: "New repository secret"
2. Name: `OPENAI_API_KEY` (must be exact, all caps)
3. Value: Your OpenAI API key (starts with `sk-...`)
4. Click: "Add secret"

### 2. Check the Actual Error

**To see the exact error:**
1. Go to PR: https://github.com/Srinivas2193/AI-PR-Reviewer/pull/1
2. Scroll to "All checks have failed"
3. Click: "Details" next to "ai-review"
4. Read the error message in the logs

Common errors:
- `OPENAI_API_KEY is required` → Secret not set
- `Invalid API key` → Wrong key or key expired
- `npm ci failed` → Dependency issue (should be fixed now)

## How to Re-run After Fixing

### Method 1: From PR Page
1. On the PR page, scroll to checks section
2. Click: Three dots (...) next to the failed check
3. Click: "Re-run job"

### Method 2: From Actions Tab
1. Go to: https://github.com/Srinivas2193/AI-PR-Reviewer/actions
2. Click on the failed workflow run
3. Click: "Re-run jobs" button (top right)
4. Click: "Re-run all jobs"

### Method 3: Push a New Commit
```powershell
# Make a small change to trigger the workflow
git checkout test-pr-reviewer
echo "# Test" >> README.md
git add README.md
git commit -m "Trigger workflow"
git push origin test-pr-reviewer
```

## Expected Success

When it works, you'll see:

### In Actions Tab:
```
✓ Checkout code
✓ Setup Node.js  
✓ Install dependencies
✓ Build project
✓ Run AI Code Review
```

### In PR Files Changed Tab:
- Inline comments on code lines (like Copilot!)
- Security warnings
- Performance suggestions
- Bug detections

### In PR Conversation Tab:
- Summary comment from github-actions[bot]
- Overall rating
- Categorized issues

## Quick Verification Checklist

Before re-running:
- [ ] OPENAI_API_KEY is in GitHub Secrets
- [ ] API key is valid (starts with sk-)
- [ ] API key has billing enabled on OpenAI
- [ ] Workflow file is pushed to main branch
- [ ] PR is from branch in same repo (not fork)

## Still Not Working?

### Check OpenAI Account
1. Go to: https://platform.openai.com/account/api-keys
2. Verify: Your key is active
3. Check: https://platform.openai.com/account/billing
4. Ensure: You have credits or payment method

### Check GitHub Actions Permissions
1. Go to: https://github.com/Srinivas2193/AI-PR-Reviewer/settings/actions
2. Verify: "Allow all actions and reusable workflows" is selected
3. Check: Workflow permissions are set to "Read and write permissions"

### Test Locally First
```powershell
cd D:\Internal\AICodeReviewer
npm run build
# Should complete without errors
```

## What Success Looks Like

### Files Changed Tab (Like Copilot):
```
src/test-issues.ts
───────────────────────────────────────
7  + const API_KEY = "sk-123...";
     
     🤖 github-actions[bot]
     💬 [SECURITY] Hardcoded API key detected.
     Never store API keys in source code. Use environment
     variables instead.
     
     Suggested fix:
     - Remove hardcoded key
     - Use process.env.API_KEY
     - Add to .env file

12 + const query = "SELECT * FROM users WHERE id = " + userId;
   
     🤖 github-actions[bot]  
     💬 [SECURITY] SQL Injection vulnerability!
     This is vulnerable to SQL injection attacks.
     
     Suggested fix:
     Use parameterized queries instead.
```

### Conversation Tab:
```
🤖 github-actions[bot] commented 1 minute ago

## 🤖 AI Code Review

### 🔴 Overall Rating: 3/10

This PR contains several critical security vulnerabilities...

### 🔒 Security Issues (Critical)
- ⚠️ SQL injection vulnerability (line 12)
- ⚠️ Hardcoded API key (line 7)
- ⚠️ Hardcoded password (line 8)
- ⚠️ eval() usage - code injection risk (line 92)

[... more details ...]
```

## Next Steps

1. **Add OPENAI_API_KEY secret** (if missing)
2. **Re-run the workflow**
3. **Wait 60-90 seconds**
4. **Check Files Changed tab** for inline comments
5. **Check Conversation tab** for summary

---

**Once it's green, you'll have inline AI code reviews just like Copilot!** 🎉

