'use client';

/**
 * ============================================================
 * ThemeProvider — theme switching ka core (React Context)
 *
 * PURPOSE: Selected theme ke colors ko CSS variables mein convert
 *   karke <html> par apply karta hai aur localStorage mein save
 *   karta hai (preference persist rahe).
 *
 * PAGE USAGE: Root layout (src/app/layout.tsx) mein wrap hota hai —
 *   poora app iske andar hai. Koi page directly theme na jaanta hai.
 *
 * USER ACTION: User ThemeSelector se theme chunta hai →
 *   turant poore UI ke vars change → reload par bhi wahi theme.
 *
 * DATA: themes.ts definitions (source of truth) + localStorage
 *   ['task-tracker-theme'] (saved preference).
 *
 * API/DB ROLE: Koi nahi — theme purely client-side hai
 *   (baad mein profile par default theme save karna ho to
 *   `PATCH /api/v1/me` use hoga, abhi optional).
 *
 * ERROR HANDLING: Invalid/corrupt saved id par getThemeById()
 *   default (Ocean) return karta hai; localStorage disabled ho
 *   to session ke liye chalta rehta hai.
 *
 * MOBILE: RN app isi context ke API (themeId/setThemeId) ko
 *   replicate karke themes.ts se StyleSheet banayegi —
 *   logic same, rendering alag.
 * ============================================================
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {
  DEFAULT_THEME_ID,
  THEMES,
  colorsToCssVars,
  getThemeById,
  type ThemeDefinition,
} from './themes';

/** localStorage key — isme user ki last preference save hoti hai. */
const STORAGE_KEY = 'task-tracker-theme';

interface ThemeContextValue {
  /** Currently active theme object. */
  theme: ThemeDefinition;
  /** Currently active theme id (string form). */
  themeId: string;
  /** Saari available themes (selector list ke liye). */
  themes: ThemeDefinition[];
  /** Theme badalne ka function — persist bhi khud karta hai. */
  setTheme: (id: string) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

/**
 * Root wrapper. Layout ise app ke bahar wrap karta hai.
 * Hydration mismatch se bachne ke liye initial state default
 * rakhi jati hai; saved theme mount hone ke baad apply hoti hai.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeId, setThemeId] = useState<string>(DEFAULT_THEME_ID);

  // (1) Mount par saved preference load karo (SSR ke baad — safe).
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) setThemeId(saved);
    } catch {
      // localStorage blocked (private mode) — default theme se chalega.
    }
  }, []);

  // (2) themeId badalte hi CSS variables + data-theme attribute apply karo.
  useEffect(() => {
    const theme = getThemeById(themeId);
    const root = document.documentElement;
    const vars = colorsToCssVars(theme.colors);
    for (const [name, value] of Object.entries(vars)) {
      root.style.setProperty(name, value);
    }
    root.setAttribute('data-theme', theme.id);
  }, [themeId]);

  // (3) setTheme = update + persist (single place for both).
  const setTheme = useCallback((id: string) => {
    if (!THEMES.some((t) => t.id === id)) return; // unknown id ignore
    setThemeId(id);
    try {
      window.localStorage.setItem(STORAGE_KEY, id);
    } catch {
      // persist fail ho to bhi current session mein theme lagu rahega.
    }
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme: getThemeById(themeId),
      themeId,
      themes: THEMES,
      setTheme,
    }),
    [themeId, setTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

/**
 * Hook — components/theme selector ko current theme + setter deta hai.
 * Provider ke bahar use karne par clear error throw hota hai.
 */
export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within <ThemeProvider>');
  }
  return ctx;
}
