'use client';

import { useState } from 'react';
import PageHeader from '@/components/PageHeader';
import TaskList from '@/components/tasks/TaskList';
import {
  StatusFilterPills,
  TaskSearchInput,
} from '@/components/tasks/TaskFilters';
import {
  filterTaskRecords,
  getMyTaskRecords,
  getStatusFilterCounts,
  type StatusFilter,
} from '@/data/taskData';

/**
 * MyTasksView — /my-tasks page ka interactive part (search + status filter).
 *
 * Kyun client component? Sirf filter/search ke liye React state chahiye,
 * isliye page (server) aur view (client) alag rakhe gaye hain — page par
 * metadata reh sakti hai aur client bundle chhota rehta hai.
 *
 * DATA: Abhi task list mein mock data use ho raha hai.
 *   Future phase mein isi list ko backend API se load kiya jayega
 *   (aur filters query params ban jayenge).
 */
export default function MyTasksView() {
  const myTasks = getMyTaskRecords();

  // Sirf 3 chhote state: search text aur status filter. Koi library nahi.
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<StatusFilter>('All');

  const counts = getStatusFilterCounts(myTasks);

  // List chhoti hai, isliye har render par filter karna sasta hai.
  // API aane par ise useMemo + debounced search bana denge.
  const visibleTasks = filterTaskRecords(myTasks, { query, status });
  const filtersActive = query.trim() !== '' || status !== 'All';

  function resetFilters() {
    setQuery('');
    setStatus('All');
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Tasks"
        description="Aapko assign kiye gaye tasks — due date ke hisaab se sorted, taki sabse pehle wahi dikhe jo pehle karna hai."
        badge="Mock data"
      />

      {/* Filter card — search + status pills + reset */}
      <section
        aria-label="My task filters"
        className="space-y-4 rounded-2xl border border-border bg-surface p-4 sm:p-5"
      >
        <TaskSearchInput
          value={query}
          onChange={setQuery}
          label="Search my tasks"
          placeholder="Search task, bucket ya assigned by…"
        />

        <StatusFilterPills value={status} onChange={setStatus} counts={counts} />

        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border pt-3 text-xs text-muted">
          <p>
            {visibleTasks.length} / {myTasks.length} tasks dikh rahe hain
          </p>
          {filtersActive && (
            <button
              type="button"
              onClick={resetFilters}
              className="rounded-lg border border-border px-2.5 py-1 font-medium text-text hover:bg-surface-muted"
            >
              Reset filters
            </button>
          )}
        </div>
      </section>

      <TaskList tasks={visibleTasks} variant="mine" title="Assigned to you" />
    </div>
  );
}
