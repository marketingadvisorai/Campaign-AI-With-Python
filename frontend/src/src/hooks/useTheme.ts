import { useState, useEffect } from 'react';
import { STORAGE_KEYS } from '../constants/app';
import type { ThemeType } from '../types/app';

export function useTheme() {
  const [theme, setTheme] = useState<ThemeType>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEYS.THEME);
      return (saved as ThemeType) || 'system';
    }
    return 'system';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }

    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.THEME, theme);
    }
  }, [theme]);

  return { theme, setTheme };
}