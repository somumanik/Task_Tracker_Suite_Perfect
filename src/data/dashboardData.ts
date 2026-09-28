/**
 * Dashboard ke liye MOCK/STATIC data + chhote helper functions.
 *
 * Dashboard par abhi mock data use kiya gaya hai.
 * Future phase mein isi data ko backend API se retrieve kiya jayega.
 * API ke through database se sirf required fields fetch ki jayengi.
 *
 * NOTE: Dates "aaj" ke relative hain (TODY/iso offset) taki demo
 * hamesha meaningful lage — due-today, overdue counts sahi dikhein.
 * Production build mein ye server ke build-time par calculate hoti hain.
 */

export type Priority = 'Low' | 'Medium' | 'High';
export type TaskStatus = 'To Do' | 'In Progress' | 'Completed';

export interface Task {
  id: string;
  title: string;
  assignedTo: string;
  dueDate: string; // YYYY-MM-DD
  priority: Priority;
  status: TaskStatus;
}

export interface ActivityItem {
  id: string;
  text: string;
  time: string;
  tone: 'success' | 'info' | 'warning' | 'primary';
}

/** Demo user — auth phase ke baad session se aayega. */
export const CURRENT_USER = 'Demo User';

/**
 * Local timezone ke hisaab se ISO date (UTC bug se bachne ke liye).
 * Phase 3A ka taskData.ts bhi isi helper ko reuse karta hai — date ka
 * logic ek hi jagah rehta hai (duplicate nahi hota).
 */
export function isoDate(offsetDays: number): string {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

/** Aaj ki date (due-today/overdue compare karne ke liye). */
export const TODAY_ISO = isoDate(0);

/** "12 Oct" jaisa chhota format — table aur mobile cards dono mein. */
export function formatDate(iso: string): string {
  const date = new Date(`${iso}T00:00:00`);
  return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
}

export function isToday(iso: string): boolean {
  return iso === TODAY_ISO;
}

/** Completed nahi hai aur date nikal gayi → overdue. */
export function isOverdue(task: Task): boolean {
  return task.status !== 'Completed' && task.dueDate < TODAY_ISO;
}

/**
 * Assigned To sab "You" hai kyunki ye dashboard ka "My Tasks" section hai;
 * future /all-tasks view mein isi table component se teammates dikhenge.
 */
export const MOCK_TASKS: Task[] = [
  { id: 'T-101', title: 'Finalize Q3 project plan', assignedTo: 'You', dueDate: TODAY_ISO, priority: 'High', status: 'In Progress' },
  { id: 'T-102', title: 'Review homepage copy', assignedTo: 'You', dueDate: TODAY_ISO, priority: 'Medium', status: 'To Do' },
  { id: 'T-103', title: 'Fix login validation bug', assignedTo: 'You', dueDate: isoDate(1), priority: 'High', status: 'To Do' },
  { id: 'T-104', title: 'Prepare weekly status report', assignedTo: 'You', dueDate: isoDate(2), priority: 'Medium', status: 'In Progress' },
  { id: 'T-105', title: 'Update onboarding checklist', assignedTo: 'You', dueDate: isoDate(-1), priority: 'Low', status: 'To Do' },
  { id: 'T-106', title: 'Client demo preparation', assignedTo: 'You', dueDate: isoDate(-2), priority: 'High', status: 'To Do' },
  { id: 'T-107', title: 'Refactor notification service', assignedTo: 'You', dueDate: isoDate(4), priority: 'Medium', status: 'To Do' },
  { id: 'T-108', title: 'Archive old invoices', assignedTo: 'You', dueDate: isoDate(-3), priority: 'Low', status: 'Completed' },
  { id: 'T-109', title: 'Set up design tokens', assignedTo: 'You', dueDate: isoDate(-4), priority: 'Medium', status: 'Completed' },
  { id: 'T-110', title: 'Plan team retrospective', assignedTo: 'You', dueDate: isoDate(6), priority: 'Low', status: 'To Do' },
];

/** Summary cards ke numbers — MOCK_TASKS se hi derive hote hain. */
export function getDashboardSummary() {
  const openTasks = MOCK_TASKS.filter((t) => t.status !== 'Completed');
  return {
    myTasks: openTasks.length,
    dueToday: openTasks.filter((t) => t.dueDate === TODAY_ISO).length,
    completed: MOCK_TASKS.filter((t) => t.status === 'Completed').length,
    overdue: openTasks.filter((t) => t.dueDate < TODAY_ISO).length,
  };
}

/** My Tasks table ke rows (sirf open tasks). */
export function getMyTasks(): Task[] {
  return MOCK_TASKS.filter((t) => t.status !== 'Completed');
}

/** Due Today section ke rows. */
export function getDueTodayTasks(): Task[] {
  return MOCK_TASKS.filter(
    (t) => t.status !== 'Completed' && t.dueDate === TODAY_ISO,
  );
}

export const MOCK_ACTIVITY: ActivityItem[] = [
  { id: 'A1', text: 'You marked "Archive old invoices" as completed', time: '2 hours ago', tone: 'success' },
  { id: 'A2', text: 'Asha assigned you "Fix login validation bug"', time: '4 hours ago', tone: 'info' },
  { id: 'A3', text: 'Due date for "Finalize Q3 project plan" is today', time: '5 hours ago', tone: 'warning' },
  { id: 'A4', text: 'Notice published: Office closed on Friday', time: 'Yesterday', tone: 'primary' },
  { id: 'A5', text: 'Your timesheet for last week was approved', time: '2 days ago', tone: 'success' },
  { id: 'A6', text: 'Rahul Mehta joined your team', time: '3 days ago', tone: 'info' },
];