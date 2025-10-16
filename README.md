# Kordn8 Waitlist Landing Page

A beautiful waitlist landing page for Kordn8 with admin dashboard to manage signups.

## Features

- 🎨 Multi-step form (Name → Personality → Signup)
- 📊 Live counter showing 136 + actual signups
- 🔐 Password-protected admin dashboard at `/admin`
- 📥 Export waitlist as CSV or JSON
- 📱 Fully responsive design
- ⚡ Built with React, Vite, and Express

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

This starts:
- Frontend: http://localhost:5173
- Backend: http://localhost:3001

### 3. Access Admin Dashboard
- Go to: http://localhost:5173/admin
- Password: `anujayakshay1234@`

## Project Structure

```
├── src/
│   ├── App.tsx          # Main landing page
│   ├── Admin.tsx        # Admin dashboard
│   └── components/      # UI components
├── server.js            # Express backend API
├── waitlist.json        # Waitlist data (auto-created)
└── dist/                # Production build (after npm run build)
```

## API Endpoints

### Public
- `GET /api/waitlist/count` - Get current waitlist count
- `POST /api/waitlist` - Add new entry

### Admin
- `POST /api/admin/login` - Authenticate
- `GET /api/admin/waitlist` - Get all entries

## Environment Variables

Create a `.env` file:
```env
VITE_API_URL=http://localhost:3001
PORT=3001
ADMIN_PASSWORD=anujayakshay1234@
```

## Deployment

### Quick Deploy to Netlify (Frontend)

1. Build the app:
```bash
npm run build
```

2. Deploy the `dist` folder to Netlify:
   - Drag & drop to https://app.netlify.com/drop
   - Or use CLI: `netlify deploy --prod --dir=dist`

3. Set environment variable in Netlify:
   - `VITE_API_URL` = your backend URL

### Deploy Backend (Railway - Recommended)

1. Go to https://railway.app
2. Create new project from GitHub
3. Deploy `server.js`
4. Set environment: `ADMIN_PASSWORD=anujayakshay1234@`
5. Copy Railway URL and use as `VITE_API_URL` in Netlify

**For detailed deployment instructions, see [NETLIFY_DEPLOY.md](NETLIFY_DEPLOY.md)**

## Counter Logic

The landing page shows: **136 + N hustlers are already on the waitlist**

Where N = actual number of signups in the database.

Examples:
- 0 signups → "136 hustlers are already on the waitlist"
- 5 signups → "141 hustlers are already on the waitlist"
- 100 signups → "236 hustlers are already on the waitlist"

## Admin Dashboard Features

- 📊 View all waitlist entries
- 📈 Statistics (total signups, displayed count)
- 💾 Download as CSV or JSON
- 🔄 Refresh data in real-time
- 🔐 Password protected

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **UI**: Radix UI, Tailwind CSS, Shadcn/ui
- **Backend**: Express.js, Node.js
- **Storage**: JSON file (waitlist.json)
- **Routing**: React Router

## Scripts

```bash
npm run dev           # Run both frontend + backend
npm run dev:frontend  # Run only frontend
npm run dev:backend   # Run only backend
npm run build         # Build for production
npm start             # Start backend server
```

## Security Notes

- Change `ADMIN_PASSWORD` in production
- Use HTTPS in production
- Prevent duplicate emails (built-in)
- CORS enabled for API access

## Support

For issues or questions, contact: founders@kordn8.ai

## License

©2025 Continuum Labs, Inc. All rights reserved.