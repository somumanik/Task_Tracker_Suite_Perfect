import { getDueTodayTasks } from '@/data/dashboardData';
import { PriorityBadge, StatusBadge } from './badges';

/**
 * Due Today — aaj due open tasks ki chhoti list.
 * Dashboard ke right column mein dikhti hai (mobile par stack ho jati hai).
 * Data: mock (dashboardData) → future mein API.
 */
export default function DueTodayList() {
  const tasks = getDueTodayTasks();

  return (
    <section className="rounded-2xl border border-border bg-surface">
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <h2 className="text-sm font-semibold text-text">Due Today</h2>
        <span className="text-xs text-muted">{tasks.length} tasks</span>
      </div>

      {tasks.length === 0 ? (
        <p className="px-5 py-8 text-center text-sm text-muted">
          Aaj koi task due nahi.
        </p>
      ) : (
        <ul className="divide-y divide-border">
          {tasks.map((task) => (
            <li key={task.id} className="space-y-2 px-5 py-3.5">
              <p className="text-sm font-medium text-text">{task.title}</p>
              <div className="flex flex-wrap items-center gap-2">
                <PriorityBadge priority={task.priority} />
                <StatusBadge status={task.status} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
