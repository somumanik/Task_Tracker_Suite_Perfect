'use client';

import { useEffect, useId, useRef, useState, type FormEvent } from 'react';
import { CloseIcon, PlusIcon } from '@/components/icons';
import { SelectFilter } from '@/components/tasks/TaskFilters';
import type { BucketStatus } from '@/data/taskData';

/**
 * CreateBucketModal — "Create Bucket" button ka simple modal (Phase 3A).
 *
 * IMPORTANT: Ye sirf UI hai — koi database write ya API call NAHI hoti.
 *   Submit karne par parent (BucketsView) ke through naya bucket sirf
 *   local React state mein add hota hai; refresh par list wapas mock
 *   data par aa jaati hai. Real save (POST /api/v1/buckets) aage ke
 *   phase mein aayega.
 *
 * A11Y: role="dialog" + aria-modal, Escape se close, backdrop click se
 *   close, khulte hi naam wale input par focus, aur body scroll lock
 *   (MobileMenu drawer jaisa hi pattern).
 */

const BUCKET_STATUS_OPTIONS: BucketStatus[] = ['Active', 'On Hold', 'Archived'];

interface CreateBucketModalProps {
  open: boolean;
  onClose: () => void;
  /** Parent naya bucket apne state mein add karta hai. */
  onCreate: (name: string, description: string, status: BucketStatus) => void;
}

export default function CreateBucketModal({
  open,
  onClose,
  onCreate,
}: CreateBucketModalProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<BucketStatus>('Active');
  const [error, setError] = useState('');

  const nameInputRef = useRef<HTMLInputElement>(null);
  const titleId = useId();

  // Modal khula ho tab Escape se close + peeche ka page scroll lock.
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

  // Khulte hi pehla field focus — keyboard se form bharne mein easy.
  useEffect(() => {
    if (open) nameInputRef.current?.focus();
  }, [open]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Chhota validation — naam khali nahi hona chahiye.
    if (!name.trim()) {
      setError('Bucket ka naam zaroori hai.');
      return;
    }

    onCreate(name.trim(), description.trim(), status);

    // Form reset + modal band (koi API/DB call nahi hoti).
    setName('');
    setDescription('');
    setStatus('Active');
    setError('');
    onClose();
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop — click par modal band */}
      <button
        type="button"
        aria-label="Close dialog"
        onClick={onClose}
        className="absolute inset-0 bg-black/40"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative w-full max-w-md rounded-2xl border border-border bg-surface p-5 shadow-lg"
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 id={titleId} className="text-sm font-semibold text-text">
              Create Bucket
            </h2>
            <p className="mt-1 text-xs leading-relaxed text-muted">
              Bucket tasks ka group hota hai — jaise project ya category.
            </p>
          </div>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="rounded-lg p-1.5 text-muted hover:bg-surface-muted hover:text-text"
          >
            <CloseIcon width={18} height={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          <div className="space-y-1">
            <label
              htmlFor="bucket-name"
              className="block text-[11px] font-semibold uppercase tracking-wide text-muted"
            >
              Bucket name
            </label>
            <input
              id="bucket-name"
              ref={nameInputRef}
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="e.g. Support"
              className="h-10 w-full rounded-xl border border-border bg-surface-muted px-3 text-sm text-text outline-none transition-colors placeholder:text-muted focus:border-primary"
            />
            {error && <p className="text-xs text-danger">{error}</p>}
          </div>

          <div className="space-y-1">
            <label
              htmlFor="bucket-description"
              className="block text-[11px] font-semibold uppercase tracking-wide text-muted"
            >
              Short description
            </label>
            <textarea
              id="bucket-description"
              rows={3}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Ye bucket kis type ke tasks rakhta hai?"
              className="w-full rounded-xl border border-border bg-surface-muted px-3 py-2 text-sm text-text outline-none transition-colors placeholder:text-muted focus:border-primary"
            />
          </div>

          {/* Options fixed hain, isliye string → BucketStatus cast safe hai. */}
          <SelectFilter
            label="Status"
            value={status}
            options={BUCKET_STATUS_OPTIONS}
            onChange={(value) => setStatus(value as BucketStatus)}
          />

          <p className="rounded-xl border border-border bg-surface-muted px-3 py-2 text-xs leading-relaxed text-muted">
            Abhi ye sirf UI hai — database/API connect nahi kiya gaya. Naya
            bucket page par turant dikhega, lekin refresh karne par reset ho
            jayega.
          </p>

          <div className="flex flex-wrap justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-border px-3 py-2 text-sm font-medium text-text hover:bg-surface-muted"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-3 py-2 text-sm font-semibold text-primary-contrast hover:opacity-90"
            >
              <PlusIcon width={16} height={16} />
              Create Bucket
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
