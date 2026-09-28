import type { Metadata } from 'next';
import BucketsView from '@/components/tasks/BucketsView';

export const metadata: Metadata = {
  title: 'Buckets',
};

/**
 * Buckets — tasks ke groups (Phase 3A).
 *
 * Page (server) sirf compose karta hai; "Create Bucket" modal ka state
 * BucketsView (client) mein hai. Modal abhi sirf UI hai — koi DB/API
 * connection nahi (bucket local state mein add hota hai).
 */
export default function BucketsPage() {
  return <BucketsView />;
}
