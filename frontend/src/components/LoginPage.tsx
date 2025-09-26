import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Separator } from './ui/separator';
import { Sparkles } from 'lucide-react';

interface LoginPageProps {
  onLogin: (email: string, websiteUrl?: string) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<'login' | 'register'>('login');

  const handleContinue = async () => {
    if (!email.trim()) return;
    if (mode === 'register' && !websiteUrl.trim()) return;
    
    setIsLoading(true);
    // Simulate login/register process
    setTimeout(() => {
      onLogin(email, websiteUrl);
      setIsLoading(false);
    }, 1000);
  };

  const handleSocialLogin = (provider: string) => {
    setIsLoading(true);
    // Simulate social login
    setTimeout(() => {
      onLogin(`user@${provider.toLowerCase()}.com`, 'example-website.com');
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && email.trim() && (mode === 'login' || websiteUrl.trim())) {
      handleContinue();
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="p-4 sm:p-6">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center">
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-lg font-medium text-foreground">Campaign AI Studio</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6">
        <div className="w-full max-w-md space-y-8">
          {/* Title Section */}
          <div className="text-center space-y-3">
            <h1 className="text-2xl sm:text-3xl text-foreground">
              {mode === 'login' ? 'Welcome back' : 'Create your account'}
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              {mode === 'login' 
                ? 'Sign in to continue to Campaign AI Studio' 
                : 'Please register first to start creating AI-powered campaigns. You\'ll get smarter responses and can upload files, images, and more.'}
            </p>
          </div>

          {/* Toggle between login and register */}
          <div className="flex bg-muted/50 rounded-lg p-1">
            <Button
              variant={mode === 'login' ? 'default' : 'ghost'}
              className="flex-1 h-10 text-sm"
              onClick={() => setMode('login')}
            >
              Sign In
            </Button>
            <Button
              variant={mode === 'register' ? 'default' : 'ghost'}
              className="flex-1 h-10 text-sm"
              onClick={() => setMode('register')}
            >
              Register
            </Button>
          </div>

          {/* Email and Website Form */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
                className="h-12 px-4 text-base rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                disabled={isLoading}
              />
            </div>
            
            {mode === 'register' && (
              <div className="space-y-2">
                <Input
                  type="url"
                  placeholder="Website URL (e.g., mycompany.com)"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="h-12 px-4 text-base rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                  disabled={isLoading}
                />
                <p className="text-xs text-muted-foreground">
                  We'll use this to create better targeted campaigns for your business
                </p>
              </div>
            )}
            
            <Button
              onClick={handleContinue}
              disabled={!email.trim() || (mode === 'register' && !websiteUrl.trim()) || isLoading}
              className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg text-base font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading 
                ? 'Please wait...' 
                : mode === 'login' 
                  ? 'Sign In' 
                  : 'Create Account'}
            </Button>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-3 text-muted-foreground">OR</span>
            </div>
          </div>

          {/* Social Login Options */}
          <div className="space-y-3">
            <Button
              variant="outline"
              onClick={() => handleSocialLogin('Google')}
              disabled={isLoading}
              className="w-full h-12 justify-start gap-3 rounded-lg border-border hover:bg-accent/50 transition-colors"
            >
              <div className="w-5 h-5 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-4 h-4">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
              </div>
              <span className="text-sm">Continue with Google</span>
            </Button>

            <Button
              variant="outline"
              onClick={() => handleSocialLogin('Microsoft')}
              disabled={isLoading}
              className="w-full h-12 justify-start gap-3 rounded-lg border-border hover:bg-accent/50 transition-colors"
            >
              <div className="w-5 h-5 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-4 h-4">
                  <path fill="#f25022" d="M1 1h10v10H1z" />
                  <path fill="#00a4ef" d="M13 1h10v10H13z" />
                  <path fill="#7fba00" d="M1 13h10v10H1z" />
                  <path fill="#ffb900" d="M13 13h10v10H13z" />
                </svg>
              </div>
              <span className="text-sm">Continue with Microsoft Account</span>
            </Button>

            <Button
              variant="outline"
              onClick={() => handleSocialLogin('Apple')}
              disabled={isLoading}
              className="w-full h-12 justify-start gap-3 rounded-lg border-border hover:bg-accent/50 transition-colors"
            >
              <div className="w-5 h-5 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-4 w-4 fill-current">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
              </div>
              <span className="text-sm">Continue with Apple</span>
            </Button>

            <Button
              variant="outline"
              onClick={() => handleSocialLogin('Phone')}
              disabled={isLoading}
              className="w-full h-12 justify-start gap-3 rounded-lg border-border hover:bg-accent/50 transition-colors"
            >
              <div className="w-5 h-5 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
              </div>
              <span className="text-sm">Continue with phone</span>
            </Button>
          </div>

          {/* Footer Links */}
          <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
            <button className="hover:text-foreground transition-colors underline">
              Terms of Use
            </button>
            <span>|</span>
            <button className="hover:text-foreground transition-colors underline">
              Privacy Policy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}