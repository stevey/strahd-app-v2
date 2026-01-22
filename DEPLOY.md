# Deploy to Vercel - Strahd DM Tracker

## Prerequisites

- GitHub account
- Vercel account (free) - [vercel.com](https://vercel.com)

---

## Option A: Deploy via Vercel Website (Easiest)

### Step 1: Push to GitHub
Make sure your code is committed and pushed:
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### Step 2: Connect to Vercel
1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **"Add New Project"**
3. Find and select your `strahd-app-v2` repository
4. Click **"Import"**

### Step 3: Configure (Auto-detected)
Vercel auto-detects Vite. Just verify:
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

### Step 4: Deploy
1. Click **"Deploy"**
2. Wait ~30 seconds for build
3. Done! You'll get a URL like: `https://strahd-app-v2.vercel.app`

### Step 5: Custom Domain (Optional)
1. Go to Project Settings → Domains
2. Add your domain (e.g., `strahd.yourdomain.com`)
3. Follow DNS instructions

---

## Option B: Deploy via CLI

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Login
```bash
vercel login
```

### Step 3: Deploy
```bash
vercel
```

Follow prompts:
- **Set up and deploy?** Y
- **Which scope?** (Select your account)
- **Link to existing project?** N
- **Project name?** strahd-dm-tracker
- **Directory?** ./
- **Modify settings?** N

### Step 4: Production Deploy
```bash
vercel --prod
```

---

## Auto-Deploy on Push

Once connected, Vercel automatically deploys when you push to GitHub:
- Push to `main` → Production deploy
- Push to other branches → Preview deploy

---

## Data & Storage

### How it Works
- All data stored in browser localStorage
- No database needed
- Each device/browser has separate data

### Sharing Campaign Data
1. Use **Export Backup** to download JSON file
2. Share file with co-DM (email, Discord, etc.)
3. They use **Import Backup** to load it

---

## After Deploying

Test these features:
- [ ] Calendar advances correctly
- [ ] Weather changes and persists
- [ ] Character data saves
- [ ] Name generator works
- [ ] Export/Import backups work
- [ ] Tab navigation works

---

## Troubleshooting

### Build Fails
```bash
rm -rf node_modules dist
npm install
npm run build
```

### Changes Not Showing
- Hard refresh: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows)
- Or clear site data in browser DevTools

### localStorage Full
- Export backup, clear browser data, re-import

---

## Costs

**Vercel Free Tier includes:**
- Unlimited static sites
- 100GB bandwidth/month
- Automatic HTTPS
- Auto-deploy from GitHub

More than enough for personal use.

---

## Quick Reference

| Action | Command |
|--------|---------|
| Local dev | `npm run dev` |
| Build | `npm run build` |
| Deploy preview | `vercel` |
| Deploy production | `vercel --prod` |
