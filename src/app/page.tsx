import { redirect } from 'next/navigation';

/**
 * "/" root URL → hamesha /dashboard par redirect.
 * Phase 1: dashboard placeholder shell.
 * Phase 4 (auth) ke baad yahin login-check bhi lagega.
 */
export default function Home() {
  redirect('/dashboard');
}
