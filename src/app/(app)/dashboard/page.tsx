import type { Metadata } from 'next';
import SummaryCards from '@/components/dashboard/SummaryCards';
import TaskTable from '@/components/dashboard/TaskTable';
import DueTodayList from '@/components/dashboard/DueTodayList';
import RecentActivity from '@/components/dashboard/RecentActivity';
import QuickActions from '@/components/dashboard/QuickActions';
import { getMyTasks } from '@/data/dashboardData';

export const metadata: Metadata = {
  title: 'Dashboard',
};

/**
 * Dashboard — Phase 2 ka main page.
 *
 * Sections: Welcome · Summary cards · My Tasks (table) ·
 *   Due Today · Recent Activity · Quick Actions.
 *
 * Dashboard par abhi mock data use kiya gaya hai.
 * Future phase mein isi data ko backend API se retrieve kiya jayega.
 * API ke through database se sirf required fields fetch ki jayengi.
 *
 * Sab kuch server components hain → client JS minimal (performance).
 * Ye page sirf compose karta hai; har section alag chhota component hai.
 */
export default function DashboardPage() {
  const myTasks = getMyTasks();

  return (
    <div className="space-y-6">
      {/* Welcome section */}
      <section>
        <h1 className="text-xl font-bold tracking-tight text-text sm:text-2xl">
          Welcome back, Demo User
        </h1>
        <p className="mt-1 text-sm text-muted">
          Aaj aapke tasks, deadlines aur recent activity ka snapshot — sab ek
          jagah.
        </p>
      </section>

      {/* Task summary cards: My Tasks · Due Today · Completed · Overdue */}
      <SummaryCards />

      {/* My Tasks table (left) + Due Today list (right) */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="min-w-0 lg:col-span-2">
          <TaskTable title="My Tasks" tasks={myTasks} />
        </div>
        <DueTodayList />
      </div>

      {/* Recent Activity (left) + Quick Actions (right) */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="min-w-0 lg:col-span-2">
          <RecentActivity />
        </div>
        <QuickActions />
      </div>
    </div>
  );
}

