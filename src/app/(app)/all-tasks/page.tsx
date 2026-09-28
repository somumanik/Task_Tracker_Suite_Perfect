import type { Metadata } from 'next';
import AllTasksView from '@/components/tasks/AllTasksView';

export const metadata: Metadata = {
  title: 'All Tasks',
};

/**
 * All Tasks — poore team ke tasks (Phase 3A).
 *
 * Page (server) sirf compose karta hai; filters (status, priority,
 * bucket, employee, search) AllTasksView (client) mein hain.
 *
 * Data: abhi mock (src/data/taskData.ts) — koi DB/API nahi. Future
 * phase mein yahi filters backend API ke query params ban jayenge.
 */
export default function AllTasksPage() {
  return <AllTasksView />;
}
