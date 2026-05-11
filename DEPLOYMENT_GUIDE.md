# Angular Application - GitHub Actions Deployment Guide

## ✅ Configuration Complete

Your Angular application has been successfully configured for **CI/CD deployment to GitHub Pages** using GitHub Actions.

---

## 📋 Changes Made

### 1. **angular.json** - Updated Output Path
```json
"outputPath": "dist/angular"
```
- Changed from default to your custom output folder: `dist/angular`

### 2. **package.json** - Added Deployment Scripts
Added 3 new npm scripts:
```json
"build:prod": "ng build --configuration production"      // Production build
"test:headless": "ng test --watch=false --browsers=ChromeHeadless"  // Headless tests
"deploy:gh": "ng deploy --base-href=/Angular_Basics/ --cname=false" // Manual deploy
```

### 3. **.github/workflows/deploy.yml** - Complete CI/CD Pipeline
Updated with:
- ✅ **Build & Test Job**: Installs dependencies, runs tests, builds production app
- ✅ **Deploy Job**: Deploys to GitHub Pages automatically on main branch push
- ✅ **Artifact Management**: Uploads and downloads build artifacts
- ✅ **Branch Protection**: Only deploys on `main` branch pushes
- ✅ **Proper Permissions**: GitHub Pages write access configured

---

## 🚀 How It Works

### Trigger
1. When you push code to the `main` branch, the workflow automatically starts
2. A Pull Request also triggers the build & test job (but NOT deployment)

### Pipeline Execution

```
Developer Push to main
    ↓
GitHub Actions Triggered
    ↓
📦 Job 1: Build & Test
    ├── Checkout code
    ├── Setup Node.js (v20)
    ├── Install dependencies (npm ci)
    ├── Run tests (headless)
    └── Build production bundle
    ↓
📦 Job 2: Deploy to GitHub Pages (only on main push)
    ├── Download build artifacts
    └── Deploy using peaceiris/actions-gh-pages@v3
    ↓
✅ Live at: https://your-github-username.github.io/Angular_Basics/
```

---

## 📝 Repository Settings Required

### GitHub Pages Configuration
1. Go to: **Repository → Settings → Pages**
2. Set **Source** to: `Deploy from a branch`
3. Select branch: `gh-pages` (automatically created by the workflow)
4. Select folder: `/ (root)`
5. Click **Save**

### Enable GitHub Pages
- Pages will be published at: `https://your-github-username.github.io/Angular_Basics/`

---

## 🔧 Local Testing Commands

### Build Production
```bash
npm run build:prod
```

### Test Locally
```bash
npm run test:headless
```

### Serve Build Locally
```bash
npm install -g http-server
http-server dist/angular/browser
```
Then open: `http://localhost:8080`

---

## 📊 Workflow Details

### Build & Test Job Configuration
- **Node Version**: 20.x
- **Test Framework**: Karma with ChromeHeadless
- **Build Output**: `dist/angular/`
- **Browser Output**: `dist/angular/browser/`

### Deploy Job Configuration
- **Trigger**: Only on `main` branch pushes
- **Deployment Service**: GitHub Pages (peaceiris action)
- **Publish Directory**: `dist/angular/browser/`
- **Base Href**: `/Angular_Basics/`

---

## ✨ Key Features

✅ **Automated Testing**: Runs tests on every push & pull request
✅ **Production Build**: Creates optimized production bundle
✅ **Artifact Storage**: Saves build artifacts for 1 day
✅ **GitHub Pages Deploy**: Automatically deploys on main push
✅ **Branch Protection**: Only deploys from main branch
✅ **No Manual Steps**: Fully automated from code push to live deployment
✅ **PR Support**: Tests run on pull requests without deployment

---

## 🔄 Continuous Deployment Workflow

### Standard Development Flow

```bash
# 1. Create feature branch
git checkout -b feature/login

# 2. Make changes
# ... edit files ...

# 3. Commit and push
git add .
git commit -m "Added login feature"
git push origin feature/login

# 4. Create Pull Request
# GitHub Actions runs tests automatically ✅
# (CI only, no deployment)

# 5. After approval, merge to main
# GitHub Actions:
# - Runs tests ✅
# - Builds production ✅
# - Deploys to GitHub Pages 🚀

# 6. Live at https://your-username.github.io/Angular_Basics/
```

---

## 🐛 Troubleshooting

### Deployment Not Working?
1. Check workflow status: **Actions tab** → See all workflow runs
2. Verify GitHub Pages enabled in Settings
3. Check `gh-pages` branch was created
4. Confirm branch rule set to `gh-pages`

### Tests Failing?
1. Run locally: `npm run test:headless`
2. Check test files in `src/app/**/*.spec.ts`
3. Fix issues and push again

### Build Errors?
1. Run locally: `npm run build:prod`
2. Check terminal output
3. Fix TypeScript/build errors
4. Push again

---

## 📦 What Gets Deployed?

Your production build includes:
- ✅ Compiled Angular components
- ✅ Minified & optimized code
- ✅ Static assets from `public/` folder
- ✅ Styles (SCSS compiled to CSS)
- ✅ Server-side rendering files

---

## 🎯 Next Steps

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Configure GitHub Actions CI/CD"
   git push origin main
   ```

2. **Monitor Pipeline**:
   - Go to: **Repository → Actions**
   - Watch workflow run in real-time

3. **Enable GitHub Pages**:
   - Settings → Pages → Deploy from `gh-pages` branch

4. **Access Your App**:
   - `https://your-username.github.io/Angular_Basics/`

---

## 📚 References

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Angular CLI Build Documentation](https://angular.io/cli/build)
- [peaceiris/actions-gh-pages](https://github.com/peaceiris/actions-gh-pages)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)

---

## 🎓 Key Concepts Explained

### CI (Continuous Integration)
- Automatically runs tests and builds on every push
- Catches issues early

### CD (Continuous Deployment)
- Automatically deploys to production if tests pass
- No manual deployment needed

### Artifacts
- Build outputs stored temporarily for deployment job
- Keeps jobs independent and efficient

### Base Href
- Sets the base URL for your Angular app
- Important for routing in subdirectories

---

## ✅ Your Application is Ready!

All configurations are complete and ready for deployment. Push your code to the main branch and watch your application go live automatically! 🚀
