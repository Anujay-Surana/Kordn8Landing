import { useState, useEffect } from 'react';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { Card } from './components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './components/ui/table';
import { Loader2, Download, Lock, LogOut, Sparkles } from 'lucide-react';
import { toast, Toaster } from 'sonner@2.0.3';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

interface WaitlistEntry {
  assistantName: string;
  personality: string;
  email: string;
  phone: string;
  timestamp: string;
}

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [entries, setEntries] = useState<WaitlistEntry[]>([]);
  const [fetchingData, setFetchingData] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsAuthenticated(true);
        toast.success('Login successful');
        fetchWaitlistData();
      } else {
        toast.error(data.error || 'Invalid password');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Failed to authenticate');
    } finally {
      setLoading(false);
    }
  };

  const fetchWaitlistData = async () => {
    setFetchingData(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/waitlist`);
      const data = await response.json();

      if (response.ok) {
        setEntries(data.entries);
      } else {
        toast.error('Failed to fetch waitlist data');
      }
    } catch (error) {
      console.error('Error fetching waitlist:', error);
      toast.error('Failed to load data');
    } finally {
      setFetchingData(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword('');
    setEntries([]);
    toast.success('Logged out successfully');
  };

  const downloadCSV = () => {
    const headers = ['Assistant Name', 'Personality', 'Email', 'Phone', 'Timestamp'];
    const rows = entries.map(entry => [
      entry.assistantName,
      entry.personality,
      entry.email,
      entry.phone,
      new Date(entry.timestamp).toLocaleString(),
    ]);

    const csv = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `waitlist-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    toast.success('CSV downloaded');
  };

  const downloadJSON = () => {
    const json = JSON.stringify(entries, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `waitlist-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    toast.success('JSON downloaded');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-primary" />
            <span className="text-primary">Kordn8 Admin</span>
          </div>
        </header>

        {/* Login Form */}
        <main className="flex-1 flex items-center justify-center px-4 py-8">
          <Card className="w-full max-w-md p-8">
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Lock className="w-8 h-8 text-primary" />
                </div>
              </div>

              <div className="space-y-2">
                <h1 className="text-2xl font-semibold">Admin Access</h1>
                <p className="text-muted-foreground">
                  Enter the password to view waitlist data
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2 text-left">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter admin password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 bg-input-background border-border"
                    required
                    autoFocus
                  />
                </div>

                <Button type="submit" className="w-full h-12" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Authenticating...
                    </>
                  ) : (
                    'Login'
                  )}
                </Button>
              </form>
            </div>
          </Card>
        </main>

        <Toaster />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-border">
        <div className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-primary" />
          <span className="text-primary">Kordn8 Admin Dashboard</span>
        </div>
        <Button variant="outline" onClick={handleLogout}>
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-6 py-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Total Signups</p>
                <p className="text-3xl font-bold">{entries.length}</p>
              </div>
            </Card>
            <Card className="p-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Displayed Count</p>
                <p className="text-3xl font-bold">{136 + entries.length}</p>
              </div>
            </Card>
            <Card className="p-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Last Updated</p>
                <p className="text-lg font-semibold">
                  {entries.length > 0
                    ? new Date(entries[entries.length - 1].timestamp).toLocaleString()
                    : 'No entries'}
                </p>
              </div>
            </Card>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button onClick={fetchWaitlistData} disabled={fetchingData}>
              {fetchingData ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Refreshing...
                </>
              ) : (
                'Refresh Data'
              )}
            </Button>
            <Button variant="outline" onClick={downloadCSV} disabled={entries.length === 0}>
              <Download className="w-4 h-4 mr-2" />
              Download CSV
            </Button>
            <Button variant="outline" onClick={downloadJSON} disabled={entries.length === 0}>
              <Download className="w-4 h-4 mr-2" />
              Download JSON
            </Button>
          </div>

          {/* Table */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Waitlist Entries</h2>
            {entries.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                No waitlist entries yet
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>#</TableHead>
                      <TableHead>Assistant Name</TableHead>
                      <TableHead>Personality</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Timestamp</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {entries.map((entry, index) => (
                      <TableRow key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell className="font-medium">{entry.assistantName}</TableCell>
                        <TableCell className="capitalize">{entry.personality}</TableCell>
                        <TableCell>{entry.email}</TableCell>
                        <TableCell>{entry.phone}</TableCell>
                        <TableCell>{new Date(entry.timestamp).toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </Card>
        </div>
      </main>

      <Toaster />
    </div>
  );
}
