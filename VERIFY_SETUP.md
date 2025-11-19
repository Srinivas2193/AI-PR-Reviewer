# ✅ How to Verify Your AI PR Reviewer is Working

## 🎯 Understanding How It Works

The AI PR reviewer is **not a GitHub user** - it's a **GitHub Actions workflow** that runs automatically when you create or update a PR.

**What happens**:
1. You create/update a PR
2. GitHub Actions automatically triggers
3. The AI analyzes your code
4. Comments are posted by **github-actions bot** on your behalf
5. You see the review in your PR!

---

## 📋 Pre-Deployment Checklist

Before creating a test PR, verify these are complete:

### ✅ Step 1: Verify GitHub Secret Exists

1. Go to your repository on GitHub
2. Click: **Settings** → **Secrets and variables** → **Actions**
3. Look for: **`OPENAI_API_KEY`** in the list
4. If it's there ✅ - You're good!
5. If not ❌ - [Follow Step 2 from NEXT_STEPS.md](./NEXT_STEPS.md)

---

### ✅ Step 2: Verify Workflow File Exists

1. In your repository, check: **`.github/workflows/ai-review.yml`**
2. File should exist ✅ (it's already there!)
3. Should contain:
   ```yaml
   on:
     pull_request:
       types: [opened, synchronize, reopened]
   ```

---

### ✅ Step 3: Verify Actions are Enabled

1. Go to your repository on GitHub
2. Click: **Actions** tab
3. If you see "Workflows" sidebar → ✅ Enabled
4. If you see "Enable Actions" button → Click it to enable

---

## 🧪 Test It - Create a Test PR

### Method 1: Using the Example File (Recommended)

Run these commands:

```powershell
# 1. Make sure you're on main/master branch
git checkout main
git pull

# 2. Create a test branch
git checkout -b test-ai-reviewer

# 3. Add the example test file
git add example-test.js

# 4. Commit it
git commit -m "Test: AI code reviewer setup"

# 5. Push to GitHub
git push origin test-ai-reviewer
```

Then:
1. Go to your repository on GitHub
2. You'll see a banner: **"Compare & pull request"** - Click it
3. Add a description: "Testing AI code reviewer"
4. Click: **"Create pull request"**

---

### Method 2: Create Your Own Test File

```powershell
# 1. Create test branch
git checkout -b test-ai-reviewer

# 2. Create a simple file with a security issue
echo "const password = 'admin123'; // Plain text password" > test-security.js

# 3. Commit and push
git add test-security.js
git commit -m "Test: Security check"
git push origin test-ai-reviewer
```

Then create the PR on GitHub (same as above).

---

## 🔍 Where to Check If It's Working

### ✅ Check 1: GitHub Actions Tab (Immediate)

1. After creating the PR, go to: **Actions** tab
2. You should see: **"AI Code Review"** workflow running
3. Click on it to see progress
4. **Status indicators**:
   - 🟡 **Yellow circle** = Running (wait 30-60 seconds)
   - ✅ **Green checkmark** = Success!
   - ❌ **Red X** = Error (check logs)

**Screenshot locations**:
```
Repository → Actions Tab → "AI Code Review" workflow
```

---

### ✅ Check 2: PR Comments (After ~60 seconds)

1. Go back to your **Pull Request**
2. Scroll down to the **comments section**
3. You should see a comment from **github-actions[bot]**
4. The comment will have:
   ```markdown
   ## 🤖 AI Code Review
   
   ### 🟢 Overall Rating: X/10
   ...
   ```

---

### ✅ Check 3: PR Checks Section

1. In your PR, look at the bottom
2. You'll see: **"All checks have passed"** or **"Some checks are in progress"**
3. One of them will be: **"ai-review"**
4. Click **"Details"** to see the full log

---

## 📊 What a Successful Test Looks Like

### In GitHub Actions (while running):
```
✓ Checkout code
✓ Setup Node.js
✓ Install dependencies
✓ Build project
→ Run AI Code Review (in progress...)
```

### In GitHub Actions (completed):
```
✓ Checkout code
✓ Build project
✓ Run AI Code Review
✓ All steps completed successfully
```

### In PR Comments:
You'll see a detailed comment like:

```markdown
## 🤖 AI Code Review

### 🔴 Overall Rating: 4/10

This PR contains several security concerns...

### 🔒 Security Issues
- ⚠️ Plain text password on line 1
- ⚠️ SQL injection vulnerability

### ✅ Positive Points
- Code is well-formatted

---
📊 Stats: 1 files changed | +8 -0
💬 Inline Comments: 2 specific suggestions

*Powered by AI Code Reviewer*
```

---

## ❌ Troubleshooting - If It's NOT Working

### Issue 1: No Workflow Runs at All

**Symptoms**: Actions tab shows nothing when you create PR

**Possible Causes**:
- Actions not enabled in repository
- Workflow file missing or in wrong location

**Solutions**:
1. Go to **Settings** → **Actions** → **General**
2. Ensure: "Allow all actions and reusable workflows" is selected
3. Verify workflow file exists at: `.github/workflows/ai-review.yml`

---

### Issue 2: Workflow Runs but Fails

**Symptoms**: Red X in Actions tab

**Check the logs**:
1. Click on the failed workflow
2. Click on "Run AI Code Review" step
3. Look for error message

**Common errors**:

#### Error: "OPENAI_API_KEY is required"
**Solution**: Add the secret to GitHub:
- Settings → Secrets → Actions → New secret
- Name: `OPENAI_API_KEY`
- Value: Your OpenAI API key

#### Error: "Invalid API key"
**Solution**: 
- Double-check your API key
- Verify billing is set up on OpenAI
- Try generating a new key

#### Error: "Permission denied" or "Resource not accessible"
**Solution**: Already handled in the workflow! Check that the workflow has:
```yaml
permissions:
  contents: read
  pull-requests: write
```

---

### Issue 3: Workflow Succeeds but No Comments

**Symptoms**: Green checkmark but no AI comment on PR

**Possible Causes**:
- PR is from a forked repository (secrets aren't available to forks)
- AI didn't find any issues worth commenting on
- API rate limit hit

**Check**:
1. Look at the workflow logs - does it say "Review completed successfully"?
2. Check if there are file changes in the PR
3. Try with `example-test.js` which has known issues

**Solution**:
- Ensure PR is from a branch in the same repository (not a fork)
- Use the example test file which definitely has issues
- Check OpenAI API quota: https://platform.openai.com/usage

---

## 🎯 Quick Verification Commands

### Check if workflow file exists:
```powershell
# Should show the file
Get-Content .github\workflows\ai-review.yml
```

### Check if example test file exists:
```powershell
# Should show the file with intentional issues
Get-Content example-test.js
```

### Check current branch:
```powershell
git branch
```

### Check if you have uncommitted changes:
```powershell
git status
```

---

## 📸 Visual Guide - Where to Look

### 1. **Repository → Actions Tab**
```
Actions
├── All workflows
│   └── AI Code Review ← Look here!
│       └── Recent runs
│           └── Test: AI code reviewer setup ← Your test run
│               ├── Build (Node.js)
│               └── Run AI Code Review ← Click for logs
```

### 2. **Pull Request Page**
```
Your PR
├── Conversation tab
│   └── Comments ← AI review appears here
├── Commits tab
├── Checks tab ← Status of workflows
│   └── ai-review ← Click "Details" for logs
└── Files changed tab
```

---

## ✅ Success Indicators

You'll know it's working when you see:

1. ✅ **Actions Tab**: Workflow runs and completes (green checkmark)
2. ✅ **PR Comments**: AI comment appears from github-actions[bot]
3. ✅ **PR Checks**: "ai-review" check passes
4. ✅ **Detailed Review**: Comment has ratings, issues, and suggestions

---

## 🎉 Next Steps After Verification

Once you confirm it's working:

### Immediate:
- ✅ Delete the test branch (if you want)
- ✅ Test on a real PR
- ✅ Share with your team

### This Week:
- Monitor costs: https://platform.openai.com/usage
- Gather feedback from team
- Adjust settings if needed

### Customize (Optional):
Edit `.github/workflows/ai-review.yml`:
- Change model: `OPENAI_MODEL: gpt-3.5-turbo` (cheaper)
- Adjust limits: `MAX_FILES_TO_REVIEW: 10`
- Switch to Anthropic Claude

---

## 🆘 Still Not Working?

### Step-by-Step Debug:

1. **Verify Secret**:
   ```
   Settings → Secrets → Actions → Check OPENAI_API_KEY exists
   ```

2. **Check Workflow File**:
   ```
   .github/workflows/ai-review.yml should exist
   ```

3. **Enable Actions**:
   ```
   Settings → Actions → General → Allow all actions
   ```

4. **Create Clean Test**:
   ```powershell
   git checkout main
   git pull
   git checkout -b fresh-test
   git add example-test.js
   git commit -m "Test AI review"
   git push origin fresh-test
   # Create PR on GitHub
   ```

5. **Check Actions Log**:
   ```
   Actions tab → Click workflow → Read error message
   ```

6. **Verify API Key Works**:
   - Go to: https://platform.openai.com/playground
   - Try a test query
   - If it doesn't work there, regenerate your key

---

## 📞 Get Help

If still stuck:

1. **Check the logs**: Actions tab → Click failed run → Read error
2. **Review docs**: [NEXT_STEPS.md](./NEXT_STEPS.md)
3. **Check API status**: https://status.openai.com/
4. **Verify billing**: https://platform.openai.com/account/billing

---

## 🎯 Summary - Quick Test

```powershell
# 1. Verify secret exists (GitHub Settings → Secrets)
# 2. Create test branch
git checkout -b test-ai-reviewer

# 3. Add example file
git add example-test.js
git commit -m "Test AI reviewer"
git push origin test-ai-reviewer

# 4. Create PR on GitHub
# 5. Wait 60 seconds
# 6. Check for AI comment from github-actions[bot]
```

**Expected**: AI review comment appears in 30-60 seconds!

---

## ✨ You've Got This!

The AI reviewer runs **automatically** - no need to add it as a reviewer manually.

Just create a PR and watch the **github-actions[bot]** post the AI review! 🎉

**Ready to test?** Follow the commands above and create your first AI-reviewed PR!

