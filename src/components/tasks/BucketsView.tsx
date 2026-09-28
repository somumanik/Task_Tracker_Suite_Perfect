'use client';

import { useState } from 'react';
import { PlusIcon } from '@/components/icons';
import PageHeader from '@/components/PageHeader';
import BucketCard from '@/components/tasks/BucketCard';
import CreateBucketModal from '@/components/tasks/CreateBucketModal';
import {
  MOCK_BUCKETS,
  MOCK_TASK_RECORDS,
  type Bucket,
  type BucketStatus,
} from '@/data/taskData';

/** Naye bucket ko dene ke liye UI accent colors (sirf highlight ke liye). */
const BUCKET_COLORS = [
  '#4f46e5',
  '#ea580c',
  '#16a34a',
  '#0d9488',
  '#7c3aed',
  '#dc2626',
];

/**
 * BucketsView — /buckets page (client).
 *
 * Kyun client? "Create Bucket" modal ka open/close state aur naye
 * bucket ka local add chahiye (simple useState).
 *
 * IMPORTANT: Yahan koi database ya API call NAHI hoti. Naya bucket
 * sirf React state mein add hota hai taki UI flow test ho sake —
 * page refresh karne par list wapas mock data par aa jaati hai.
 */
export default function BucketsView() {
  const [buckets, setBuckets] = useState<Bucket[]>(MOCK_BUCKETS);
  const [modalOpen, setModalOpen] = useState(false);

  /** Modal se aane wala naya bucket local state mein add karta hai. */
  function handleCreate(name: string, description: string, status: BucketStatus) {
    const newBucket: Bucket = {
      id: `B-${String(buckets.length + 1).padStart(2, '0')}`,
      name,
      description: description || 'Koi description nahi diya gaya.',
      status,
      color: BUCKET_COLORS[buckets.length % BUCKET_COLORS.length],
    };
    setBuckets((current) => [...current, newBucket]);
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Buckets"
        description="Buckets tasks ko group karte hain — jaise project ya category. Ek bucket banao, phir uske andar tasks organize karo."
        badge="Mock data"
        action={
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-3 py-2 text-sm font-semibold text-primary-contrast hover:opacity-90"
          >
            <PlusIcon width={16} height={16} />
            Create Bucket
          </button>
        }
      />

      {/* Chhota summary — buckets aur unke total tasks */}
      <p className="text-xs text-muted">
        {buckets.length} buckets · {MOCK_TASK_RECORDS.length} tasks in total
        (mock data)
      </p>

      <section
        aria-label="Buckets"
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
      >
        {buckets.map((bucket) => (
          <BucketCard key={bucket.id} bucket={bucket} />
        ))}
      </section>

      {/* Modal — abhi sirf UI (koi DB write nahi) */}
      <CreateBucketModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreate={handleCreate}
      />
    </div>
  );
}
