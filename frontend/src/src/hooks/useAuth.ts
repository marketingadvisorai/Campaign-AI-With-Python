import { useState, useEffect } from 'react';
import { STORAGE_KEYS } from '../constants/app';
import type { AuthData } from '../types/app';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    // Check for existing authentication
    if (typeof window !== 'undefined') {
      const savedAuth = localStorage.getItem(STORAGE_KEYS.USER_AUTH);
      if (savedAuth) {
        try {
          const authData: AuthData = JSON.parse(savedAuth);
          setIsAuthenticated(true);
          setUserEmail(authData.email);
        } catch (error) {
          console.error('Error parsing saved auth:', error);
          localStorage.removeItem(STORAGE_KEYS.USER_AUTH);
        }
      }
    }
  }, []);

  const handleLogin = (email: string) => {
    setIsAuthenticated(true);
    setUserEmail(email);
    
    // Save authentication to localStorage
    if (typeof window !== 'undefined') {
      const authData: AuthData = { 
        email, 
        loginTime: Date.now() 
      };
      localStorage.setItem(STORAGE_KEYS.USER_AUTH, JSON.stringify(authData));
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserEmail('');
    
    // Clear authentication from localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEYS.USER_AUTH);
    }
  };

  return {
    isAuthenticated,
    userEmail,
    handleLogin,
    handleLogout,
  };
}