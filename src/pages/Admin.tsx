import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useQuizStore } from '@/hooks/useQuizStore';
import { LogOut, RefreshCw, Trash2, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';

const ADMIN_PASSWORD = '150150';

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const { reset } = useQuizStore();

  useEffect(() => {
    const session = sessionStorage.getItem('admin-session');
    if (session === 'active') {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      sessionStorage.setItem('admin-session', 'active');
      toast.success('Login successful');
    } else {
      toast.error('Incorrect password');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem('admin-session');
    setPassword('');
  };

  const handleResetQuiz = () => {
    reset();
    toast.success('Quiz reset successfully');
  };

  const handleClearStorage = () => {
    localStorage.clear();
    sessionStorage.clear();
    toast.success('Storage cleared successfully');
    setTimeout(() => window.location.reload(), 1000);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="p-8 max-w-md w-full">
          <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
          <div className="space-y-4">
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            />
            <Button onClick={handleLogin} className="w-full">
              Login
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 py-20">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Admin Panel</h1>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Test Tools */}
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Test Tools</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Button variant="outline" onClick={handleResetQuiz}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Reset Quiz
            </Button>
            <Button variant="outline" onClick={handleClearStorage}>
              <Trash2 className="w-4 h-4 mr-2" />
              Clear Storage
            </Button>
          </div>
        </Card>

        {/* Quick Links */}
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Quick Links</h2>
          <div className="grid md:grid-cols-2 gap-2">
            <Button variant="outline" asChild>
              <a href="/" target="_blank">
                <ExternalLink className="w-4 h-4 mr-2" />
                Open Landing Page
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href="/quiz" target="_blank">
                <ExternalLink className="w-4 h-4 mr-2" />
                Open Quiz
              </a>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
