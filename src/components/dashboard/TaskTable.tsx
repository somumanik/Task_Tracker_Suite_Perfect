import type { Task } from '@/data/dashboardData';
import { formatDate, isOverdue, isToday } from '@/data/dashboardData';
import { PriorityBadge, StatusBadge } from './badges';

/**
 * TaskTable — responsive task list.
 *   Desktop (md+): normal table (Task · Assigned To · Due Date · Priority · Status)
 *   Mobile: stacked card rows (wahi data, touch-friendly)
 * Data: mock (dashboardData) — Phase 3 mein API se aayegi.
 * Component reusable hai — future /all-tasks page bhi isi ko use karega.
 */

interface TaskTableProps {
  title: string;
  tasks: Task[];
}

export default function TaskTable({ title, tasks }: TaskTableProps) {
  return (
    <section className="overflow-hidden rounded-2xl border border-border bg-surface">
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <h2 className="text-sm font-semibold text-text">{title}</h2>
        <span className="text-xs text-muted">{tasks.length} tasks</span>
      </div>

      {tasks.length === 0 ? (
        <p className="px-5 py-10 text-center text-sm text-muted">
          Koi task nahi — next phase mein &ldquo;Create Task&rdquo; se naye tasks add honge.
        </p>
      ) : (
        <>
          {/* Desktop: normal table */}
          <div className="hidden md:block">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted">
                  <th className="px-5 py-3 font-medium">Task</th>
                  <th className="px-5 py-3 font-medium">Assigned To</th>
                  <th className="px-5 py-3 font-medium">Due Date</th>
                  <th className="px-5 py-3 font-medium">Priority</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => {
                  const overdue = isOverdue(task);
                  return (
                    <tr
                      key={task.id}
                      className="border-b border-border last:border-0 hover:bg-surface-muted/60"
                    >
                      <td className="px-5 py-3">
                        <span className="block font-medium text-text">
                          {task.title}
                        </span>
                        <span className="text-xs text-muted">{task.id}</span>
                      </td>
                      <td className="px-5 py-3 text-text">{task.assignedTo}</td>
                      <td className="px-5 py-3">
                        <span className={overdue ? 'text-danger' : 'text-muted'}>
                          {formatDate(task.dueDate)}
                          {isToday(task.dueDate) && (
                            <span className="ml-1 font-medium">· Today</span>
                          )}
                          {overdue && <span className="ml-1 font-medium">· Overdue</span>}
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        <PriorityBadge priority={task.priority} />
                      </td>
                      <td className="px-5 py-3">
                        <StatusBadge status={task.status} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile: stacked cards */}
          <div className="divide-y divide-border md:hidden">
            {tasks.map((task) => {
              const overdue = isOverdue(task);
              return (
                <article key={task.id} className="space-y-2 px-5 py-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-medium text-text">{task.title}</p>
                      <p className="text-xs text-muted">{task.id}</p>
                    </div>
                    <PriorityBadge priority={task.priority} />
                  </div>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-muted">
                    <span>{task.assignedTo}</span>
                    <span className={overdue ? 'text-danger' : ''}>
                      Due {formatDate(task.dueDate)}
                      {isToday(task.dueDate) && ' · Today'}
                      {overdue && ' · Overdue'}
                    </span>
                    <StatusBadge status={task.status} />
                  </div>
                </article>
              );
            })}
          </div>
        </>
      )}
    </section>
  );
}
