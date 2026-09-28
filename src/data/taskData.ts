/**
 * ============================================================
 * taskData.ts — PHASE 3A ka TASK MANAGEMENT MOCK DATA
 *
 * PURPOSE: /my-tasks, /all-tasks aur /buckets pages ke liye ek hi
 *   jagah mock tasks + buckets ka data aur simple filter helpers.
 *
 * DATA SOURCE: Abhi 100% mock/static data hai — koi database, koi
 *   API call nahi (Phase 3A mein sirf UI + navigation banani hai).
 *   Future phase mein yahi data backend se aayega:
 *     GET /api/v1/tasks   ·   GET /api/v1/buckets
 *   API se sirf required fields fetch karenge (jo columns UI mein
 *   dikhte hain, wahi) taaki response lightweight rahe.
 *
 * SHARED LOGIC: Date helpers (TODAY_ISO, isoDate, formatDate,
 *   isOverdue) dashboardData.ts se reuse kiye gaye hain — date ka
 *   logic ek hi jagah rahe, duplicate na ho.
 *
 * FILTERING: Jaan-boojh kar simple array.filter() rakha gaya hai
 *   (Redux / React Query jaisi koi library nahi) — list chhoti hai
 *   aur logic readable hai. Backend aane par yahi filters URL query
 *   params ban jayenge.
 * ============================================================
 */

import {
  CURRENT_USER,
  TODAY_ISO,
  formatDate,
  isOverdue,
  isoDate,
  type Priority,
  type TaskStatus,
} from './dashboardData';

/* ---- Types ---- */

/** Bucket ka status — buckets page par chhota badge dikhta hai. */
export type BucketStatus = 'Active' | 'On Hold' | 'Archived';

/** Bucket = tasks ka group (project / category). */
export interface Bucket {
  id: string;
  name: string;
  description: string;
  status: BucketStatus;
  /** Sirf UI accent (icon/dot) — baaki sab rang theme tokens se aate hain. */
  color: string;
}

/** Task management ka richer record (dashboard wale Task se zyada fields). */
export interface TaskRecord {
  id: string;
  title: string;
  bucket: string;
  assignedTo: string;
  assignedBy: string;
  dueDate: string; // YYYY-MM-DD
  priority: Priority;
  status: TaskStatus;
  lastUpdated: string; // YYYY-MM-DD
}

/** Status filter options — 'Overdue' ek COMPUTED state hai, DB column nahi. */
export const STATUS_FILTERS = [
  'All',
  'To Do',
  'In Progress',
  'Completed',
  'Overdue',
] as const;
export type StatusFilter = (typeof STATUS_FILTERS)[number];

/** Priority filter options — 'All' ka matlab koi filter nahi. */
export const PRIORITY_FILTERS = ['All', 'High', 'Medium', 'Low'] as const;

/** Filter state ka shape — dono list pages isi object ko pass karte hain. */
export interface TaskFilterState {
  query?: string;
  status?: StatusFilter;
  priority?: Priority | 'All';
  bucket?: string; // 'All' ya bucket ka naam
  assignee?: string; // 'All' ya employee ka naam
}

/* ---- Mock buckets (buckets page + bucket filter dropdown) ---- */

export const MOCK_BUCKETS: Bucket[] = [
  {
    id: 'B-01',
    name: 'Development',
    description: 'Product engineering — features, bug fixes aur releases.',
    status: 'Active',
    color: '#4f46e5',
  },
  {
    id: 'B-02',
    name: 'Marketing',
    description: 'Campaigns, content calendar aur brand/social media work.',
    status: 'Active',
    color: '#ea580c',
  },
  {
    id: 'B-03',
    name: 'HR',
    description: 'Hiring, onboarding, policies aur employee requests.',
    status: 'On Hold',
    color: '#16a34a',
  },
  {
    id: 'B-04',
    name: 'Operations',
    description: 'Daily process, vendor coordination aur internal support.',
    status: 'Active',
    color: '#0d9488',
  },
  {
    id: 'B-05',
    name: 'Finance',
    description: 'Invoices, expenses, budgets aur monthly reporting.',
    status: 'Archived',
    color: '#7c3aed',
  },
];

/* ---- Mock tasks (My Tasks + All Tasks pages) ---- */

/**
 * NOTE: Pehle 10 tasks dashboard ke mock titles hi hain (T-101…T-110) —
 * isliye dashboard aur My Tasks ek jaise lagte hain. Baaki records
 * team members ke tasks hain (All Tasks page ke liye).
 * Dates relative hain (isoDate) taki demo kabhi stale na lage.
 */
