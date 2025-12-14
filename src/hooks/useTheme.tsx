'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  mounted: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  toggleTheme: () => {},
  setTheme: () => {},
  mounted: false,
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // This setState is intentional for hydration-safe theme initialization
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    // Check localStorage first, then system preference
    const stored = localStorage.getItem('theme');
    // Type-safe validation: only accept valid theme values
    const validTheme = stored === 'light' || stored === 'dark' ? stored : null;
    if (validTheme) {
       
      setThemeState(validTheme);
      document.documentElement.setAttribute('data-theme', validTheme);
    } else {
      const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initialTheme = systemPreference ? 'dark' : 'light';
       
      setThemeState(initialTheme);
      document.documentElement.setAttribute('data-theme', initialTheme);
    }
    // Initialization from localStorage/system preference requires effect for SSR compatibility
  }, []);

  useEffect(() => {
    if (!mounted) return;
    // Listen for system preference changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('theme')) {
        const newTheme = e.matches ? 'dark' : 'light';
        setThemeState(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [mounted]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
