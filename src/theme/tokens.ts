/**
 * ============================================================
 * tokens.ts — BASE DESIGN TOKENS (platform independent)
 *
 * PURPOSE: Non-color design constants — spacing, radius,
 *   typography, shadows, z-index. Ye values sab themes mein
 *   common rehti hain (sirf colors theme se badalte hain).
 *
 * USAGE: Components aur theme definitions dono isi se import
 *   karte hain. Mobile (RN) app bhi ye tokens use karegi.
 *
 * RULE: Components mein kabhi magic numbers (8px, 12px...) nahi —
 *   hamesha tokens ya CSS variables use karo.
 * ============================================================
 */

/** Spacing scale (4px base) — margins, paddings, gaps. */
export const spacing = {
  xs: '0.25rem', //  4px
  sm: '0.5rem', //   8px
  md: '0.75rem', // 12px
  lg: '1rem', //    16px
  xl: '1.5rem', //  24px
  '2xl': '2rem', // 32px
  '3xl': '3rem', // 48px
} as const;

/** Border radius scale — cards, buttons, inputs. */
export const radius = {
  sm: '0.375rem',
  md: '0.5rem',
  lg: '0.75rem',
  xl: '1rem',
  full: '9999px',
} as const;

/** Typography — font family + sizes (desktop-first scale). */
export const fontSize = {
  xs: '0.75rem', //  12px
  sm: '0.875rem', // 14px
  base: '1rem', //   16px
  lg: '1.125rem', // 18px
  xl: '1.25rem', //  20px
  '2xl': '1.5rem', // 24px
  '3xl': '1.875rem', // 30px
  '4xl': '2.25rem', // 36px
} as const;

export const fontWeight = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

/** Font families — system stack (fast, zero download). */
export const fontFamily = {
  sans: "'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif",
  mono: "'JetBrains Mono', 'SFMono-Regular', Consolas, monospace",
} as const;

/** Shadows — depth ke liye (theme se nahi badlenge). */
export const shadow = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 12px -2px rgba(0, 0, 0, 0.10)',
  lg: '0 12px 32px -8px rgba(0, 0, 0, 0.16)',
} as const;

/** Z-index layers — overlapping components ka order. */
export const zIndex = {
  dropdown: 100,
  sticky: 200,
  drawer: 300,
  modal: 400,
  toast: 500,
} as const;

/** Motion — reduced-motion preference ko respect karna zaroori (a11y). */
export const motion = {
  fast: '120ms ease',
  base: '200ms ease',
  slow: '320ms ease',
} as const;

/** Breakpoints (reference only — Tailwind config bhi same values rakhe). */
export const breakpoints = {
  mobile: 640,
  tablet: 768,
  laptop: 1024,
  desktop: 1280,
} as const;
