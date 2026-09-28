import type { ReactNode, SVGProps } from 'react';

/**
 * Original SVG icons — koi icon library package NAHI (performance rule).
 * Sabhi icons 24×24 stroke-style, rang `currentColor` se aata hai
 * (theme ke text color ke saath automatically match hote hain).
 */

type IconProps = SVGProps<SVGSVGElement>;

function Svg({
  children,
  ...props
}: IconProps & { children: ReactNode }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

/* ---- Navigation icons ---- */

export const MenuIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 7h16" />
    <path d="M4 12h16" />
    <path d="M4 17h16" />
  </Svg>
);

export const CloseIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M6 6l12 12" />
    <path d="M18 6L6 18" />
  </Svg>
);

export const SearchIcon = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="M20 20l-3.6-3.6" />
  </Svg>
);

export const BellIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M6 9a6 6 0 1 1 12 0c0 5 2 6 2 6H4s2-1 2-6z" />
    <path d="M10 19a2 2 0 0 0 4 0" />
  </Svg>
);

export const PaletteIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 3a9 9 0 1 0 0 18c1.6 0 2-1.2 1.2-2.1-.8-.9-.4-2.2.9-2.2H16a5 5 0 0 0 5-5c0-4.6-4.1-8.7-9-8.7z" />
    <circle cx="7.6" cy="11" r="1" />
    <circle cx="10.2" cy="7.6" r="1" />
    <circle cx="14.6" cy="7.8" r="1" />
  </Svg>
);

export const DashboardIcon = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3" y="3" width="8" height="8" rx="2" />
    <rect x="13" y="3" width="8" height="8" rx="2" />
    <rect x="3" y="13" width="8" height="8" rx="2" />
    <rect x="13" y="13" width="8" height="8" rx="2" />
  </Svg>
);

export const TasksIcon = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3" y="4" width="5" height="16" rx="1.5" />
    <rect x="10" y="4" width="5" height="11" rx="1.5" />
    <rect x="17" y="4" width="4" height="7" rx="1.5" />
  </Svg>
);

export const TodoIcon = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3.5" y="4" width="6" height="6" rx="1.5" />
    <path d="M5.3 7l1.4 1.4L9.2 5.8" />
    <path d="M12.5 7H21" />
    <rect x="3.5" y="14" width="6" height="6" rx="1.5" />
    <path d="M12.5 17H21" />
  </Svg>
);

export const CalendarIcon = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <path d="M3 10h18" />
    <path d="M8 3v4" />
    <path d="M16 3v4" />
  </Svg>
);

export const ClockIcon = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </Svg>
);

export const PinIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11z" />
    <circle cx="12" cy="10" r="2.5" />
  </Svg>
);

export const MegaphoneIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 10v4a1 1 0 0 0 1 1h2l7 4V5L7 9H5a1 1 0 0 0-1 1z" />
    <path d="M18 9a4 4 0 0 1 0 6" />
  </Svg>
);

export const ChartIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 20V11" />
    <path d="M10 20V5" />
    <path d="M16 20v-6" />
    <path d="M21 20H3" />
  </Svg>
);

export const BoxIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" />
    <path d="M12 12l8-4.5" />
    <path d="M12 12v9" />
    <path d="M12 12L4 7.5" />
  </Svg>
);

export const UsersIcon = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="9" cy="8" r="3.5" />
    <path d="M3 19c0-3 2.7-5 6-5s6 2 6 5" />
    <path d="M16.2 5.2a3.5 3.5 0 0 1 0 6.6" />
    <path d="M17.5 14.4c2.4.6 3.9 2.3 3.9 4.6" />
  </Svg>
);

export const SettingsIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 7h9" />
    <path d="M18 7h2" />
    <circle cx="15.5" cy="7" r="2.2" />
    <path d="M4 17h5" />
    <path d="M14 17h6" />
    <circle cx="11.5" cy="17" r="2.2" />
  </Svg>
);

export const HelpIcon = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M9.6 9.6a2.5 2.5 0 1 1 3.6 2.3c-.9.5-1.2 1-1.2 1.9" />
    <path d="M12 17h.01" />
  </Svg>
);

export const UserIcon = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-4 3.6-6 8-6s8 2 8 6" />
  </Svg>
);

export const BucketIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4.5 7.5h15l-1.3 11.7A2 2 0 0 1 16.2 21H7.8a2 2 0 0 1-2-1.8L4.5 7.5z" />
    <path d="M8.5 7.5a3.5 3.5 0 0 1 7 0" />
  </Svg>
);

export const CheckIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </Svg>
);

export const LayersIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 3l9 5-9 5-9-5 9-5z" />
    <path d="M3 12l9 5 9-5" />
    <path d="M3 16.5l9 5 9-5" />
  </Svg>
);

export const AlertTriangleIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M10.3 4.3L2.8 17.2A2 2 0 0 0 4.5 20.2h15a2 2 0 0 0 1.7-3L13.7 4.3a2 2 0 0 0-3.4 0z" />
    <path d="M12 9.5v4" />
    <path d="M12 17h.01" />
  </Svg>
);

export const PlusIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 5v14" />
    <path d="M5 12h14" />
  </Svg>
);
