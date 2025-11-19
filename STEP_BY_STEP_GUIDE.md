# 🎯 STEP-BY-STEP GUIDE - Deploy AI PR Reviewer

## Complete walkthrough with exact commands and screenshots locations

---

# PART 1: GET YOUR API KEY (5 minutes)

## Step 1.1: Visit OpenAI Website

1. Open your browser
2. Go to: **https://platform.openai.com/**
3. You'll see the OpenAI Platform homepage

---

## Step 1.2: Sign Up or Log In

**If you don't have an account**:
1. Click **"Sign Up"** (top right)
2. Enter your email
3. Verify your email
4. Complete the registration

**If you have an account**:
1. Click **"Log In"** (top right)
2. Enter your credentials

---

## Step 1.3: Add Payment Method (Required!)

1. After logging in, go to: **https://platform.openai.com/account/billing**
2. Or click your profile → **"Billing"**
3. Click **"Add payment method"**
4. Enter your credit card details
5. Click **"Add"**

⚠️ **Important**: You MUST add a payment method to use the API
💰 **Cost**: Only charged for usage (~$0.10-0.50 per PR review)

---

## Step 1.4: Create API Key

1. Go to: **https://platform.openai.com/api-keys**
2. Or click your profile → **"API keys"**
3. Click the green **"Create new secret key"** button
4. In the popup:
   - **Name**: Type "AI PR Reviewer"
   - Click **"Create secret key"**
5. **COPY THE KEY NOW!** (starts with `sk-...`)
6. Paste it somewhere safe (Notepad) - you won't see it again!

✅ **You now have**: `sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

---

# PART 2: ADD KEY TO GITHUB (3 minutes)

## Step 2.1: Go to Your Repository

1. Open GitHub in your browser
2. Go to your repository: `https://github.com/YOUR_USERNAME/AICodeReviewer`
3. You should see your repository homepage

---

## Step 2.2: Open Settings

1. At the top of your repository, you'll see tabs:
   ```
   < > Code    Issues    Pull requests    Actions    Projects    Wiki    Settings
   ```
2. Click the **"Settings"** tab (far right)

⚠️ **Note**: If you don't see "Settings", you might not have admin access to the repo

---

## Step 2.3: Navigate to Secrets

1. In the left sidebar, look for **"Secrets and variables"**
2. Click on it to expand
3. Click **"Actions"** (under "Secrets and variables")

You should see: **"Actions secrets and variables"** page

---

## Step 2.4: Add Your API Key

1. Click the green **"New repository secret"** button (top right)
2. You'll see a form with two fields:

   **Name*** (required):
   ```
   OPENAI_API_KEY
   ```
   ⚠️ **IMPORTANT**: Must be exactly `OPENAI_API_KEY` (all caps, no spaces)

   **Secret*** (required):
   ```
   sk-your-actual-key-from-step-1.4
   ```
   (Paste the key you copied earlier)

3. Click the green **"Add secret"** button

✅ **You should now see**: `OPENAI_API_KEY` in your secrets list

---

# PART 3: VERIFY SETUP IN YOUR CODE (2 minutes)

## Step 3.1: Open PowerShell or Terminal

**Windows**:
1. Press `Win + X`
2. Click **"Windows PowerShell"** or **"Terminal"**

**Or**:
1. Press `Win + R`
2. Type: `powershell`
3. Press Enter

---

## Step 3.2: Navigate to Your Project

```powershell
# Change to your project directory
cd D:\Internal\AICodeReviewer

# Verify you're in the right place
ls
```

**You should see**:
```
.github/
node_modules/
src/
dist/
example-test.js  ← You should see this!
package.json
README.md
```

---

## Step 3.3: Check Current Git Status

```powershell
# Make sure you're on main/master branch
git branch
```

**Output should show**:
```
* main
```
or
```
* master
```

If you're on a different branch:
```powershell
git checkout main
```

---

## Step 3.4: Pull Latest Changes

```powershell
# Make sure you have the latest code
git pull origin main
```

---

# PART 4: CREATE TEST PR (5 minutes)

## Step 4.1: Create a Test Branch

```powershell
# Create and switch to a new test branch
git checkout -b test-ai-reviewer
```

**Output**:
```
Switched to a new branch 'test-ai-reviewer'
```

---

## Step 4.2: Add the Example Test File

```powershell
# Add the example file (already created for you!)
git add example-test.js
```

**No output means success!**

To verify it was added:
```powershell
git status
```

**You should see**:
```
On branch test-ai-reviewer
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        new file:   example-test.js
```

---

## Step 4.3: Commit the File

```powershell
# Commit with a message
git commit -m "Test: AI code reviewer with example file"
```

**Output should show**:
```
[test-ai-reviewer abc1234] Test: AI code reviewer with example file
 1 file changed, 56 insertions(+)
 create mode 100644 example-test.js
```

---

## Step 4.4: Push to GitHub

```powershell
# Push the branch to GitHub
git push origin test-ai-reviewer
```

