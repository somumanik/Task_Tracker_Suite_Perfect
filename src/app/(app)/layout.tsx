import type { ReactNode } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';

/**
 * App shell (route group: "(app)") — login ke andar ke saare pages.
 *
 * Structure (original design — reference layout copy NAHI):
 *   Desktop: fixed Sidebar (left) + Header + main content
 *   Mobile:  Sidebar hidden → Header ka hamburger → MobileMenu drawer
 *
 * Ye ek SERVER component hai — interactivity (menu, search, profile)
 * client components (Header/MobileMenu) ke andar hai, isliye
 * client-side JS minimal rehta hai (performance rule).
 */
export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="lg:pl-64">
        <Header />
        <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
          {children}
        </main>
      </div>
    </div>
  );
}
