import {
  AlertTriangleIcon,
  CheckIcon,
  ClockIcon,
  TodoIcon,
} from '@/components/icons';
import { getDashboardSummary } from '@/data/dashboardData';

/**
 * Summary cards — My Tasks · Due Today · Completed · Overdue.
 * Numbers MOCK_TASKS se derive hote hain (koi API call nahi).
 * Icon chips ke rang sidebar ke module colors se match rakhte hain
 * (sirf UI accent — functionality par koi effect nahi).
 */

interface CardConfig {
  label: string;
  sub: string;
  color: string;
  icon: React.ReactNode;
}

const CARDS: CardConfig[] = [
  { label: 'My Tasks', sub: 'Assigned to you (open)', color: '#9333ea', icon: <TodoIcon width={20} height={20} /> },
  { label: 'Due Today', sub: 'Needs attention today', color: '#0d9488', icon: <ClockIcon width={20} height={20} /> },
  { label: 'Completed', sub: 'Finished tasks', color: '#16a34a', icon: <CheckIcon width={20} height={20} /> },
  { label: 'Overdue', sub: 'Past due date', color: '#dc2626', icon: <AlertTriangleIcon width={20} height={20} /> },
];

export default function SummaryCards() {
  const summary = getDashboardSummary();
  const values = [summary.myTasks, summary.dueToday, summary.completed, summary.overdue];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {CARDS.map((card, index) => (
        <div
          key={card.label}
          className="rounded-2xl border border-border bg-surface p-5"
        >
          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-xl"
              style={{ background: `${card.color}1A`, color: card.color }}
            >
              {card.icon}
            </span>
            <div className="min-w-0">
              <p className="text-sm text-muted">{card.label}</p>
              <p className="text-2xl font-bold leading-tight text-text">
                {values[index]}
              </p>
            </div>
          </div>
          <p className="mt-3 text-xs text-muted">{card.sub}</p>
        </div>
      ))}
    </div>
  );
}
