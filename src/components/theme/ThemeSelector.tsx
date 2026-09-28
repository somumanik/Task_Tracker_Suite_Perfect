'use client';

import { useTheme } from '@/theme/ThemeProvider';

/**
 * ============================================================
 * ThemeSelector — 6 themes ke labeled CARDS (Settings page).
 *
 * PURPOSE: Ocean, Royal Purple, Emerald, Sunset, Graphite,
 *   Professional Blue — swatch + naam wale buttons; click par
 *   ThemeProvider switch karta hai aur localStorage mein save
 *   hota hai (refresh par bhi wahi rahe).
 *
 * USAGE: Settings → Appearance. Header/mobile drawer mein isi
 *   ka jagah ThemeMenu (button + popover) hai — chhote dots
 *   hamesha nahi dikhte, header saaf rehta hai.
 *
 * DATA: Sirf useTheme() context — koi API call nahi, koi DB nahi.
 * ERROR HANDLING: Unknown id setTheme khud ignore karta hai;
 *   aria-pressed se screen readers ko active theme pata chalta hai.
 * MOBILE: RN app isi buttons logic ko native control mein banayegi
 *   (themes.ts same data — ek hi source, do platforms).
 * ============================================================
 */

interface ThemeSelectorProps {
  className?: string;
}

export function ThemeSelector({ className }: ThemeSelectorProps) {
  const { themes, themeId, setTheme } = useTheme();

  return (
    <div
      role="group"
      aria-label="Theme selector / थीम चुनें"
      className={`flex flex-wrap gap-3 ${className ?? ''}`}
    >
      {themes.map((theme) => {
        const isActive = theme.id === themeId;
        return (
          <button
            key={theme.id}
            type="button"
            aria-pressed={isActive}
            aria-label={`Theme: ${theme.label} (${theme.labelHi})`}
            onClick={() => setTheme(theme.id)}
            className="flex flex-col items-center gap-2 rounded-xl border bg-surface p-3"
            style={{
              borderColor: isActive
                ? 'var(--color-primary)'
                : 'var(--color-border)',
              boxShadow: isActive ? '0 0 0 2px var(--color-focus)' : undefined,
            }}
          >
            <span className="flex h-7 w-16 overflow-hidden rounded-full" aria-hidden="true">
              {theme.swatch.map((hex) => (
                <span key={hex} className="flex-1" style={{ background: hex }} />
              ))}
            </span>
            <span className="text-xs font-medium text-text">{theme.label}</span>
          </button>
        );
      })}
    </div>
  );
}

export default ThemeSelector;
