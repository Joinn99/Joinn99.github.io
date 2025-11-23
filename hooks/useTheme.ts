
import { useState, useEffect } from 'react';
import type { Theme } from '../types';

export const useTheme = (): [Theme, (theme: Theme) => void] => {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') as Theme | null;
      if (savedTheme) {
        return savedTheme;
      }
    }
    return 'system';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    const applyTheme = (t: Theme) => {
      if (t === 'dark' || (t === 'system' && systemPrefersDark.matches)) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    };

    const handleSystemChange = (e: MediaQueryListEvent) => {
      if (theme === 'system') {
        applyTheme('system');
      }
    };

    applyTheme(theme);
    systemPrefersDark.addEventListener('change', handleSystemChange);

    return () => {
      systemPrefersDark.removeEventListener('change', handleSystemChange);
    };
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    localStorage.setItem('theme', newTheme);
    setThemeState(newTheme);
  };

  return [theme, setTheme];
};