**Output should show**:
```
Enumerating objects: 4, done.
Counting objects: 100% (4/4), done.
...
To https://github.com/YOUR_USERNAME/AICodeReviewer.git
 * [new branch]      test-ai-reviewer -> test-ai-reviewer
```

✅ **Success!** Your branch is now on GitHub

---

# PART 5: CREATE PULL REQUEST ON GITHUB (2 minutes)

## Step 5.1: Go to GitHub Repository

1. Open your browser
2. Go to: `https://github.com/YOUR_USERNAME/AICodeReviewer`
3. You should see a yellow banner at the top:

```
┌─────────────────────────────────────────────────────┐
│ test-ai-reviewer had recent pushes less than a     │
│ minute ago                                          │
│                        [Compare & pull request]     │
└─────────────────────────────────────────────────────┘
```

---

## Step 5.2: Click "Compare & Pull Request"

1. Click the green **"Compare & pull request"** button
2. You'll be taken to the "Open a pull request" page

---

## Step 5.3: Fill in PR Details

You'll see a form with:

**Title** (already filled):
```
Test: AI code reviewer with example file
```

**Description** (add this):
```
Testing AI code reviewer setup.

This PR includes `example-test.js` with intentional issues:
- SQL injection vulnerability
- Plain text password storage
- Performance issues
- Missing error handling

The AI reviewer should catch all of these!
```

---

## Step 5.4: Create the Pull Request

1. Verify:
   - **base**: `main` ← (your main branch)
   - **compare**: `test-ai-reviewer` ← (your test branch)

2. Click the green **"Create pull request"** button

✅ **PR Created!** You should now see your Pull Request page

---

# PART 6: WATCH THE AI REVIEWER WORK (1-2 minutes)

## Step 6.1: Check GitHub Actions (Immediately)

**Right after creating the PR**:

1. At the top of your PR, look for tabs:
   ```
   Conversation    Commits    Checks    Files changed
   ```

2. You should see a yellow dot 🟡 with:
   ```
   Some checks haven't completed yet
   ✓ 0   →  0   ✓ 0
   ```

3. Click on **"Details"** next to "ai-review"

**OR**:

1. Click the **"Actions"** tab at the very top of your repository
2. You should see **"AI Code Review"** workflow running
3. Click on it to watch progress

---

## Step 6.2: Watch the Workflow Run

You'll see steps executing:

```
✓ Checkout code                    (5 seconds)
✓ Setup Node.js                    (10 seconds)
✓ Install dependencies             (30 seconds)
✓ Build project                    (10 seconds)
→ Run AI Code Review              (30-60 seconds) ← Currently running
```

**Total time**: About 60-90 seconds

---

## Step 6.3: Wait for Completion

When everything is done, you'll see:

```
✓ Checkout code
✓ Setup Node.js
✓ Install dependencies
✓ Build project
✓ Run AI Code Review
```

All with green checkmarks! ✅

---

# PART 7: SEE THE AI REVIEW (After 1-2 minutes)

## Step 7.1: Go Back to Your PR

1. Click **"Pull requests"** tab at the top
2. Click on your PR: **"Test: AI code reviewer with example file"**
3. You're now on the **"Conversation"** tab

---

## Step 7.2: Scroll Down to Comments

Scroll down past the PR description. You should see a comment that looks like this:

```markdown
┌────────────────────────────────────────────────────┐
│ 🤖 github-actions[bot] commented 2 minutes ago     │
├────────────────────────────────────────────────────┤
│                                                    │
│ ## 🤖 AI Code Review                              │
│                                                    │
│ ### 🔴 Overall Rating: 4/10                       │
│                                                    │
│ This PR contains several critical security        │
│ issues that need immediate attention...           │
│                                                    │
│ ### 🔒 Security Issues                            │
│ - ⚠️ SQL injection vulnerability in /user         │
│   endpoint (line 8)                               │
│ - ⚠️ Password stored in plain text (line 16)     │
│                                                    │
│ ### ⚡ Performance Issues                          │
│ - N+1 query problem in getUsersWithPosts          │
│                                                    │
│ ### 💡 Best Practice Suggestions                   │
│ - Use const/let instead of var                    │
│ - Add input validation for email                  │
│                                                    │
│ ### 📝 Code Quality Issues                         │
│ - Missing error handling in divideNumbers         │
│                                                    │
│ ### 🐛 Bugs Found                                  │
│ - Assignment operator used instead of             │
│   comparison (line 51)                            │
│                                                    │
│ ---                                                │
│ 📊 Stats: 1 files changed | +56 -0               │
│ 💬 Inline Comments: 0 specific suggestions        │
│                                                    │
│ *Powered by AI Code Reviewer*                     │
└────────────────────────────────────────────────────┘
```

---

## Step 7.3: Verify the Check Passed

Scroll to the bottom of your PR. You should see:

```
✓ All checks have passed

✓ ai-review
  AI Code Review completed successfully
```

---

# PART 8: VERIFICATION CHECKLIST

## ✅ Everything Working If You See:

