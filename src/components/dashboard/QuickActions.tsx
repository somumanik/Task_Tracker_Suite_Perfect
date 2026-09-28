import Link from 'next/link';
import {
  BucketIcon,
  CalendarIcon,
  PlusIcon,
  UsersIcon,
} from '@/components/icons';

/**
 * Quick Actions — 4 navigation buttons.
 * IMPORTANT: Abhi sirf routes par navigate karte hain;
 * actual CRUD (create task/member/bucket) future phases mein aayega.
 * Next.js Link use hota hai → poora app reload nahi hota (SPA nav).
 */

interface QuickAction {
  label: string;
  href: string;
  icon: React.ReactNode;
  color: string;
}

const ACTIONS: QuickAction[] = [
  { label: 'Create Task', href: '/all-tasks', icon: <PlusIcon width={18} height={18} />, color: '#4f46e5' },
  { label: 'Add Team Member', href: '/team', icon: <UsersIcon width={18} height={18} />, color: '#16a34a' },
  { label: 'Create Bucket', href: '/buckets', icon: <BucketIcon width={18} height={18} />, color: '#ea580c' },
  { label: 'View Calendar', href: '/calendar', icon: <CalendarIcon width={18} height={18} />, color: '#0d9488' },
];

export default function QuickActions() {
  return (
    <section className="rounded-2xl border border-border bg-surface">
      <div className="border-b border-border px-5 py-4">
        <h2 className="text-sm font-semibold text-text">Quick Actions</h2>
      </div>

      <div className="grid grid-cols-1 gap-3 p-5 sm:grid-cols-2">
        {ACTIONS.map((action) => (
          <Link
            key={action.label}
            href={action.href}
            className="flex items-center justify-center gap-2 rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-medium text-text transition-colors hover:border-primary hover:bg-surface-muted"
          >
            <span aria-hidden="true" style={{ color: action.color }}>
              {action.icon}
            </span>
            {action.label}
          </Link>
        ))}
      </div>

      <p className="border-t border-border px-5 py-3 text-xs text-muted">
        Ye buttons abhi sirf navigation karte hain — CRUD next phases mein aayega.
      </p>
    </section>
  );
}
