import type { BucketStatus } from '@/data/taskData';
import { AlertTriangleIcon } from '@/components/icons';

/**
 * Task management ke chhote badges (Phase 3A).
 *
 * NOTE: Priority aur Status ke badges pehle se
 *   src/components/dashboard/badges.tsx mein hain — wahi reuse hote
 *   hain (duplicate nahi banaya). Yahan sirf wo concepts hain jo
 *   dashboard mein nahi the: Bucket, Bucket status aur Overdue.
 */

/** Bucket ka naam + ka chhota color dot (bucket ki accent color). */
export function BucketChip({ name, color }: { name: string; color?: string }) {
  return (
    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border bg-surface-muted px-2.5 py-0.5 text-xs font-medium text-text">
      <span
        aria-hidden="true"
        className="h-2 w-2 shrink-0 rounded-full bg-muted"
        style={color ? { background: color } : undefined}
      />
      {name}
    </span>
  );
}

const bucketStatusClass: Record<BucketStatus, string> = {
  Active: 'border-success/30 bg-success/10 text-success',
  'On Hold': 'border-warning/30 bg-warning/10 text-warning',
  Archived: 'border-border bg-surface-muted text-muted',
};

export function BucketStatusBadge({ status }: { status: BucketStatus }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${bucketStatusClass[status]}`}
    >
      {status}
    </span>
  );
}

/** Overdue tag — sirf tab dikhta hai jab completed nahi hai aur date nikal gayi. */
export function OverdueTag() {
  return (
    <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-danger/30 bg-danger/10 px-2 py-0.5 text-xs font-medium text-danger">
      <AlertTriangleIcon width={12} height={12} />
      Overdue
    </span>
  );
}