- [x] **GitHub Actions tab**: Shows "AI Code Review" workflow completed ✅
- [x] **PR Checks**: Shows "ai-review" passed ✅
- [x] **PR Comments**: Comment from **github-actions[bot]** with AI review ✅
- [x] **Review Content**: Detailed feedback with ratings, security issues, etc. ✅

---

# 🎉 SUCCESS! What Just Happened?

1. ✅ You created a test PR with code issues
2. ✅ GitHub Actions automatically triggered
3. ✅ AI (GPT-4) analyzed your code
4. ✅ AI found all the intentional issues
5. ✅ Review was posted as a comment
6. ✅ Everything worked perfectly!

---

# TROUBLESHOOTING - If Something Went Wrong

## Problem: No workflow runs at all

**Check**:
1. Go to **Settings** → **Actions** → **General**
2. Verify: "Allow all actions and reusable workflows" is selected
3. Click **"Save"** if you changed it

**Then**: Create a new PR and try again

---

## Problem: Workflow fails with "OPENAI_API_KEY is required"

**Fix**:
1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Check if **OPENAI_API_KEY** exists
3. If not, go back to **PART 2** and add it
4. If it exists, try deleting and re-adding it

**Then**: Close and reopen the PR to trigger again

---

## Problem: Workflow fails with "Invalid API key"

**Fix**:
1. Go to https://platform.openai.com/api-keys
2. Generate a **new** API key
3. Copy it
4. Go to **Settings** → **Secrets and variables** → **Actions**
5. Click on **OPENAI_API_KEY** → **Update**
6. Paste the new key
7. Click **"Update secret"**

**Then**: Make a new commit to trigger the workflow again:
```powershell
# Add a comment to the file
echo "// Testing again" >> example-test.js
git add example-test.js
git commit -m "Test: Trigger AI review again"
git push origin test-ai-reviewer
```

---

## Problem: Workflow runs but no comment appears

**Check the logs**:
1. Go to **Actions** tab
2. Click on the latest "AI Code Review" run
3. Click on **"Run AI Code Review"** step
4. Read the output at the bottom

**Common causes**:
- API rate limit (wait a few minutes)
- No files changed (make sure example-test.js is in the PR)
- PR from fork (create PR from branch in same repo)

---

## Problem: "Some checks haven't completed yet" - Stuck

**This might mean**:
1. Workflow is taking longer than usual (wait 2-3 minutes)
2. Workflow is queued (GitHub Actions queue)
3. Workflow crashed

**Check**:
1. Go to **Actions** tab
2. Click on the workflow
3. See if it's still running or failed

**If failed**: Check the error logs and see troubleshooting above

---

# NEXT STEPS - After Successful Test

## Option 1: Clean Up Test PR

```powershell
# Delete the test branch locally
git checkout main
git branch -D test-ai-reviewer
```

On GitHub:
1. Go to the PR
2. Click **"Close pull request"**
3. Click **"Delete branch"** (optional)

---

## Option 2: Create a Real PR

Now that it works, create a real PR:

```powershell
# Create a new branch for real work
git checkout -b feature/my-new-feature

# Make your changes
# ... edit files ...

# Commit and push
git add .
git commit -m "Add new feature"
git push origin feature/my-new-feature
```

Then create PR on GitHub - AI will review it automatically! 🎉

---

## Option 3: Add to More Repositories

To use this on other repositories:

1. **Copy the workflow file**:
   - From: `.github/workflows/ai-review.yml`
   - To: Other repo's `.github/workflows/` folder

2. **Add the secret** to the other repository:
   - Settings → Secrets → Actions
   - Add: `OPENAI_API_KEY`

3. **Create a PR** - Done!

---

# SUMMARY - What You Accomplished

✅ **Got OpenAI API key**  
✅ **Added secret to GitHub**  
✅ **Created test PR**  
✅ **AI automatically reviewed your code**  
✅ **Received detailed feedback**  
✅ **Verified everything works**  

---

# 🎯 Quick Reference Commands

## Create a new test PR:
```powershell
git checkout main
git checkout -b test-ai-reviewer-2
git add example-test.js
git commit -m "Test: Second AI review"
git push origin test-ai-reviewer-2
```

## Check workflow status:
```powershell
# In browser, go to:
# https://github.com/YOUR_USERNAME/AICodeReviewer/actions
```

## Monitor costs:
```powershell
# In browser, go to:
# https://platform.openai.com/usage
```

---

# 📞 Need More Help?

- **Detailed troubleshooting**: [VERIFY_SETUP.md](./VERIFY_SETUP.md)
- **Deployment options**: [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)
- **Quick start**: [NEXT_STEPS.md](./NEXT_STEPS.md)
- **Full guide**: [GET_STARTED_NOW.md](./GET_STARTED_NOW.md)

---

# 🎉 Congratulations!

You now have a working AI PR reviewer that will automatically review every pull request!

**Every time you create or update a PR**:
1. GitHub Actions automatically triggers
2. AI analyzes the code
3. Review appears in your PR
4. You get helpful feedback!

**Enjoy your AI-powered code reviews! 🚀🤖**

