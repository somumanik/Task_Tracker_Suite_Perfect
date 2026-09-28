'use client';

import { useState } from 'react';
import { CheckIcon, PaletteIcon } from '@/components/icons';
import { useTheme } from '@/theme/ThemeProvider';

/**
 * ThemeMenu — header aur mobile drawer ke liye theme BUTTON + POPOVER.
 *
 * PURPOSE: Header mein hamesha chhota palette button rehta hai;
 *   click par 6 themes ki list khulti hai (swatch + naam + active tick).
 *   Purane "chhote dots hamesha dikhte the" — ab header saaf hai.
 *
 * DATA: Sirf useTheme() context — persistence (localStorage)
 *   ThemeProvider sambhalta hai. Koi API/DB call nahi.
 * ERROR: Unknown id setTheme khud ignore karta hai; aria-checked se
 *   screen readers ko active theme pata chalta hai.
 */

interface ThemeMenuProps {
  /** Button par text dikhaye (drawer) ya sirf palette icon (header). */
  showLabel?: boolean;
  /** Drawer jaise narrow areas ke liye full-width button. */
  buttonClassName?: string;
}

export function ThemeMenu({ showLabel, buttonClassName }: ThemeMenuProps) {
  const { themes, themeId, setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        title="Theme"
        onClick={() => setOpen((isOpen) => !isOpen)}
        className={`flex items-center gap-2 rounded-lg px-2 py-2 text-muted hover:bg-surface-muted hover:text-text ${
          buttonClassName ?? ''
        }`}
      >
        <PaletteIcon width={20} height={20} />
        {showLabel && (
          <span className="text-sm font-medium">Theme</span>
        )}
      </button>

      {open && (
        <>
          {/* Bahar click par popover band */}
          <button
            type="button"
            aria-label="Close theme menu"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 cursor-default"
          />
          <div
            role="menu"
            aria-label="Choose theme"
            className="absolute right-0 top-full z-50 mt-2 w-52 rounded-xl border border-border bg-surface p-1.5 shadow-lg"
          >
            <p className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted">
              Appearance
            </p>
            {themes.map((theme) => {
              const isActive = theme.id === themeId;
              return (
                <button
                  key={theme.id}
                  type="button"
                  role="menuitemradio"
                  aria-checked={isActive}
                  onClick={() => {
                    setTheme(theme.id);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-text hover:bg-surface-muted ${
                    isActive ? 'font-semibold text-primary' : ''
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0 rounded-full border border-border"
                    style={{
                      background: `linear-gradient(135deg, ${theme.swatch[0]} 50%, ${theme.swatch[1]} 50%)`,
                    }}
                  />
                  <span className="flex-1 text-left">{theme.label}</span>
                  {isActive && (
                    <CheckIcon width={16} height={16} className="text-primary" />
                  )}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default ThemeMenu;