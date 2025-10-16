import { useState, useEffect } from 'react';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { RadioGroup, RadioGroupItem } from './components/ui/radio-group';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './components/ui/tooltip';
import { CheckCircle2, Sparkles, Loader2 } from 'lucide-react';
import { toast, Toaster } from 'sonner@2.0.3';

type Step = 'name' | 'personality' | 'signup' | 'success';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export default function App() {
  const [step, setStep] = useState<Step>('name');
  const [assistantName, setAssistantName] = useState('');
  const [personality, setPersonality] = useState('professional');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [checking, setChecking] = useState(false);
  const [waitlistCount, setWaitlistCount] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const personalities = [
    { id: 'professional', name: 'Professional', description: 'Formal, efficient, detail-oriented' },
    { id: 'friendly', name: 'Friendly', description: 'Warm, supportive, conversational' },
    { id: 'strategic', name: 'Strategic', description: 'Analytical, forward-thinking, insightful' },
    { id: 'creative', name: 'Creative', description: 'Innovative, enthusiastic, inspiring' },
  ];

  // Fetch waitlist count on component mount
  useEffect(() => {
    const fetchWaitlistCount = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/waitlist/count`);
        if (response.ok) {
          const data = await response.json();
          setWaitlistCount(data.count);
        }
      } catch (error) {
        console.error('Error fetching waitlist count:', error);
        // Keep default count of 0 if fetch fails
      }
    };
    fetchWaitlistCount();
  }, []);

  const handleCheckName = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!assistantName.trim()) {
      toast.error('Please enter a name for your assistant');
      return;
    }
    
    setChecking(true);
    // Simulate API check
    await new Promise(resolve => setTimeout(resolve, 1000));
    setChecking(false);
    
    // Mock: 90% of names are available
    const isAvailable = Math.random() > 0.1;
    
    if (isAvailable) {
      toast.success(`Great! "${assistantName}" is available`);
      setStep('personality');
    } else {
      toast.error(`Sorry, "${assistantName}" is already taken. Try another name.`);
    }
  };

  const handlePersonalityNext = () => {
    setStep('signup');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }
    if (!phone) {
      toast.error('Please enter your phone number');
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/waitlist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          assistantName,
          personality,
          email,
          phone,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setWaitlistCount(data.count);
        toast.success('Successfully joined the waitlist!');
        setStep('success');
      } else if (response.status === 409) {
        toast.error('This email is already registered on the waitlist');
      } else {
        toast.error(data.error || 'Failed to join waitlist. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting to waitlist:', error);
      toast.error('Network error. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-border">
        <div className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-primary" />
          <span className="text-primary">Kordn8</span>
        </div>
        <nav className="hidden sm:flex items-center gap-6">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
              </TooltipTrigger>
              <TooltipContent>
                <p>Everything you expected from your human assistant minus the attitude and delays.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {step === 'name' && (
            <div className="text-center space-y-8 animate-in fade-in duration-500">
              <div className="space-y-4">
                <h1>Hustling without an executive assistant?</h1>
                <p className="text-muted-foreground">
                  Lock in with your own personalized Kordn8 Assistant.
                  <br/>Join the elite.
                </p>
              </div>

              <form onSubmit={handleCheckName} className="space-y-6">
                <div className="space-y-3 text-left">
                  <Label htmlFor="assistant-name">What should we call your assistant?</Label>
                  <Input
                    id="assistant-name"
                    placeholder="Enter a unique name..."
                    value={assistantName}
                    onChange={(e) => setAssistantName(e.target.value)}
                    className="h-12 text-center bg-input-background border-border"
                    autoFocus
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12"
                  disabled={checking}
                >
                  {checking ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Checking availability...
                    </>
                  ) : (
                    'Check Availability'
                  )}
                </Button>
              </form>

              <p className="text-muted-foreground">
                {136 + waitlistCount} hustlers are already on the waitlist.
              </p>
            </div>
          )}

          {step === 'personality' && (
            <div className="text-center space-y-8 animate-in fade-in duration-500">
              <div className="space-y-4">
                <h1>Choose {assistantName}'s Personality</h1>
                <p className="text-muted-foreground">
                  Select the personality type that best fits your working style
                </p>
              </div>

              <div className="space-y-6">
                <RadioGroup value={personality} onValueChange={setPersonality}>
                  <div className="grid gap-4 text-left">
                    {personalities.map((p) => (
                      <label
                        key={p.id}
                        htmlFor={p.id}
                        className="flex items-start gap-3 p-4 rounded-lg border-2 border-border hover:border-primary cursor-pointer transition-colors"
                      >
                        <RadioGroupItem value={p.id} id={p.id} className="mt-1" />
                        <div className="flex-1">
                          <div className="mb-1">{p.name}</div>
                          <p className="text-muted-foreground">{p.description}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </RadioGroup>

                <Button 
                  onClick={handlePersonalityNext}
                  className="w-full h-12"
                >
                  Continue
                </Button>

                <Button
                  variant="ghost"
                  onClick={() => setStep('name')}
                  className="w-full"
                >
                  Back
                </Button>
              </div>
            </div>
          )}

          {step === 'signup' && (
            <div className="text-center space-y-8 animate-in fade-in duration-500">
              <div className="space-y-4">
                <h1>Almost There!</h1>
                <p className="text-muted-foreground">
                  Share your details to secure a spot and get notified when {assistantName} is ready.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-3 text-left">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 bg-input-background border-border"
                    required
                  />
                </div>

                <div className="space-y-3 text-left">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="h-12 bg-input-background border-border"
                    required
                  />
                </div>

                <Button type="submit" className="w-full h-12" disabled={submitting}>
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Joining waitlist...
                    </>
                  ) : (
                    'Join the Waitlist'
                  )}
                </Button>

                <Button
                  variant="ghost"
                  onClick={() => setStep('personality')}
                  className="w-full"
                  type="button"
                >
                  Back
                </Button>
              </form>
            </div>
          )}

          {step === 'success' && (
            <div className="text-center space-y-8 animate-in fade-in duration-500">
              <div className="flex justify-center">
                <CheckCircle2 className="w-20 h-20 text-green-500" />
              </div>
              
              <div className="space-y-4">
                <h1>Welcome to the Elite Club!</h1>
                <p className="text-muted-foreground">
                  {assistantName} is exclusively booked for you now.
                </p>
              </div>

              <div className="space-y-3 p-6 rounded-lg bg-secondary/50">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Assistant Name</span>
                  <span>{assistantName}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Personality</span>
                  <span className="capitalize">{personality}</span>
                </div>
              </div>

              <p className="text-muted-foreground">
                We'll notify once {assistantName} is all setup for you.
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 px-6 text-center text-muted-foreground border-t border-border">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <p>©2025 Continuum Labs, Inc. All rights reserved.</p>
          <span className="hidden sm:inline">•</span>
          <a 
            href="mailto:founders@kordn8.ai" 
            className="hover:text-foreground transition-colors"
          >
            founders@kordn8.ai
          </a>
        </div>
      </footer>

      <Toaster />
    </div>
  );
}
