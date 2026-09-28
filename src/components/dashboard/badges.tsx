import type { Priority, TaskStatus } from '@/data/dashboardData';

/**
 * Chhote status/priority badges — theme tokens se bane
 * (hard-coded rang nahi, isliye har theme mein match karte hain).
 * TaskTable aur DueTodayList dono ise reuse karte hain.
 */

const priorityClass: Record<Priority, string> = {
  High: 'border-danger/30 bg-danger/10 text-danger',
  Medium: 'border-warning/30 bg-warning/10 text-warning',
  Low: 'border-info/30 bg-info/10 text-info',
};

const statusClass: Record<TaskStatus, string> = {
  'To Do': 'border-border bg-surface-muted text-muted',
  'In Progress': 'border-primary/30 bg-primary/10 text-primary',
  Completed: 'border-success/30 bg-success/10 text-success',
};

export function PriorityBadge({ priority }: { priority: Priority }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${priorityClass[priority]}`}
    >
      {priority}
    </span>
  );
}

export function StatusBadge({ status }: { status: TaskStatus }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusClass[status]}`}
    >
      {status}
    </span>
  );
}
