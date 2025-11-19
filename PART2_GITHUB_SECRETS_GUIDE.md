# 📘 PART 2 EXPLAINED: Adding API Key to GitHub Secrets

## Understanding "Go to your repo"

When we say `https://github.com/YOUR_USERNAME/AICodeReviewer`, this means:
- **YOUR_USERNAME** = Your actual GitHub username (replace this!)
- **AICodeReviewer** = The name of your repository

---

## 🔍 STEP-BY-STEP: Finding Your Repository

### Method 1: Direct Navigation (Easiest)

**Step 1**: Open your web browser (Chrome, Edge, Firefox, etc.)

**Step 2**: Go to GitHub homepage:
```
https://github.com
```

**Step 3**: Log in if not already logged in
- Click **"Sign in"** (top right)
- Enter your username/email and password

**Step 4**: After logging in, you'll see your GitHub homepage

**Step 5**: Find your repository in one of these ways:

#### Option A: From Your Profile
1. Click on your **profile picture** (top right corner)
2. Click **"Your repositories"**
3. You'll see a list of all your repositories
4. Look for **"AICodeReviewer"** in the list
5. **Click on it**

#### Option B: From the Search Bar
1. Look at the top of the page for a search bar that says "Search or jump to..."
2. Type: `AICodeReviewer`
3. In the dropdown, you'll see your repository
4. Click on it

#### Option C: From Recent Repositories
1. Look at the left sidebar
2. Under "Recent Repositories" you might see **"AICodeReviewer"**
3. Click on it

---

### Method 2: Using Git to Find Repository URL

If you're not sure of your GitHub username, check from your local project:

**In PowerShell:**

```powershell
# Navigate to your project
cd D:\Internal\AICodeReviewer

# Check the remote URL
git remote -v
```

**Output will show something like:**
```
origin  https://github.com/JohnDoe/AICodeReviewer.git (fetch)
origin  https://github.com/JohnDoe/AICodeReviewer.git (push)
```

In this example:
- Your username is: **JohnDoe**
- Your repo URL is: **https://github.com/JohnDoe/AICodeReviewer**

Now you can open that URL in your browser!

---

## 📍 Once You're at Your Repository Page

You should see:

```
┌─────────────────────────────────────────────────────┐
│ github.com/YOUR_USERNAME/AICodeReviewer             │
├─────────────────────────────────────────────────────┤
│                                                     │
│  YOUR_USERNAME / AICodeReviewer      ★ Star        │
│                                                     │
│  Tabs:                                              │
│  < > Code    Issues    Pull requests    Actions    │
│  Projects    Wiki    Security    Insights           │
│  Settings ← YOU NEED THIS ONE!                      │
│                                                     │
└─────────────────────────────────────────────────────┘
```

✅ You're in the right place when you see your repository name at the top!

---

## 🔑 NOW: Add the Secret

### Step 1: Click the "Settings" Tab

**Location**: Top right of your repository page

```
Look for these tabs across the top:
< > Code    Issues    Pull requests    Actions    Projects    Settings
                                                               ↑
                                                          CLICK HERE
```

