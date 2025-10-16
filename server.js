import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;
const WAITLIST_FILE = path.join(__dirname, 'waitlist.json');

app.use(cors());
app.use(express.json());

// Initialize waitlist file if it doesn't exist
async function initWaitlistFile() {
  try {
    await fs.access(WAITLIST_FILE);
  } catch {
    await fs.writeFile(WAITLIST_FILE, JSON.stringify({ entries: [] }, null, 2));
  }
}

// Read waitlist data
async function readWaitlist() {
  try {
    const data = await fs.readFile(WAITLIST_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return { entries: [] };
  }
}

// Write waitlist data
async function writeWaitlist(data) {
  await fs.writeFile(WAITLIST_FILE, JSON.stringify(data, null, 2));
}

// Get waitlist count
app.get('/api/waitlist/count', async (req, res) => {
  try {
    const waitlist = await readWaitlist();
    res.json({ count: waitlist.entries.length });
  } catch (error) {
    console.error('Error reading waitlist:', error);
    res.status(500).json({ error: 'Failed to fetch waitlist count' });
  }
});

// Admin authentication
app.post('/api/admin/login', async (req, res) => {
  try {
    const { password } = req.body;
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'anujayakshay1234@';

    if (password === ADMIN_PASSWORD) {
      res.json({ success: true, message: 'Authentication successful' });
    } else {
      res.status(401).json({ success: false, error: 'Invalid password' });
    }
  } catch (error) {
    console.error('Error during authentication:', error);
    res.status(500).json({ error: 'Authentication failed' });
  }
});

// Get all waitlist entries (admin only)
app.get('/api/admin/waitlist', async (req, res) => {
  try {
    const waitlist = await readWaitlist();
    res.json({ entries: waitlist.entries, count: waitlist.entries.length });
  } catch (error) {
    console.error('Error reading waitlist:', error);
    res.status(500).json({ error: 'Failed to fetch waitlist' });
  }
});

// Add to waitlist
app.post('/api/waitlist', async (req, res) => {
  try {
    const { assistantName, personality, email, phone } = req.body;

    if (!email || !phone || !assistantName || !personality) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const waitlist = await readWaitlist();

    // Check if email already exists
    const existingEntry = waitlist.entries.find(entry => entry.email === email);
    if (existingEntry) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    const newEntry = {
      assistantName,
      personality,
      email,
      phone,
      timestamp: new Date().toISOString()
    };

    waitlist.entries.push(newEntry);
    await writeWaitlist(waitlist);

    res.status(201).json({
      success: true,
      count: waitlist.entries.length,
      message: 'Successfully added to waitlist'
    });
  } catch (error) {
    console.error('Error adding to waitlist:', error);
    res.status(500).json({ error: 'Failed to add to waitlist' });
  }
});

// Initialize and start server
async function start() {
  await initWaitlistFile();
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

start();
