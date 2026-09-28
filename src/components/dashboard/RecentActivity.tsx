import { MOCK_ACTIVITY } from '@/data/dashboardData';
import type { ActivityItem } from '@/data/dashboardData';

/**
 * Recent Activity — latest actions ki timeline (mock).
 * Tone dot ka rang theme token se aata hai, isliye har theme match hota hai.
 * Future: ye data notifications/activity API se aayega.
 */

const TONE_COLOR: Record<ActivityItem['tone'], string> = {
  success: 'var(--color-success)',
  info: 'var(--color-info)',
  warning: 'var(--color-warning)',
  primary: 'var(--color-primary)',
};

export default function RecentActivity() {
  return (
    <section className="rounded-2xl border border-border bg-surface">
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <h2 className="text-sm font-semibold text-text">Recent Activity</h2>
        <span className="text-xs text-muted">{MOCK_ACTIVITY.length} updates</span>
      </div>

      <ul className="divide-y divide-border">
        {MOCK_ACTIVITY.map((item) => (
          <li key={item.id} className="flex items-start gap-3 px-5 py-3.5">
            <span
              aria-hidden="true"
              className="mt-1.5 h-2 w-2 shrink-0 rounded-full"
              style={{ background: TONE_COLOR[item.tone] }}
            />
            <div className="min-w-0 flex-1">
              <p className="text-sm text-text">{item.text}</p>
              <p className="mt-0.5 text-xs text-muted">{item.time}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
