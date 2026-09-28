'use client';

import { CloseIcon, SearchIcon } from '@/components/icons';
import { STATUS_FILTERS, type StatusFilter } from '@/data/taskData';

/**
 * Task pages ke chhote filter controls (Phase 3A).
 *
 * NOTE: Ye sab "controlled" components hain — apna state nahi rakhte,
 * value parent (MyTasksView/AllTasksView) se aati hai aur change wahan
 * jaata hai. Isse filter ka ek hi source of truth rehta hai.
 * Abhi filtering client-side hoti hai (mock data); future phase mein
 * yahi controls API query params set karenge.
 */

/** Search box — header ke search jaisa hi look (same design tokens). */
export function TaskSearchInput({
  value,
  onChange,
  label,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  label: string;
  placeholder: string;
}) {
  return (
    <div className="relative">
      <SearchIcon className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
      <input
        type="search"
        value={value}
        aria-label={label}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="h-10 w-full rounded-xl border border-border bg-surface-muted pl-10 pr-10 text-sm text-text outline-none transition-colors placeholder:text-muted focus:border-primary"
      />
      {/* Clear button — sirf tab jab kuch typed ho (mobile par bhi easy) */}
      {value && (
        <button
          type="button"
          aria-label="Clear search"
          onClick={() => onChange('')}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-muted hover:bg-surface hover:text-text"
        >
          <CloseIcon width={16} height={16} />
        </button>
      )}
    </div>
  );
}

/** Status pills — All · To Do · In Progress · Completed · Overdue (+ count). */
export function StatusFilterPills({
  value,
  onChange,
  counts,
}: {
  value: StatusFilter;
  onChange: (value: StatusFilter) => void;
  counts: Record<StatusFilter, number>;
}) {
  return (
    <div
      role="group"
      aria-label="Status filter"
      className="flex flex-wrap gap-2"
    >
      {STATUS_FILTERS.map((option) => {
        const isActive = option === value;
        return (
          <button
            key={option}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(option)}
            className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
              isActive
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-border bg-surface text-muted hover:bg-surface-muted hover:text-text'
            }`}
          >
            {option}
            <span
              className={`rounded-full px-1.5 py-0.5 text-[11px] ${
                isActive ? 'bg-primary/15 text-primary' : 'bg-surface-muted text-muted'
              }`}
            >
              {counts[option]}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/** Simple labeled dropdown — priority/bucket/assignee filters ke liye. */
export function SelectFilter({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: readonly string[];
  onChange: (value: string) => void;
}) {
  const inputId = `filter-${label.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className="space-y-1">
      <label
        htmlFor={inputId}
        className="block text-[11px] font-semibold uppercase tracking-wide text-muted"
      >
        {label}
      </label>
      <select
        id={inputId}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-10 w-full rounded-xl border border-border bg-surface-muted px-3 text-sm text-text outline-none transition-colors focus:border-primary"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
