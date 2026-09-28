'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_GROUPS } from './navItems';

/**
 * NavList — Sidebar aur MobileMenu dono mein use hone wali nav links.
 * Active page ka path usePathname se milta hai (client-side highlight).
 * Data: sirf NAV_GROUPS (static) — koi API call nahi.
 */
export default function NavList() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-5" aria-label="Main navigation">
      {NAV_GROUPS.map((group) => (
        <div key={group.label}>
          <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wide text-muted">
            {group.label}
          </p>
          <ul className="space-y-1">
            {group.links.map((link) => {
              const active =
                pathname === link.href ||
                pathname.startsWith(link.href + '/');
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? 'page' : undefined}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                      active
                        ? 'bg-surface-muted font-semibold text-primary shadow-[inset_2px_0_0_var(--color-primary)]'
                        : 'text-muted hover:bg-surface-muted hover:text-text'
                    }`}
                  >
                    {/* Icon color = module ka halka rang (UI only, see navItems) */}
                    <span
                      aria-hidden="true"
                      className="shrink-0"
                      style={{ color: link.color }}
                    >
                      {link.icon}
                    </span>
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
