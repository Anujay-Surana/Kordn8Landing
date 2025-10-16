# Deployment Guide

This guide will help you deploy your Kordn8 waitlist landing page with both frontend and backend.

## Overview

- **Frontend**: React app built with Vite
- **Backend**: Express.js server that stores waitlist data in a JSON file
- **Counter**: Displays `136 + N` where N is the actual number of signups
- **Admin Dashboard**: Password-protected page at `/admin` to view and export waitlist data

## Local Development

### 1. Install Dependencies

```bash
npm install
```

### 2. Run the Application

Run both frontend and backend together:

```bash
npm run dev
```

Or run them separately:

```bash
# Terminal 1 - Frontend (runs on http://localhost:5173)
npm run dev:frontend

# Terminal 2 - Backend (runs on http://localhost:3001)
npm run dev:backend
```

### 3. Test the Application

- Open http://localhost:5173 in your browser
- Fill out the form and submit
- Check that `waitlist.json` is created with your data
- Verify the counter shows "136 hustlers are already on the waitlist" (136 + 0)

## Deployment Options

### Option 1: Deploy to Vercel (Recommended for Quick Setup)

#### Frontend Deployment

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy frontend:
```bash
npm run build
vercel --prod
```

3. Set environment variable in Vercel:
   - Go to your Vercel project settings
   - Add environment variable: `VITE_API_URL` = your backend URL

#### Backend Deployment

You'll need to deploy the backend separately. Options:

**Option A: Railway**
1. Go to https://railway.app
2. Create new project from GitHub
3. Add `server.js` as the entry point
4. Railway will automatically detect and deploy

**Option B: Render**
1. Go to https://render.com
2. Create a new Web Service
3. Connect your GitHub repo
4. Set build command: `npm install`
5. Set start command: `node server.js`

### Option 2: Deploy to Netlify

#### Frontend

1. Build the project:
```bash
npm run build
```

2. Deploy to Netlify:
   - Drag and drop the `dist` folder to Netlify
   - Or use Netlify CLI:
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

3. Add environment variable in Netlify:
   - Site settings → Environment variables
   - Add: `VITE_API_URL` = your backend URL

#### Backend

Deploy backend using Railway or Render (see above).

### Option 3: Single Server Deployment (VPS/Heroku)

If you want everything on one server:

1. **Update server.js to serve static files:**

Add this to [server.js](server.js) before the `start()` function:

```javascript
// Serve static files from dist folder
app.use(express.static(path.join(__dirname, 'dist')));

// Serve index.html for all other routes (SPA support)
app.get('*', (req, res) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  }
});
```

2. **Build frontend:**
```bash
npm run build
```

3. **Deploy to your VPS or platform:**
```bash
# Install dependencies
npm install --production

# Start the server
npm start
```

For Heroku:
```bash
heroku create your-app-name
git push heroku main
```

## Admin Dashboard

Access the admin dashboard at `/admin` to view all waitlist entries.

**Default Password**: `anujayakshay1234@`

### Admin Features:
- View all waitlist entries in a table
- See statistics (total signups, displayed count)
- Download data as CSV or JSON
- Refresh data in real-time

**Security Note**: Change the admin password in production by setting the `ADMIN_PASSWORD` environment variable.

## Environment Variables

### Development (.env)
```
VITE_API_URL=http://localhost:3001
PORT=3001
ADMIN_PASSWORD=anujayakshay1234@
```

### Production
Update `VITE_API_URL` to your deployed backend URL:
```
VITE_API_URL=https://your-backend.railway.app
PORT=3001
ADMIN_PASSWORD=your-new-secure-password
```

## Accessing Waitlist Data

All waitlist signups are stored in `waitlist.json` with the following structure:

```json
{
  "entries": [
    {
      "assistantName": "Alex",
      "personality": "professional",
      "email": "user@example.com",
      "phone": "+1 (555) 000-0000",
      "timestamp": "2025-10-16T07:24:00.000Z"
    }
  ]
}
```

### Download Waitlist Data

You can download the `waitlist.json` file from your server:

**If deployed on Railway/Render:**
- SSH into your server or use their file viewer
- Download `waitlist.json`

**If using local/VPS:**
- Copy the file directly from the server

### Convert to CSV (Optional)

Create a simple script `convert-to-csv.js`:

```javascript
import fs from 'fs';

const data = JSON.parse(fs.readFileSync('waitlist.json', 'utf-8'));

const csv = [
  'Assistant Name,Personality,Email,Phone,Timestamp',
  ...data.entries.map(entry =>
    `${entry.assistantName},${entry.personality},${entry.email},${entry.phone},${entry.timestamp}`
  )
].join('\n');

fs.writeFileSync('waitlist.csv', csv);
console.log('Converted to waitlist.csv');
```

Run: `node convert-to-csv.js`

## Monitoring

### Check Waitlist Count

```bash
curl https://your-backend-url/api/waitlist/count
```

Response:
```json
{"count": 5}
```

The frontend will display: **141 hustlers are already on the waitlist** (136 + 5)

## Troubleshooting

### Frontend can't connect to backend

1. Check CORS settings in [server.js:7](server.js#L7)
2. Verify `VITE_API_URL` environment variable
3. Check backend is running and accessible

### Counter shows 136 only

- Backend is not accessible
- Check browser console for errors
- Verify API endpoint is correct

### Duplicate emails

The system prevents duplicate signups. Users will see an error if they try to register twice.

## Security Notes

1. **Rate Limiting**: Consider adding rate limiting to prevent spam
2. **Email Validation**: Server validates email format
3. **Data Backup**: Regularly backup `waitlist.json`
4. **HTTPS**: Use HTTPS in production for secure data transmission

## Next Steps

After deployment:

1. Test the full flow: name check → personality → signup → success
2. Verify email is not duplicated when submitting twice
3. Check that counter increments correctly (136 + N)
4. Share your landing page URL!

## Support

If you encounter issues:
- Check server logs
- Verify all environment variables are set
- Test API endpoints directly with curl or Postman
