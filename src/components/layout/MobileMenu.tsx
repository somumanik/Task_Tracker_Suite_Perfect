'use client';

import { useEffect } from 'react';
import { APP_LOGO, APP_NAME } from '@/config/appConfig';
import { CloseIcon } from '@/components/icons';
import ThemeMenu from '@/components/theme/ThemeMenu';
import NavList from './NavList';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

/**
 * MobileMenu — mobile/tablet ka navigation drawer.
 * Desktop Sidebar (Sidebar.tsx) ka mobile equivalent.
 * Header ka hamburger button open karta hai; link click,
 * overlay click ya Escape key se band hota hai.
 * Andar wahi NavList + ThemeMenu (mobile users yahin se
 * theme choose karte hain — popover drawer ke andar khulta hai).
 */
export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  // Drawer ke dauraan body scroll lock + Escape se close (a11y).
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Overlay — click par drawer band */}
      <button
        type="button"
        aria-label="Close menu"
        onClick={onClose}
        className="absolute inset-0 bg-black/40"
      />

      <aside
        id="mobile-menu"
        className="absolute inset-y-0 left-0 flex w-72 max-w-[85vw] flex-col border-r border-border bg-surface"
      >
        <div className="flex h-16 items-center justify-between border-b border-border px-4">
          <div className="flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element -- chhota SVG logo */}
            <img src={APP_LOGO} alt="" width={24} height={24} className="h-6 w-6" />
            <span className="truncate text-sm font-bold">{APP_NAME}</span>
          </div>
          <button
            type="button"
            aria-label="Close menu"
            onClick={onClose}
            className="rounded-lg p-2 text-muted hover:bg-surface-muted hover:text-text"
          >
            <CloseIcon width={20} height={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-4">
          <NavList />
        </div>

        {/* Mobile theme switcher — button + popover (header wala hi) */}
        <div className="border-t border-border px-4 py-4">
          <p className="pb-2 text-[11px] font-semibold uppercase tracking-wide text-muted">
            Appearance
          </p>
          <ThemeMenu showLabel buttonClassName="w-full justify-start px-3 py-2 hover:bg-surface-muted" />
        </div>
      </aside>
    </div>
  );
}