export const MOCK_TASK_RECORDS: TaskRecord[] = [
  // --- Aapke tasks (My Tasks) ---
  { id: 'T-101', title: 'Finalize Q3 project plan', bucket: 'Operations', assignedTo: CURRENT_USER, assignedBy: 'Rahul Mehta', dueDate: TODAY_ISO, priority: 'High', status: 'In Progress', lastUpdated: isoDate(-1) },
  { id: 'T-102', title: 'Review homepage copy', bucket: 'Marketing', assignedTo: CURRENT_USER, assignedBy: 'Asha Verma', dueDate: TODAY_ISO, priority: 'Medium', status: 'To Do', lastUpdated: isoDate(0) },
  { id: 'T-103', title: 'Fix login validation bug', bucket: 'Development', assignedTo: CURRENT_USER, assignedBy: 'Asha Verma', dueDate: isoDate(1), priority: 'High', status: 'To Do', lastUpdated: isoDate(-2) },
  { id: 'T-104', title: 'Prepare weekly status report', bucket: 'Finance', assignedTo: CURRENT_USER, assignedBy: 'Priya Nair', dueDate: isoDate(2), priority: 'Medium', status: 'In Progress', lastUpdated: isoDate(0) },
  { id: 'T-105', title: 'Update onboarding checklist', bucket: 'HR', assignedTo: CURRENT_USER, assignedBy: 'Neha Kapoor', dueDate: isoDate(-1), priority: 'Low', status: 'To Do', lastUpdated: isoDate(-3) },
  { id: 'T-106', title: 'Client demo preparation', bucket: 'Marketing', assignedTo: CURRENT_USER, assignedBy: 'Rahul Mehta', dueDate: isoDate(-2), priority: 'High', status: 'To Do', lastUpdated: isoDate(-2) },
  { id: 'T-107', title: 'Refactor notification service', bucket: 'Development', assignedTo: CURRENT_USER, assignedBy: 'Asha Verma', dueDate: isoDate(4), priority: 'Medium', status: 'To Do', lastUpdated: isoDate(-1) },
  { id: 'T-108', title: 'Archive old invoices', bucket: 'Finance', assignedTo: CURRENT_USER, assignedBy: 'Priya Nair', dueDate: isoDate(-3), priority: 'Low', status: 'Completed', lastUpdated: isoDate(-1) },
  { id: 'T-109', title: 'Set up design tokens', bucket: 'Development', assignedTo: CURRENT_USER, assignedBy: 'Asha Verma', dueDate: isoDate(-4), priority: 'Medium', status: 'Completed', lastUpdated: isoDate(-2) },
  { id: 'T-110', title: 'Plan team retrospective', bucket: 'HR', assignedTo: CURRENT_USER, assignedBy: 'Neha Kapoor', dueDate: isoDate(6), priority: 'Low', status: 'To Do', lastUpdated: isoDate(0) },

  // --- Team members ke tasks (All Tasks) ---
  { id: 'T-111', title: 'Migrate dashboard widgets to v2 API', bucket: 'Development', assignedTo: 'Asha Verma', assignedBy: CURRENT_USER, dueDate: isoDate(3), priority: 'High', status: 'In Progress', lastUpdated: isoDate(0) },
  { id: 'T-112', title: 'Write launch announcement post', bucket: 'Marketing', assignedTo: 'Neha Kapoor', assignedBy: 'Asha Verma', dueDate: isoDate(5), priority: 'Medium', status: 'To Do', lastUpdated: isoDate(-1) },
  { id: 'T-113', title: 'Screen shortlisted frontend candidates', bucket: 'HR', assignedTo: 'Imran Sheikh', assignedBy: 'Neha Kapoor', dueDate: isoDate(2), priority: 'High', status: 'In Progress', lastUpdated: isoDate(0) },
  { id: 'T-114', title: 'Vendor contract renewal', bucket: 'Operations', assignedTo: 'Priya Nair', assignedBy: 'Rahul Mehta', dueDate: isoDate(-1), priority: 'High', status: 'To Do', lastUpdated: isoDate(-4) },
  { id: 'T-115', title: 'Monthly expense reconciliation', bucket: 'Finance', assignedTo: 'Rahul Mehta', assignedBy: 'Priya Nair', dueDate: isoDate(1), priority: 'Medium', status: 'In Progress', lastUpdated: isoDate(0) },
  { id: 'T-116', title: 'Fix mobile navigation overlap', bucket: 'Development', assignedTo: 'Asha Verma', assignedBy: CURRENT_USER, dueDate: isoDate(-2), priority: 'High', status: 'To Do', lastUpdated: isoDate(-2) },
  { id: 'T-117', title: 'Prepare Q3 marketing budget', bucket: 'Finance', assignedTo: 'Neha Kapoor', assignedBy: 'Imran Sheikh', dueDate: isoDate(7), priority: 'Medium', status: 'To Do', lastUpdated: isoDate(-1) },
  { id: 'T-118', title: 'Archive 2023 compliance records', bucket: 'Operations', assignedTo: 'Priya Nair', assignedBy: 'Rahul Mehta', dueDate: isoDate(-5), priority: 'Low', status: 'Completed', lastUpdated: isoDate(-3) },
];

