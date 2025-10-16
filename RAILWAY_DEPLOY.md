# Deploy Backend to Railway - Step by Step

Railway is the easiest way to deploy your Node.js backend. It's free and takes 5 minutes!

## Method 1: Deploy via GitHub (Recommended)

### Step 1: Push to GitHub

1. **Create a GitHub repository**
   - Go to https://github.com/new
   - Create a new repository (e.g., "kordn8-waitlist")

2. **Push your code**
   ```bash
   cd "/Users/anujaysurana/Desktop/Landing Page Design"
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```

### Step 2: Deploy on Railway

1. **Go to Railway**
   - Visit https://railway.app
   - Click "Login" and sign in with GitHub

2. **Create new project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository (kordn8-waitlist)

3. **Railway auto-detects everything!**
   - It sees `package.json` and `server.js`
   - It will automatically:
     - Run `npm install`
     - Start with `node server.js`
     - Assign a public URL

4. **Set environment variables**
   - In your Railway project, click "Variables" tab
   - Add these variables:
     ```
     ADMIN_PASSWORD=anujayakshay1234@
     PORT=3001
     ```

5. **Get your backend URL**
   - Go to "Settings" tab
   - Under "Domains", you'll see your Railway URL
   - Example: `https://kordn8-waitlist-production.up.railway.app`
   - Copy this URL!

### Step 3: Update Netlify with Backend URL

1. Go to your Netlify dashboard
2. Site settings → Environment variables
3. Add or update: `VITE_API_URL` = your Railway URL
4. Trigger a redeploy

---

## Method 2: Deploy via Railway CLI (Alternative)

### Step 1: Install Railway CLI

```bash
npm install -g @railway/cli
```

### Step 2: Login to Railway

```bash
railway login
```

This opens a browser for authentication.

### Step 3: Initialize and Deploy

```bash
cd "/Users/anujaysurana/Desktop/Landing Page Design"

# Initialize Railway project
railway init

# Set environment variables
railway variables set ADMIN_PASSWORD=anujayakshay1234@
railway variables set PORT=3001

# Deploy!
railway up
```

### Step 4: Get Your URL

```bash
railway domain
```

This shows your Railway URL. Copy it and use it in Netlify as `VITE_API_URL`.

---

## Method 3: Manual Upload (No Git)

### Step 1: Prepare Your Files

Create a ZIP file with these files:
```
✅ Include:
   - server.js
   - package.json
   - .env (with your settings)

❌ Don't include:
   - node_modules/
   - dist/
   - src/
   - All frontend files
```

### Step 2: Deploy to Railway

1. Go to https://railway.app
2. Click "New Project"
3. Select "Empty Project"
4. Click on the empty project
5. Click "Add a Service" → "GitHub Repo"
6. Or use "Deploy from local directory" if available

Note: Railway works best with GitHub repos. I recommend Method 1.

---

## Verify Backend is Working

After deployment, test your backend:

### Test 1: Check if server is running
```bash
curl https://your-railway-url.railway.app/api/waitlist/count
```

Expected response:
```json
{"count":0}
```

### Test 2: Test from browser
Open: `https://your-railway-url.railway.app/api/waitlist/count`

You should see: `{"count":0}`

---

## Railway Configuration (Automatic)

Railway automatically detects:
- **Start Command**: `node server.js` (from package.json)
- **Install Command**: `npm install`
- **Port**: Reads from `PORT` environment variable

No configuration file needed! Railway is smart. 🚀

---

## Access Waitlist Data on Railway

### Method 1: Via Admin Dashboard
- Visit: `your-netlify-url.com/admin`
- Login with password
- Download CSV or JSON

### Method 2: Via Railway Dashboard
1. Go to your Railway project
2. Click on your service
3. Click "Deployments" tab
4. Click "View Logs" to see activity
5. For file access, you'll need to download via admin dashboard

---

## Pricing (Don't Worry, It's Free!)

**Railway Free Tier:**
- $5 of usage credit per month
- Automatically renews each month
- More than enough for a waitlist app
- No credit card required to start

Your backend uses very little resources:
- ~$0.01 per day with moderate traffic
- ~$0.30 per month
- Well within the free tier!

---

## Troubleshooting

### "Application failed to respond"
- Check that `PORT` environment variable is set
- Verify `server.js` is in the root directory
- Check Railway logs for errors

### "Cannot read waitlist.json"
- This is normal on first run
- The file is auto-created when first user signs up
- Or you can create an empty one in Railway

### Backend URL not working
- Make sure the URL includes `https://`
- Don't add `/api` at the end
- Example: `https://app.railway.app` (NOT `https://app.railway.app/api`)

### CORS errors
- Already configured in `server.js`
- Make sure `VITE_API_URL` in Netlify matches your Railway URL exactly

---

## Complete Deployment Checklist

### Backend (Railway):
- [ ] Code pushed to GitHub (or uploaded to Railway)
- [ ] Railway project created
- [ ] Environment variable `ADMIN_PASSWORD` set
- [ ] Environment variable `PORT` set to 3001
- [ ] Backend URL copied

### Frontend (Netlify):
- [ ] `npm run build` executed
- [ ] `dist` folder uploaded to Netlify
- [ ] Environment variable `VITE_API_URL` set to Railway URL
- [ ] Site deployed

### Testing:
- [ ] Visit your Netlify URL
- [ ] Submit a test waitlist entry
- [ ] Check counter increments (136 → 137)
- [ ] Visit `/admin` and login
- [ ] Verify entry appears in admin dashboard

---

## Quick Commands Reference

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Initialize project
railway init

# Set environment variables
railway variables set ADMIN_PASSWORD=anujayakshay1234@

# Deploy
railway up

# View logs
railway logs

# Get your domain
railway domain

# Open in browser
railway open
```

---

## What Railway Does Automatically

✅ Installs dependencies (`npm install`)
✅ Starts your server (`node server.js`)
✅ Provides HTTPS domain
✅ Auto-restarts on crashes
✅ Manages environment variables
✅ Provides logs and monitoring
✅ Scales automatically

You just push code and it works! 🎉

---

## Need Help?

1. Check Railway logs: Railway dashboard → Your project → Logs
2. Test backend URL directly: `your-url.railway.app/api/waitlist/count`
3. Check Netlify environment variables are set correctly
4. Verify admin password is set on Railway

**Your backend URL should look like:**
`https://kordn8-waitlist-production.up.railway.app`

Use this exact URL (including `https://`) in Netlify's `VITE_API_URL` environment variable.

Done! 🚀
