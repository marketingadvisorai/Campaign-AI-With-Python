"use client";

import React, { useEffect, useState } from 'react';
import { LoginScreen } from './components/LoginScreen';
import { Dashboard } from './components/Dashboard';
import { SetupWizard } from './components/SetupWizard';
import { supabase } from '@/lib/supabase/browser-client';

export default function HomePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [needsSetup, setNeedsSetup] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add('dark');

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
      if (session?.user) {
        checkUserSetup(session.user);
      }
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
      if (session?.user) {
        checkUserSetup(session.user);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const checkUserSetup = async (currentUser: { id: string }) => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const accessToken = session?.access_token;
      if (!accessToken) {
        setNeedsSetup(true);
        return;
      }

      const response = await fetch('/api/make-server-5efafb23/user/setup-status', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setNeedsSetup(!data.isSetupComplete);
    } catch (error) {
      console.error('Error checking setup status:', error);
      setNeedsSetup(true);
    }
  };

  const handleLoginSuccess = (userData: any) => {
    setUser(userData);
    checkUserSetup(userData);
  };

  const handleSetupComplete = () => {
    setNeedsSetup(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!user) {
    return <LoginScreen onLoginSuccess={handleLoginSuccess} />;
  }

  if (needsSetup) {
    return <SetupWizard onComplete={handleSetupComplete} />;
  }

  return <Dashboard user={user} />;
}
