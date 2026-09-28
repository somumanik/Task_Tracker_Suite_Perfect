import type { ReactNode } from 'react';
import { LayersIcon } from '@/components/icons';

/**
 * PagePlaceholder — Phase 1 ke saare future pages ka starter.
 *
 * PURPOSE: Navigation toot na jaye — har route kuch na kuch dikhaye.
 *   Actual functionality (CRUD, reports, attendance...) baad ke
 *   phases mein isi page ki jagah legi.
 * UI: Clean page-header (title + description + phase badge) +
 *   centered empty-state card — productivity app jaisa look,
 *   generic admin-table jaisa nahi.
 * USAGE: Har page sirf title/description/phase pass karta hai
 *   (Settings page extra children ke roop mein ThemeSelector dikhata hai).
 */
interface PagePlaceholderProps {
  title: string;
  description: string;
  phase: string;
  children?: ReactNode;
}

export default function PagePlaceholder({
  title,
  description,
  phase,
  children,
}: PagePlaceholderProps) {
  return (
    <div className="space-y-6">
      {/* Page header — heading + summary + phase badge */}
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border pb-4">
        <div className="space-y-1.5">
          <h1 className="text-xl font-bold tracking-tight text-text sm:text-2xl">
            {title}
          </h1>
          <p className="max-w-2xl text-sm leading-relaxed text-muted">
            {description}
          </p>
        </div>
        <span className="mt-1 shrink-0 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted">
          {phase} · coming soon
        </span>
      </header>

      {children ?? (
        /* Empty state — module kab aayega, ye batata hai */
        <section className="rounded-2xl border border-border bg-surface">
          <div className="flex flex-col items-center gap-3 px-6 py-14 text-center">
            <span
              aria-hidden="true"
              className="grid h-12 w-12 place-items-center rounded-2xl bg-surface-muted text-muted"
            >
              <LayersIcon width={22} height={22} />
            </span>
            <h2 className="text-sm font-semibold text-text">
              Coming in {phase}
            </h2>
            <p className="max-w-md text-sm leading-relaxed text-muted">
              Is module ka full functionality isi phase mein add hoga. Abhi
              aap navigation, layout aur themes explore kar sakte hain.
            </p>
          </div>
        </section>
      )}
    </div>
  );
}
