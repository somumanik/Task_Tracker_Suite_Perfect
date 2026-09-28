import type { ReactNode } from 'react';
import {
  BoxIcon,
  BucketIcon,
  CalendarIcon,
  ChartIcon,
  ClockIcon,
  DashboardIcon,
  HelpIcon,
  MegaphoneIcon,
  PinIcon,
  SettingsIcon,
  TasksIcon,
  TodoIcon,
  UsersIcon,
} from '../icons';

/**
 * Navigation ka ek hi source of truth — Sidebar aur MobileMenu
 * dono isi list ko render karte hain (menu kabhi alag-alag nahi honge).
 *
 * Ye navigation sections application ke alag-alag
 * task management modules ko organize karte hain:
 *   WORK · TIME & ATTENDANCE · ORGANIZATION · SYSTEM
 *
 * Ye IA original hai (reference site ka menu copy NAHI).
 * Har href PAGE_MAP.md ke route map se match rakhta hai.
 *
 * Sidebar ke icons ko module ke according halka color diya gaya hai
 * taaki user ko different sections ko visually identify karna easy ho.
 * Icon ka color sirf UI purpose ke liye hai; iska functionality par koi effect nahi hai.
 */

export interface NavLink {
  label: string;
  href: string;
  icon: ReactNode;
  /** Icon ka module-color (sirf UI — navy/indigo waghera reference se nahi). */
  color: string;
}

export interface NavGroup {
  label: string;
  links: NavLink[];
}

export const NAV_GROUPS: NavGroup[] = [
  {
    label: 'Work',
    links: [
      { label: 'Dashboard', href: '/dashboard', icon: <DashboardIcon />, color: '#2563eb' }, // Blue
      { label: 'My Tasks', href: '/my-tasks', icon: <TodoIcon />, color: '#9333ea' }, // Purple
      { label: 'All Tasks', href: '/all-tasks', icon: <TasksIcon />, color: '#4f46e5' }, // Indigo
      { label: 'Buckets', href: '/buckets', icon: <BucketIcon />, color: '#ea580c' }, // Orange
      { label: 'Team', href: '/team', icon: <UsersIcon />, color: '#16a34a' }, // Green
    ],
  },
  {
    label: 'Time & Attendance',
    links: [
      { label: 'Calendar', href: '/calendar', icon: <CalendarIcon />, color: '#0d9488' }, // Teal
      { label: 'Timesheet', href: '/timesheet', icon: <ClockIcon />, color: '#3b82f6' }, // Blue
      { label: 'Attendance', href: '/attendance', icon: <PinIcon />, color: '#dc2626' }, // Red
    ],
  },
  {
    label: 'Organization',
    links: [
      { label: 'Notices', href: '/notices', icon: <MegaphoneIcon />, color: '#f59e0b' }, // Yellow/Orange
      { label: 'Reports', href: '/reports', icon: <ChartIcon />, color: '#7c3aed' }, // Violet
      { label: 'Items', href: '/items', icon: <BoxIcon />, color: '#0891b2' }, // Cyan
    ],
  },
  {
    label: 'System',
    links: [
      { label: 'Settings', href: '/settings', icon: <SettingsIcon />, color: '#64748b' }, // Gray/Blue
      { label: 'Help', href: '/help', icon: <HelpIcon />, color: '#059669' }, // Green
    ],
  },
];
