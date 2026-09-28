/**
 * ============================================================
 * themes.ts — THEME DEFINITIONS (single source of truth)
 *
 * PURPOSE: 6 themes ke SEMANTIC color definitions —
 *   Ocean, Royal Purple, Emerald, Sunset, Graphite, Professional Blue.
 *
 * KAISE KAAM KARTA HAI:
 *   ThemeProvider har theme ke colors ko CSS variables
 *   (--color-primary, --color-surface, ...) mein convert karke
 *   <html> par apply karta hai. Components sirf CSS variables
 *   reference karte hain — isliye 6 themes ke liye 6 component
 *   copies BANANE KI ZAROORAT NAHI.
 *
 * RULE: Koi bhi component kabhi direct hex color use nahi karega —
 *   hamesha semantic token (var(--color-*)).
 *
 * MOBILE: RN mein CSS variables nahi chalte, isliye future
 *   mobile app isi `themes.ts` se StyleSheet colors banayegi —
 *   ek hi source, do platforms.
 * ============================================================
 */

/** Har theme ke paas ye semantic colors hone chahiye. */
export interface ThemeColors {
  primary: string; // main buttons, active states, links
  primaryContrast: string; // primary par text/icon ka rang
  secondary: string; // badges, secondary actions
  background: string; // page background
  surface: string; // cards, panels, modals
  surfaceMuted: string; // table rows, hover states, chips
  text: string; // primary text
  muted: string; // labels, timestamps
  border: string; // inputs, dividers, outlines
  success: string; // completed, present
  warning: string; // due-soon, late
  danger: string; // overdue, absent, destructive
  info: string; // neutral info, links
  focus: string; // keyboard focus ring (a11y)
}

export interface ThemeDefinition {
  /** URL-safe id — `data-theme` attribute aur localStorage key. */
  id: string;
  label: string; // selector UI display label
  labelHi: string; // Hindi label (i18n selector ke liye)
  swatch: [string, string, string]; // selector ke liye 3-color preview
  colors: ThemeColors;
}

export const THEMES: ThemeDefinition[] = [
  {
    id: 'ocean',
    label: 'Ocean',
    labelHi: 'ओशन',
    swatch: ['#0ea5e9', '#0369a1', '#e0f2fe'],
    colors: {
      primary: '#0284c7',
      primaryContrast: '#ffffff',
      secondary: '#06b6d4',
      background: '#f0f7fb',
      surface: '#ffffff',
      surfaceMuted: '#e6f1f8',
      text: '#0f172a',
      muted: '#64748b',
      border: '#d3e3ee',
      success: '#16a34a',
      warning: '#d97706',
      danger: '#dc2626',
      info: '#0284c7',
      focus: '#0ea5e9',
    },
  },
  {
    id: 'royal-purple',
    label: 'Royal Purple',
    labelHi: 'रॉयल पर्पल',
    swatch: ['#8b5cf6', '#6d28d9', '#ede9fe'],
    colors: {
      primary: '#7c3aed',
      primaryContrast: '#ffffff',
      secondary: '#a78bfa',
      background: '#f6f4fd',
      surface: '#ffffff',
      surfaceMuted: '#efeafb',
      text: '#1e1b33',
      muted: '#6b6785',
      border: '#ddd6f4',
      success: '#16a34a',
      warning: '#d97706',
      danger: '#dc2626',
      info: '#6366f1',
      focus: '#8b5cf6',
    },
  },
  {
    id: 'emerald',
    label: 'Emerald',
    labelHi: 'एमरल्ड',
    swatch: ['#10b981', '#047857', '#d1fae5'],
    colors: {
      primary: '#059669',
      primaryContrast: '#ffffff',
      secondary: '#34d399',
      background: '#f1f9f5',
      surface: '#ffffff',
      surfaceMuted: '#e5f5ee',
      text: '#0c1a14',
      muted: '#5f7269',
      border: '#cfe8dd',
      success: '#16a34a',
      warning: '#d97706',
      danger: '#dc2626',
      info: '#0891b2',
      focus: '#10b981',
    },
  },

  {
    id: 'sunset',
    label: 'Sunset',
    labelHi: 'सनसेट',
    swatch: ['#f97316', '#c2410c', '#ffedd5'],
    colors: {
      primary: '#ea580c',
      primaryContrast: '#ffffff',
      secondary: '#f59e0b',
      background: '#fdf6f0',
      surface: '#ffffff',
      surfaceMuted: '#fbece0',
      text: '#231a12',
      muted: '#7d6a5a',
      border: '#f0dcc9',
      success: '#16a34a',
      warning: '#d97706',
      danger: '#dc2626',
      info: '#0284c7',
      focus: '#f97316',
    },
  },
  {
    id: 'graphite',
    label: 'Graphite',
    labelHi: 'ग्रेफाइट',
    swatch: ['#64748b', '#334155', '#e2e8f0'],
    colors: {
      primary: '#475569',
      primaryContrast: '#ffffff',
      secondary: '#94a3b8',
      background: '#f4f5f7',
      surface: '#ffffff',
      surfaceMuted: '#eceef1',
      text: '#111827',
      muted: '#6b7280',
      border: '#d7dbe0',
      success: '#16a34a',
      warning: '#d97706',
      danger: '#dc2626',
      info: '#0284c7',
      focus: '#64748b',
    },
  },
  {
    id: 'professional-blue',
    label: 'Professional Blue',
    labelHi: 'प्रोफेशनल ब्लू',
    swatch: ['#2563eb', '#1d4ed8', '#dbeafe'],
    colors: {
      primary: '#1d4ed8',
      primaryContrast: '#ffffff',
      secondary: '#3b82f6',
      background: '#f2f5fb',
      surface: '#ffffff',
      surfaceMuted: '#e8eefb',
      text: '#0f172a',
      muted: '#5f6b84',
      border: '#d3dcf0',
      success: '#16a34a',
      warning: '#d97706',
      danger: '#dc2626',
      info: '#2563eb',
      focus: '#2563eb',
    },
  },
];

/** Default theme id (appConfig.DEFAULT_THEME_ID se match karna chahiye). */
export const DEFAULT_THEME_ID = 'ocean';

/** Id se theme dhoondhna — invalid id par default theme return hoti hai. */
export function getThemeById(id: string): ThemeDefinition {
  return THEMES.find((t) => t.id === id) ?? THEMES[0];
}

/** ThemeColors → CSS variable map (ThemeProvider isi se vars banata hai). */
export function colorsToCssVars(colors: ThemeColors): Record<string, string> {
  return {
    '--color-primary': colors.primary,
    '--color-primary-contrast': colors.primaryContrast,
    '--color-secondary': colors.secondary,
    '--color-background': colors.background,
    '--color-surface': colors.surface,
    '--color-surface-muted': colors.surfaceMuted,
    '--color-text': colors.text,
    '--color-muted': colors.muted,
    '--color-border': colors.border,
    '--color-success': colors.success,
    '--color-warning': colors.warning,
    '--color-danger': colors.danger,
    '--color-info': colors.info,
    '--color-focus': colors.focus,
  };
}

