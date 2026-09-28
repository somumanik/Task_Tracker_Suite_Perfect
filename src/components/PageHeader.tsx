import type { ReactNode } from 'react';

/**
 * PageHeader — real (non-placeholder) pages ka common page header.
 *
 * PURPOSE: Phase 3 ke task pages bhi wahi header style use karein jo
 *   Phase 1 ke PagePlaceholder mein hai (title + description +
 *   right-side meta), taki app ek jaisa lage.
 *
 * NOTE: PagePlaceholder ko change nahi kiya gaya (Phase 1 regression se
 *   bachne ke liye) — ye ek alag reusable component hai.
 *
 * USAGE:
 *   <PageHeader title="My Tasks" description="..." badge="Mock data" />
 *   <PageHeader title="Buckets" description="..." action={<button …/>} />
 *   // `action` slot client component se bhi pass ho sakta hai.
 *
 * DATA: Koi data source nahi — sirf props (server/client dono mein safe).
 */
interface PageHeaderProps {
  title: string;
  description: string;
  /** Chhota right-side label (jaise "Mock data", "Phase 3A"). */
  badge?: string;
  /** Right side ka action button/link (optional). */
  action?: ReactNode;
}

export default function PageHeader({
  title,
  description,
  badge,
  action,
}: PageHeaderProps) {
  return (
    <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border pb-4">
      <div className="space-y-1.5">
        <h1 className="text-xl font-bold tracking-tight text-text sm:text-2xl">
          {title}
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-muted">
          {description}
        </p>
      </div>

      {(badge ?? action) && (
        <div className="flex flex-wrap items-center gap-2">
          {badge && (
            <span className="shrink-0 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted">
              {badge}
            </span>
          )}
          {action}
        </div>
      )}
    </header>
  );
}
