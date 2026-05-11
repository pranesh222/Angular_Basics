# GitHub Pages Setup Instructions

## 🎯 Complete Setup Guide for Angular_Basics Repository

---

## Step 1: Push Your Code

```powershell
# Navigate to your project
cd d:\pranesh\personal\project\Angular\my-angular-project

# Stage changes
git add .

# Commit
git commit -m "Configure GitHub Actions CI/CD and GitHub Pages deployment"

# Push to main branch
git push origin main
```

---

## Step 2: GitHub Repository Settings

### Access GitHub Pages Settings

1. Go to your GitHub repository: `https://github.com/your-username/Angular_Basics`
2. Click on **Settings** tab (right side of page)
3. In left sidebar, find **Pages** (under "Code and automation" section)

### Configure GitHub Pages

1. **Source Section**:
   - Dropdown: Select `Deploy from a branch`

2. **Branch Selection**:
   - Branch: Select `gh-pages` (created automatically by workflow)
   - Folder: Select `/ (root)`

3. Click **Save**

---

## Step 3: Wait for Deployment

1. Go to **Actions** tab in your repository
2. You should see workflow running: "Angular CI/CD Pipeline - Deploy to GitHub Pages"
3. Wait for both jobs to complete:
   - ✅ **build-and-test** (2-5 minutes)
   - ✅ **deploy** (1-2 minutes)

---

## Step 4: Access Your Live Application

Once workflow completes with green checkmarks:

Visit: **`https://your-username.github.io/Angular_Basics/`**

Replace `your-username` with your actual GitHub username.

### Example:
If your GitHub username is `pranesh`, visit:
- `https://pranesh.github.io/Angular_Basics/`

---

## 🔍 Monitoring Deployment

### Watch Workflow Execution

1. Go to **Actions** tab
2. Click on the latest workflow run
3. Click on **build-and-test** job to see build output
4. Click on **deploy** job to see deployment output

### Check Deployment Status

After 5-10 minutes total:

1. Check the **Deploy** job success (green checkmark)
2. Workflow summary shows: ✅ All jobs passed
3. Visit your GitHub Pages URL

---

## 📋 GitHub Pages Verification Checklist

After deployment, verify:

```
☐ Actions tab shows green checkmarks
☐ gh-pages branch exists in repository
☐ Settings → Pages shows "Your site is live"
☐ Site URL shows: https://username.github.io/Angular_Basics/
☐ Application loads successfully
☐ Routing works (test navigation)
☐ Styles and assets load (no 404 errors)
```

---

## 🚨 If GitHub Pages Shows "Not Found"

### Wait for Deployment
- GitHub Pages can take 5-10 minutes to update
- Wait and refresh browser after 5 minutes

### Verify Settings
1. Go to Settings → Pages
2. Confirm:
   - Source: `Deploy from a branch`
   - Branch: `gh-pages`
   - Folder: `/ (root)`
3. Click Save again

### Clear Cache
- Hard refresh browser: `Ctrl + Shift + R` (or `Cmd + Shift + R` on Mac)

### Check gh-pages Branch
1. Go to repository main page
2. Click branch selector (top left)
3. Should see `gh-pages` branch listed
4. It should have your build files

---

## 🔄 Future Deployments

After initial setup, every time you:

```powershell
git push origin main
```

Automatically:
1. ✅ Tests run
2. ✅ Production build created
3. ✅ Deployed to GitHub Pages
4. ✅ Live in 5-10 minutes

**No manual steps required!**

---

## 📧 Custom Domain (Optional)

If you want to use a custom domain:

### Step 1: In Your Domain Provider
- Point CNAME to: `your-username.github.io`

### Step 2: In GitHub Settings
1. Settings → Pages
2. Under "Custom domain" section
3. Enter your domain: `your-domain.com`
4. Click Save

### Step 3: Wait for SSL
- GitHub will issue SSL certificate automatically
- Takes a few minutes

---

## 🆘 Troubleshooting

### Issue: "GitHub Pages not showing"

**Solution**: 
1. Wait 5-10 minutes
2. Hard refresh browser
3. Check gh-pages branch exists
4. Check workflow succeeded

### Issue: "Page not found / 404 error"

**Solution**:
1. Check URL includes full path: `/Angular_Basics/`
2. Verify `dist/angular/browser/` has files
3. Check base-href in angular.json

### Issue: "Styles not loading"

**Solution**:
1. Styles are served at `/Angular_Basics/assets/`
2. Check browser console for 404 errors
3. Verify CSS files in dist folder

### Issue: "Routing not working"

**Solution**:
1. GitHub Pages requires `404.html` for SPA routing
2. Add this to your deploy workflow (if needed):
   ```bash
   cp dist/angular/browser/index.html dist/angular/browser/404.html
   ```

---

## 🎓 Understanding the Base Path

Your app is deployed to a subdirectory: `/Angular_Basics/`

**This means:**

✅ Correct URL: `https://username.github.io/Angular_Basics/`
❌ Wrong URL: `https://username.github.io/`

**In your application:**
- Assets are served from: `/Angular_Basics/assets/`
- Routes include: `/Angular_Basics/component/`
- Base href must be: `/Angular_Basics/`

This is already configured in:
- `package.json`: `--base-href=/Angular_Basics/`
- Workflow: `base-href="/Angular_Basics/"`

---

## 📊 Workflow Summary

```
Your Push
   ↓
GitHub Actions Triggered
   ↓
Tests Run (ChromeHeadless)
   ↓
Production Build (minified)
   ↓
Deploy to gh-pages Branch
   ↓
GitHub Pages Updates
   ↓
Your app goes LIVE 🚀
```

---

## ✨ What You Get

- ✅ Automatic testing on every push
- ✅ Free hosting on GitHub Pages
- ✅ HTTPS enabled automatically
- ✅ No server management
- ✅ Fast CDN delivery
- ✅ Production-grade build optimization

---

## 🎯 Next Steps

1. **Push code** to main branch
2. **Go to Actions** tab
3. **Wait** for workflow completion
4. **Visit** your GitHub Pages URL
5. **Celebrate** 🎉

---

## 📞 Quick Reference

| Item | Value |
|------|-------|
| Repository | Angular_Basics |
| Deployment | GitHub Pages |
| Branch | gh-pages (auto-created) |
| Base URL | `/Angular_Basics/` |
| Build Output | `dist/angular/browser` |
| Node Version | 20.x |
| Tests | Headless Chrome |
| Status | ✅ Ready to Deploy |

---

## 🚀 You're All Set!

Your Angular application is fully configured for automatic CI/CD deployment. Push your code and watch it go live! 

**Live URL**: `https://your-username.github.io/Angular_Basics/`