⚠️ **Don't see "Settings"?**
- You might not have admin access to the repository
- Make sure you're logged into the correct GitHub account
- Make sure this is YOUR repository (not a fork you don't own)

---

### Step 2: Find "Secrets and variables" in Left Sidebar

After clicking Settings, look at the **left sidebar**.

Scroll down until you see:

```
Settings Sidebar:
├── General
├── Collaborators
├── Webhooks
├── ...
├── Secrets and variables  ← FIND THIS
│   ├── Actions  ← CLICK THIS
│   ├── Codespaces
│   └── Dependabot
├── ...
```

**Click on**: "Secrets and variables" to expand it
**Then click on**: "Actions"

---

### Step 3: You're Now on the Secrets Page

You should see a page titled:
```
Actions secrets and variables
```

With tabs:
```
Secrets    Variables
```

Make sure you're on the **"Secrets"** tab.

---

### Step 4: Add New Secret

**Click the green button**: "New repository secret" (top right of the page)

You'll see a form:

---

### Step 5: Fill in the Form

**Field 1 - Name**:
```
OPENAI_API_KEY
```
⚠️ **IMPORTANT**: 
- Must be exactly `OPENAI_API_KEY`
- All UPPERCASE
- No spaces
- Underscores between words

**Field 2 - Secret**:
```
sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```
Paste your actual OpenAI API key here (the one starting with `sk-`)

---

### Step 6: Save the Secret

**Click the green button**: "Add secret"

---

### Step 7: Verify It Was Added

You should now see:

```
Repository secrets

Name                    Updated
────────────────────────────────────
OPENAI_API_KEY         Updated now by YOUR_USERNAME
```

✅ **Success!** Your API key is now securely stored in GitHub!

---

## 🎯 Visual Walkthrough

### What Each Page Looks Like:

**1. GitHub Homepage (after login)**
```
┌─────────────────────────────────────────┐
│ GitHub                      🔍 Search    │
│                                          │
│ Recent Repositories:                     │
│ • AICodeReviewer                         │
│ • my-other-project                       │
│                                          │
│ [Your profile picture]                   │
└─────────────────────────────────────────┘
```

**2. Repository Page**
```
┌─────────────────────────────────────────┐
│ YOUR_USERNAME / AICodeReviewer          │
│ ──────────────────────────────────────  │
│ Code  Issues  Pull requests  Settings   │
│                              ↑ CLICK     │
└─────────────────────────────────────────┘
```

**3. Settings Page (Left Sidebar)**
```
┌─────────────────────────────────────────┐
│ Settings                                │
│ ├── General                             │
│ ├── Secrets and variables  ← HERE!      │
│ │   └── Actions  ← THEN HERE!          │
│ ├── Actions                             │
└─────────────────────────────────────────┘
```

**4. Actions Secrets Page**
```
┌─────────────────────────────────────────┐
│ Actions secrets and variables           │
│ ──────────────────────────────────────  │
│ Secrets    Variables                    │
│                                          │
│ [New repository secret] ← CLICK THIS    │
└─────────────────────────────────────────┘
```

**5. Add Secret Form**
```
┌─────────────────────────────────────────┐
│ Actions secrets / New secret            │
│ ──────────────────────────────────────  │
│ Name *                                  │
│ [OPENAI_API_KEY          ]              │
│                                          │
│ Secret *                                │
│ [sk-your-key-here        ]              │
│                                          │
│         [Add secret]  ← CLICK THIS      │
└─────────────────────────────────────────┘
```

---

## 🆘 Troubleshooting

### Problem: "I can't find my repository"

**Solution 1**: Check if you've pushed your code to GitHub

In PowerShell:
```powershell
cd D:\Internal\AICodeReviewer
git remote -v
```

If you see:
```
fatal: not a git repository
```
Or no output, your code isn't connected to GitHub yet.

**You need to create a repository on GitHub first!**

---

### Problem: "I don't see a 'Settings' tab"

**Possible causes**:
1. You don't have admin rights to the repository
2. You're looking at someone else's repository
3. You're not logged in

**Solution**:
- Make sure you created the repository (not forked from someone else)
- Check you're logged into the correct GitHub account
- If you forked it, you need to add the secret to YOUR fork

---

### Problem: "I don't have a GitHub account"

**Solution**: Create one!

1. Go to: https://github.com/signup
2. Follow the registration process
3. Verify your email
4. Then push your code to GitHub:

```powershell
cd D:\Internal\AICodeReviewer

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit"

# Create repository on GitHub via web interface
# Then connect it:
git remote add origin https://github.com/YOUR_USERNAME/AICodeReviewer.git
git push -u origin main
```

---

## ✅ How to Know You're Done

You've successfully completed Part 2 when:

- [x] You can see your repository on GitHub
- [x] You clicked the "Settings" tab
- [x] You navigated to "Secrets and variables" → "Actions"
- [x] You clicked "New repository secret"
- [x] You entered name: `OPENAI_API_KEY`
- [x] You pasted your OpenAI API key
- [x] You clicked "Add secret"
- [x] You can see `OPENAI_API_KEY` in the secrets list

---

## 🎯 Quick Reference

**Your repository URL format**:
```
https://github.com/YOUR_ACTUAL_USERNAME/AICodeReviewer
```

**To find your username**:
```powershell
git config user.name
```
Or check:
```powershell
cd D:\Internal\AICodeReviewer
git remote -v
```

**Secret name (must be exact)**:
```
OPENAI_API_KEY
```

---

## 📞 Still Stuck?

### Check These:

1. **Are you logged into GitHub?**
   - Go to https://github.com
   - Look for your profile picture (top right)
   - If you see "Sign in", you need to log in

2. **Do you have a repository on GitHub?**
   - Go to https://github.com/YOUR_USERNAME
   - Look for "AICodeReviewer" in your repositories
   - If not there, you need to push your code first

3. **Do you own this repository?**
   - Make sure you created it (not forked)
   - Check Settings tab is visible

---

## 🚀 Once You Complete This Step

After adding the secret, you can proceed to **Part 3: Create Test PR**!

The secret is now securely stored, and GitHub Actions will use it automatically when your PR is created.

---

## Need the Full Step-by-Step?

See: [STEP_BY_STEP_GUIDE.md](./STEP_BY_STEP_GUIDE.md) for complete instructions with all parts!

