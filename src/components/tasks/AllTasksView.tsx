'use client';

import { useState } from 'react';
import type { Priority } from '@/data/dashboardData';
import PageHeader from '@/components/PageHeader';
import TaskList from '@/components/tasks/TaskList';
import {
  SelectFilter,
  StatusFilterPills,
  TaskSearchInput,
} from '@/components/tasks/TaskFilters';
import {
  PRIORITY_FILTERS,
  filterTaskRecords,
  getBucketNames,
  getStatusFilterCounts,
  getTeamTaskRecords,
  getUniqueAssignees,
  type StatusFilter,
} from '@/data/taskData';

/**
 * AllTasksView — /all-tasks page (poore team ke tasks).
 *
 * FILTERS: Status (pills) + Priority, Bucket aur Assigned employee
 *   (dropdowns) + search box. Sab filtering ek hi helper
 *   (filterTaskRecords) se hoti hai, isliye logic simple aur readable hai.
 *
 * DATA: Abhi mock data (taskData.ts). Future phase mein yahi filters
 *   backend API ke query params ban jayenge, aur API se sirf required
 *   fields fetch karenge taki response lightweight rahe.
 */
export default function AllTasksView() {
  const teamTasks = getTeamTaskRecords();

  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<StatusFilter>('All');
  const [priority, setPriority] = useState<Priority | 'All'>('All');
  const [bucket, setBucket] = useState('All');
  const [assignee, setAssignee] = useState('All');

  const counts = getStatusFilterCounts(teamTasks);
  // Dropdown ke options data se hi derive hote hain (hard-code nahi).
  const bucketOptions = ['All', ...getBucketNames()];
  const assigneeOptions = ['All', ...getUniqueAssignees(teamTasks)];

  const visibleTasks = filterTaskRecords(teamTasks, {
    query,
    status,
    priority,
    bucket,
    assignee,
  });
  const filtersActive =
    query.trim() !== '' ||
    status !== 'All' ||
    priority !== 'All' ||
    bucket !== 'All' ||
    assignee !== 'All';

  function resetFilters() {
    setQuery('');
    setStatus('All');
    setPriority('All');
    setBucket('All');
    setAssignee('All');
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="All Tasks"
        description="Poore team ke tasks ek jagah — status, priority, bucket ya employee se filter karke dekhein ki kis par kya pending hai."
        badge="Mock data"
      />

      {/* Filter card — search + status pills + 3 dropdowns */}
      <section
        aria-label="All task filters"
        className="space-y-4 rounded-2xl border border-border bg-surface p-4 sm:p-5"
      >
        <TaskSearchInput
          value={query}
          onChange={setQuery}
          label="Search all tasks"
          placeholder="Search task, employee, bucket ya task id…"
        />

        <StatusFilterPills value={status} onChange={setStatus} counts={counts} />

        <div className="grid gap-3 sm:grid-cols-3">
          {/* Select ki value string hoti hai — options fixed hain, isliye type cast safe hai. */}
          <SelectFilter
            label="Priority"
            value={priority}
            options={PRIORITY_FILTERS}
            onChange={(value) => setPriority(value as Priority | 'All')}
          />
          <SelectFilter
            label="Bucket"
            value={bucket}
            options={bucketOptions}
            onChange={setBucket}
          />
          <SelectFilter
            label="Assigned employee"
            value={assignee}
            options={assigneeOptions}
            onChange={setAssignee}
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border pt-3 text-xs text-muted">
          <p>
            {visibleTasks.length} / {teamTasks.length} tasks dikh rahe hain
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

      <TaskList tasks={visibleTasks} variant="team" title="Team tasks" />
    </div>
  );
}
