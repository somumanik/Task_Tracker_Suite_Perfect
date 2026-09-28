import { APP_LOGO, APP_NAME, APP_TAGLINE } from '@/config/appConfig';
import NavList from './NavList';

/**
 * Ye Sidebar application ke main modules ko show karta hai.
 * Future mein yahin se Dashboard, Tasks, Calendar,
 * Timesheet aur Reports pages open honge.
 *
 * - Desktop (≥lg) par fixed left sidebar dikhta hai.
 * - Mobile/Tablet par ye hidden hai — Header ka hamburger
 *   button MobileMenu (drawer) kholta hai.
 * Ye server component hai; links ki interactivity NavList
 * (client) ke andar hai — isliye client JS kam rehta hai.
 */
export default function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-border bg-surface lg:flex">
      {/* Brand — naam sirf appConfig se (hard-code kabhi nahi) */}
      <div className="flex h-16 items-center gap-3 border-b border-border px-5">
        {/* eslint-disable-next-line @next/next/no-img-element -- chhota SVG logo, next/image ki zaroorat nahi */}
        <img src={APP_LOGO} alt="" width={28} height={28} className="h-7 w-7" />
        <span className="truncate text-sm font-bold tracking-tight">
          {APP_NAME}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-4">
        <NavList />
      </div>

      <div className="border-t border-border px-5 py-4">
        <p className="text-xs leading-relaxed text-muted">{APP_TAGLINE}</p>
      </div>
    </aside>
  );
}
