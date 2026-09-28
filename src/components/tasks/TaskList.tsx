import { PriorityBadge, StatusBadge } from '@/components/dashboard/badges';
import { BucketChip, OverdueTag } from '@/components/tasks/badges';
// Date helpers Phase 2 ke dashboardData se hi reuse ho rahe hain (duplicate nahi).
import { formatDate, isOverdue, isToday } from '@/data/dashboardData';
import { formatUpdated, getBucketColor, type TaskRecord } from '@/data/taskData';

/**
 * TaskList — Phase 3 ke task pages ka responsive list.
 *
 *   Desktop / laptop (lg+): normal table
 *   Mobile / tablet (<lg):  stacked cards (wahi data, touch-friendly)
 *
 * BREAKPOINT NOTE: My Tasks mein 8 aur All Tasks mein 7 columns hain,
 *   isliye table sirf lg (1024px+) par dikhti hai — chhoti width par
 *   columns squeeze karne ke bajaye readable cards dikhte hain.
 *
 * VARIANT:
 *   'mine' → Task · Bucket · Due Date · Priority · Status · Assigned By · Last Updated
 *   'team' → Task · Assigned To · Bucket · Due Date · Priority · Status
 *
 * DATA: Abhi mock data (taskData.ts) — future phase mein API se aayega.
 * NOTE: Ye Phase 2 ke dashboard/TaskTable se alag component hai kyunki
 *   columns/fields zyada hain; dashboard wala component jaisa tha waisa
 *   hi kaam karta rahega (usme koi change nahi kiya gaya).
 */

interface TaskListProps {
  tasks: TaskRecord[];
  variant: 'mine' | 'team';
  /** List ke upar chhota heading. */
  title?: string;
}

/**
 * View Details — actual task details screen Phase 3B mein banegi.
 * Tab tak button DISABLED hai (dead/khali link dikhane se better);
 * title tooltip se user ko wajah pata chalti hai.
 */
function ViewDetailsButton() {
  return (
    <button
      type="button"
      disabled
      title="Task details Phase 3B mein enable honge"
      className="cursor-not-allowed whitespace-nowrap rounded-lg border border-border px-2.5 py-1 text-xs font-medium text-muted opacity-60"
    >
      View Details
    </button>
  );
}

export default function TaskList({ tasks, variant, title }: TaskListProps) {
  const isTeam = variant === 'team';

  return (
    <section className="overflow-hidden rounded-2xl border border-border bg-surface">
      {/* List ka heading + count */}
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <h2 className="text-sm font-semibold text-text">
          {title ?? (isTeam ? 'All Tasks' : 'My Tasks')}
        </h2>
        <span className="text-xs text-muted">
          {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}
        </span>
      </div>

      {tasks.length === 0 ? (
        <p className="px-5 py-10 text-center text-sm text-muted">
          Koi task nahi mila — search ya filters badal kar dobara try karein.
        </p>
      ) : (
        <>
          {/* Desktop/laptop (lg+): normal table */}
          <div className="hidden lg:block">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted">
                  <th className="px-5 py-3 font-medium">Task</th>
                  {isTeam && (
                    <th className="px-5 py-3 font-medium">Assigned To</th>
                  )}
                  <th className="px-5 py-3 font-medium">Bucket</th>
                  <th className="px-5 py-3 font-medium">Due Date</th>
                  <th className="px-5 py-3 font-medium">Priority</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  {!isTeam && (
                    <>
                      <th className="px-5 py-3 font-medium">Assigned By</th>
                      <th className="px-5 py-3 font-medium">Last Updated</th>
                    </>
                  )}
                  <th className="px-5 py-3 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => {
                  const overdue = isOverdue(task);
                  return (
                    <tr
                      key={task.id}
                      className="border-b border-border align-top last:border-0 hover:bg-surface-muted/60"
                    >
                      <td className="px-5 py-3">
                        <span className="block font-medium text-text">
                          {task.title}
                        </span>
                        <span className="text-xs text-muted">{task.id}</span>
                      </td>
                      {isTeam && (
                        <td className="whitespace-nowrap px-5 py-3 text-text">
                          {task.assignedTo}
                        </td>
                      )}
                      <td className="px-5 py-3">
                        <BucketChip
                          name={task.bucket}
                          color={getBucketColor(task.bucket)}
                        />
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span
                            className={`whitespace-nowrap ${overdue ? 'text-danger' : 'text-text'}`}
                          >
                            {formatDate(task.dueDate)}
                            {isToday(task.dueDate) && ' · Today'}
                          </span>
                          {overdue && <OverdueTag />}
                        </div>
                      </td>
                      <td className="px-5 py-3">
                        <PriorityBadge priority={task.priority} />
                      </td>
                      <td className="px-5 py-3">
                        <StatusBadge status={task.status} />
                      </td>
                      {!isTeam && (
                        <>
                          <td className="whitespace-nowrap px-5 py-3 text-text">
                            {task.assignedBy}
                          </td>
                          <td className="whitespace-nowrap px-5 py-3 text-muted">
                            {formatUpdated(task.lastUpdated)}
                          </td>
                        </>
                      )}
                      <td className="px-5 py-3">
                        <ViewDetailsButton />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile/tablet (<lg): stacked cards — table ki jagah */}
          <div className="divide-y divide-border lg:hidden">
            {tasks.map((task) => {
              const overdue = isOverdue(task);
              return (
                <article key={task.id} className="space-y-3 px-5 py-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-medium text-text">{task.title}</p>
                      <p className="text-xs text-muted">{task.id}</p>
                    </div>
                    <PriorityBadge priority={task.priority} />
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <BucketChip
                      name={task.bucket}
                      color={getBucketColor(task.bucket)}
                    />
                    <StatusBadge status={task.status} />
                    {overdue && <OverdueTag />}
                  </div>

                  {/* Chhota 2-column meta grid — mobile par bhi sab fields clear */}
                  <dl className="grid grid-cols-2 gap-x-3 gap-y-2 text-xs">
                    <div>
                      <dt className="text-muted">Due date</dt>
                      <dd className={overdue ? 'text-danger' : 'text-text'}>
                        {formatDate(task.dueDate)}
                        {isToday(task.dueDate) && ' · Today'}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-muted">Assigned to</dt>
                      <dd className="text-text">{task.assignedTo}</dd>
                    </div>
                    <div>
                      <dt className="text-muted">Assigned by</dt>
                      <dd className="text-text">{task.assignedBy}</dd>
                    </div>
                    <div>
                      <dt className="text-muted">Last updated</dt>
                      <dd className="text-text">
                        {formatUpdated(task.lastUpdated)}
                      </dd>
                    </div>
                  </dl>

                  <ViewDetailsButton />
                </article>
              );
            })}
          </div>
        </>
      )}

      {/* Footer note — kya abhi kaam karta hai aur kya nahi (honest UI) */}
      {tasks.length > 0 && (
        <p className="border-t border-border px-5 py-3 text-xs leading-relaxed text-muted">
          Data abhi mock hai (Phase 3A) aur list read-only hai — task details
          aur edit Phase 3B mein aayenge.
        </p>
      )}
    </section>
  );
}

