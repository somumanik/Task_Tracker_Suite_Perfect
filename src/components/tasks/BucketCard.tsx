import Link from 'next/link';
import { BucketIcon } from '@/components/icons';
import { BucketStatusBadge } from '@/components/tasks/badges';
import { getBucketTaskCount, type Bucket } from '@/data/taskData';

/**
 * BucketCard — ek bucket ka card (buckets page ke grid mein).
 *
 * Dikhata hai: naam · short description · number of tasks · status.
 * Task count mock tasks se hi derive hota hai (getBucketTaskCount),
 * isliye card aur list page hamesha match karte hain.
 *
 * "View tasks" link abhi generic /all-tasks page par le jaata hai —
 * bucket-wise pre-filtered view Phase 3B mein aayega.
 */
export default function BucketCard({ bucket }: { bucket: Bucket }) {
  const taskCount = getBucketTaskCount(bucket.name);

  return (
    <article className="flex flex-col gap-3 rounded-2xl border border-border bg-surface p-5">
      <div className="flex items-start justify-between gap-3">
        {/* Icon chip — bucket ka accent color (sirf UI highlight) */}
        <span
          aria-hidden="true"
          className="grid h-10 w-10 shrink-0 place-items-center rounded-xl"
          style={{ background: `${bucket.color}1A`, color: bucket.color }}
        >
          <BucketIcon width={20} height={20} />
        </span>
        <BucketStatusBadge status={bucket.status} />
      </div>

      <div>
        <h3 className="text-sm font-semibold text-text">{bucket.name}</h3>
        <p className="mt-1 text-sm leading-relaxed text-muted">
          {bucket.description}
        </p>
      </div>

      <div className="mt-auto flex items-center justify-between gap-3 border-t border-border pt-3">
        <span className="text-xs text-muted">
          {taskCount} {taskCount === 1 ? 'task' : 'tasks'}
        </span>
        <Link
          href="/all-tasks"
          className="text-xs font-medium text-primary hover:underline"
        >
          View tasks
        </Link>
      </div>
    </article>
  );
}