/* ---- Helpers: lookups ---- */

/** Bucket ka accent color (naam se) — chips ke dot ke liye. */
export function getBucketColor(name: string): string | undefined {
  return MOCK_BUCKETS.find((bucket) => bucket.name === name)?.color;
}

/** Bucket dropdown ke options — MOCK_BUCKETS se hi aate hain (hard-code nahi). */
export function getBucketNames(): string[] {
  return MOCK_BUCKETS.map((bucket) => bucket.name);
}

/** Ek bucket mein kitne tasks hain (completed tasks bhi ginti mein aate hain). */
export function getBucketTaskCount(bucketName: string): number {
  return MOCK_TASK_RECORDS.filter((task) => task.bucket === bucketName).length;
}

/** Assignee dropdown ke options — data se hi derive hote hain. */
export function getUniqueAssignees(
  tasks: TaskRecord[] = MOCK_TASK_RECORDS,
): string[] {
  return Array.from(new Set(tasks.map((task) => task.assignedTo))).sort();
}

/* ---- Helpers: list preparation ---- */

/** Sort ke liye priority ka weight (High sabse pehle). */
const PRIORITY_WEIGHT: Record<Priority, number> = { High: 0, Medium: 1, Low: 2 };

/** Jaldi due wale tasks pehle; same due date par High priority pehle. */
export function sortByDueDate(tasks: TaskRecord[]): TaskRecord[] {
  return [...tasks].sort((a, b) =>
    a.dueDate === b.dueDate
      ? PRIORITY_WEIGHT[a.priority] - PRIORITY_WEIGHT[b.priority]
      : a.dueDate.localeCompare(b.dueDate),
  );
}

/** My Tasks = sirf wo tasks jo aapko assign hue hain. */
export function getMyTaskRecords(): TaskRecord[] {
  return sortByDueDate(
    MOCK_TASK_RECORDS.filter((task) => task.assignedTo === CURRENT_USER),
  );
}

/** All Tasks = poore team ke tasks. */
export function getTeamTaskRecords(): TaskRecord[] {
  return sortByDueDate(MOCK_TASK_RECORDS);
}

/* ---- Helpers: filtering ---- */

/**
 * Saara filtering logic ek hi function mein — dono pages (my-tasks aur
 * all-tasks) isi ko call karte hain, isliye logic simple aur readable
 * rehta hai (aur future mein ek hi jagah API query params banti hai).
 */
export function filterTaskRecords(
  tasks: TaskRecord[],
  filters: TaskFilterState = {},
): TaskRecord[] {
  const query = filters.query?.trim().toLowerCase() ?? '';
  const status = filters.status ?? 'All';
  const priority = filters.priority ?? 'All';
  const bucket = filters.bucket ?? 'All';
  const assignee = filters.assignee ?? 'All';

  return tasks.filter((task) => {
    // Search: title, id, bucket, assignee aur "assigned by" — sab par.
    if (query) {
      const haystack = `${task.title} ${task.id} ${task.bucket} ${task.assignedTo} ${task.assignedBy}`.toLowerCase();
      if (!haystack.includes(query)) return false;
    }

    // Status: 'Overdue' computed hai (completed nahi + due date nikal gayi).
    if (status === 'Overdue') {
      if (!isOverdue(task)) return false;
    } else if (status !== 'All' && task.status !== status) {
      return false;
    }

    if (priority !== 'All' && task.priority !== priority) return false;
    if (bucket !== 'All' && task.bucket !== bucket) return false;
    if (assignee !== 'All' && task.assignedTo !== assignee) return false;

    return true;
  });
}

/**
 * Har status filter ka count (pills ke andar chhota number).
 * NOTE: Overdue tasks 'To Do'/'In Progress' mein bhi ginte hain —
 * ye do alag cheezein hain (ek status hai, ek due-date state).
 */
export function getStatusFilterCounts(
  tasks: TaskRecord[],
): Record<StatusFilter, number> {
  return {
    All: tasks.length,
    'To Do': tasks.filter((task) => task.status === 'To Do').length,
    'In Progress': tasks.filter((task) => task.status === 'In Progress').length,
    Completed: tasks.filter((task) => task.status === 'Completed').length,
    Overdue: tasks.filter((task) => isOverdue(task)).length,
  };
}

/** "Last updated" ko readable banata hai: Today / Yesterday / 3 days ago. */
export function formatUpdated(iso: string): string {
  const MS_PER_DAY = 86_400_000;
  const days = Math.round(
    (new Date(`${TODAY_ISO}T00:00:00`).getTime() -
      new Date(`${iso}T00:00:00`).getTime()) /
      MS_PER_DAY,
  );

  if (days <= 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days} days ago`;
  return formatDate(iso); // purani entries par absolute date saaf padhne mein easy hai
}


