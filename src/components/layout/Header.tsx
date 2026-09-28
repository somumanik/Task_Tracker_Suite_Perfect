'use client';

import Link from 'next/link';
import { useState } from 'react';
import { APP_LOGO, APP_SHORT_NAME } from '@/config/appConfig';
import { BellIcon, MenuIcon, SearchIcon } from '@/components/icons';
import ThemeMenu from '@/components/theme/ThemeMenu';
import MobileMenu from './MobileMenu';

/**
 * Header — top bar ka saara interactive area:
 *   hamburger (mobile menu) · brand (mobile) · search ·
 *   theme button (popover) · notification bell · profile menu.
 *
 * Visual hierarchy (left → right):
 *   brand/context → search (bada, center) → actions cluster
 *   (icons + divider + profile) — productivity app style.
 *
 * Phase 1 = sirf UI shell:
 *   - Search abhi static hai (debounced API call Phase 2 mein).
 *   - Bell ka unread count Phase 4 (notifications API) se aayega.
 *   - "Demo User" static placeholder — real user auth ke baad.
 * State yahan rakhi gayi hai taki drawer/profile/popover ka
 * open-close logic ek hi jagah rahe (simple useState).
 */
export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-2 border-b border-border bg-surface px-3 sm:gap-4 sm:px-6">
      {/* Hamburger — sirf mobile/tablet (lg se sidebar aa jata hai) */}
      <button
        type="button"
        aria-label="Open navigation menu"
        aria-expanded={menuOpen}
        aria-controls="mobile-menu"
        onClick={() => setMenuOpen(true)}
        className="rounded-lg p-2 text-muted hover:bg-surface-muted hover:text-text lg:hidden"
      >
        <MenuIcon width={20} height={20} />
      </button>

      {/* Brand — mobile/tablet par (sidebar hidden hota hai) */}
      <div className="flex shrink-0 items-center gap-2 lg:hidden">
        {/* eslint-disable-next-line @next/next/no-img-element -- chhota SVG logo */}
        <img src={APP_LOGO} alt="" width={24} height={24} className="h-6 w-6" />
        <span className="text-sm font-bold tracking-tight">{APP_SHORT_NAME}</span>
      </div>

      {/* Search area — desktop par badha aur center-aligned (Phase 2: API) */}
      <form
        role="search"
        className="hidden flex-1 justify-center md:flex"
        onSubmit={(event) => event.preventDefault()}
      >
        <div className="relative w-full max-w-lg">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="search"
            aria-label="Search"
            placeholder="Search tasks, people, notices…"
            className="h-10 w-full rounded-xl border border-border bg-surface-muted pl-10 pr-3 text-sm text-text outline-none transition-colors placeholder:text-muted focus:border-primary"
          />
        </div>
      </form>

      {/* Actions cluster — icons + divider + profile (saaf hierarchy) */}
      <div className="ml-auto flex items-center gap-1 sm:gap-2">
        {/* Theme button → popover (mobile par drawer ke andar milta hai) */}
        <div className="hidden md:block">
          <ThemeMenu />
        </div>

        {/* Notification bell — unread badge Phase 4 se aayega */}
        <Link
          href="/notifications"
          aria-label="Notifications"
          className="rounded-lg p-2 text-muted hover:bg-surface-muted hover:text-text"
        >
          <BellIcon width={20} height={20} />
          {/* TODO(Phase 4): count > 0 hone par badge dikhana */}
        </Link>

        {/* Separator — icons group aur profile ko visually alag karta hai */}
        <span aria-hidden="true" className="hidden h-6 w-px bg-border sm:block" />

        {/* User / profile area */}
        <div className="relative">
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={profileOpen}
            onClick={() => setProfileOpen((open) => !open)}
            className="flex items-center gap-2 rounded-lg p-1 hover:bg-surface-muted"
          >
            <span className="grid h-8 w-8 place-items-center rounded-full bg-primary text-xs font-semibold text-primary-contrast">
              DU
            </span>
            <span className="hidden text-sm font-medium text-text sm:block">
              Demo User
            </span>
          </button>

          {profileOpen && (
            <>
              {/* Bahar click karne par menu band (overlay) */}
              <button
                type="button"
                aria-label="Close profile menu"
                onClick={() => setProfileOpen(false)}
                className="fixed inset-0 z-40 cursor-default"
              />
              <div
                role="menu"
                className="absolute right-0 top-full z-50 mt-2 w-48 rounded-xl border border-border bg-surface py-1 shadow-lg"
              >
                <Link
                  href="/profile"
                  role="menuitem"
                  onClick={() => setProfileOpen(false)}
                  className="block px-4 py-2 text-sm text-text hover:bg-surface-muted"
                >
                  My Profile
                </Link>
                <Link
                  href="/settings"
                  role="menuitem"
                  onClick={() => setProfileOpen(false)}
                  className="block px-4 py-2 text-sm text-text hover:bg-surface-muted"
                >
                  Settings
                </Link>
                {/* Sign out: authentication phase (Phase 4) mein aayega. */}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Mobile drawer — state isi component mein hai */}
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}
