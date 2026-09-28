import type { Metadata } from 'next';
import MyTasksView from '@/components/tasks/MyTasksView';

export const metadata: Metadata = {
  title: 'My Tasks',
};

/**
 * My Tasks — Phase 3A ka pehla Task Management page.
 *
 * Page (server component) sirf compose karta hai: metadata yahan rehti
 * hai aur saara interactive part (search + status filter) MyTasksView
 * (client component) ke andar hai — isse client JS minimal rehta hai.
 *
 * Data: abhi mock (src/data/taskData.ts) — koi DB/API nahi.
 * Filtering logic filterTaskRecords() mein ek hi jagah hai.
 */
export default function MyTasksPage() {
  return <MyTasksView />;
}
