# Quick Netlify Deployment Guide

## Simple 2-Step Deployment

### Step 1: Deploy Frontend to Netlify (Drag & Drop)

1. **Build the frontend:**
   ```bash
   npm install
   npm run build
   ```
   This creates a `dist` folder with your React app.

2. **Deploy to Netlify:**
   - Go to https://app.netlify.com/drop
   - Drag and drop the **`dist`** folder
   - Done! Your frontend is live.

3. **Configure environment variable:**
   - Go to your Netlify site dashboard
   - Go to: Site settings → Environment variables
   - Add: `VITE_API_URL` = your backend URL (see Step 2)
   - Redeploy the site

### Step 2: Deploy Backend (Choose One)

Your backend needs to run somewhere to store waitlist data. Pick one:

#### Option A: Railway (Easiest - 5 minutes)

1. Go to https://railway.app
2. Click "Start a New Project" → "Deploy from GitHub repo"
3. Or use "Deploy from Template" and upload your code
4. Railway will detect `server.js` and deploy automatically
5. Copy your Railway URL (e.g., `https://your-app.up.railway.app`)
6. Go back to Netlify and set `VITE_API_URL` to this Railway URL
7. Add environment variable in Railway: `ADMIN_PASSWORD=anujayakshay1234@`

#### Option B: Render

1. Go to https://render.com
2. Create "New Web Service"
3. Connect your GitHub repo (or upload manually)
4. Set:
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
5. Add environment variable: `ADMIN_PASSWORD=anujayakshay1234@`
6. Copy your Render URL and use it as `VITE_API_URL` in Netlify

#### Option C: Fly.io (Free tier)

1. Install Fly CLI: `npm install -g flyctl`
2. Login: `flyctl auth login`
3. Deploy: `flyctl launch`
4. Set secret: `flyctl secrets set ADMIN_PASSWORD=anujayakshay1234@`
5. Copy your Fly.io URL and use it as `VITE_API_URL` in Netlify

### Step 3: Update Frontend with Backend URL

Once your backend is deployed:

1. Go to Netlify dashboard → Site settings → Environment variables
2. Update or add: `VITE_API_URL=https://your-backend-url.com`
3. Click "Trigger deploy" to rebuild with the new URL

## Testing Your Deployment

1. **Test main page**: Visit your Netlify URL
2. **Submit a test entry**: Fill out the form and submit
3. **Check admin page**: Go to `your-netlify-url.com/admin`
4. **Login with password**: `anujayakshay1234@`
5. **Verify entry appears**: You should see your test entry in the table

## Accessing Waitlist Data

### From Railway:
- Go to Railway dashboard
- Click on your project → Files tab
- Download `waitlist.json`

### From Render:
- Use Render Shell to access files
- Or use the admin dashboard to download CSV/JSON

### From Admin Dashboard:
- Visit `your-netlify-url.com/admin`
- Login and click "Download CSV" or "Download JSON"

## File Structure for Drag & Drop

If you want to drag and drop to Netlify:

```
✅ DEPLOY THIS:
   dist/           <- Drag this folder to Netlify

❌ DON'T DEPLOY THESE:
   src/
   node_modules/
   server.js       <- Deploy this to Railway/Render separately
   waitlist.json
```

## Alternative: Netlify CLI (For Continuous Deployment)

If you prefer using CLI or connecting to GitHub:

1. **Install Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login and initialize:**
   ```bash
   netlify login
   netlify init
   ```

3. **Deploy:**
   ```bash
   npm run build
   netlify deploy --prod
   ```

4. **Set environment variable:**
   ```bash
   netlify env:set VITE_API_URL "https://your-backend-url.com"
   ```

## Troubleshooting

### "Backend not accessible" error
- Verify backend is running on Railway/Render
- Check CORS is enabled in server.js (it is by default)
- Ensure `VITE_API_URL` is set correctly in Netlify

### Admin page shows 404
- Make sure `netlify.toml` is in your project root
- This file tells Netlify to handle SPA routing correctly

### Counter shows only 136
- Backend connection failed
- Check browser console for errors
- Verify `VITE_API_URL` is set in Netlify environment variables

## Environment Variables Summary

**Netlify (Frontend):**
```
VITE_API_URL=https://your-backend-url.com
```

**Railway/Render (Backend):**
```
ADMIN_PASSWORD=anujayakshay1234@
PORT=3001
```

## Cost Breakdown

- **Netlify**: Free (100GB bandwidth/month)
- **Railway**: Free tier ($5 credit/month, auto-sleeps)
- **Render**: Free tier (sleeps after 15 min inactivity)
- **Fly.io**: Free tier (3 small VMs)

**Recommended for production**: Railway (most reliable for free tier)

## Quick Checklist

- [ ] Frontend built with `npm run build`
- [ ] `dist` folder uploaded to Netlify
- [ ] Backend deployed to Railway/Render
- [ ] `VITE_API_URL` set in Netlify environment variables
- [ ] `ADMIN_PASSWORD` set in backend environment variables
- [ ] Test main page works
- [ ] Test form submission
- [ ] Test admin login at `/admin`
- [ ] Test data appears in admin dashboard

Done! 🚀
