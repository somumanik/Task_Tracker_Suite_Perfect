# PAGE_MAP.md — Routes, Navigation & Web↔Mobile Screen Map (Phase 0)

> Original UI hoga — ye sirf **IA (information architecture)** map hai, visual design nahi.
> Koi bhi pura HTML/CSS/JS yahan se copy nahi kiya gaya.

---

## 1. App Shell / Layout

```
WEB SHELL (desktop-first, mobile-ready)
┌────────────┬──────────────────────────────────────────────┐
│            │  Topbar: [☰ mobile] [Search] [🌐 Language]  │
│  Sidebar   │           [🔔 Bell] [👤 Profile menu]       │
│  (brand:   ├──────────────────────────────────────────────┤
│  appConfig)│                                              │
│  Dashboard │              <Page content />                │
│  Tasks     │                                              │
│  ...       │                                              │
└────────────┴──────────────────────────────────────────────┘
• ≥1024px: fixed sidebar
• 768–1023px: icon rail / drawer
• <768px: topbar + hamburger drawer + bottom nav (5 primary)

MOBILE SHELL (future React Native / Expo)
Bottom tabs: Home(Dashboard) | Tasks | Attendance(Punch) | Calendar | More
```

---

## 2. Route Map (Next.js App Router)

| # | Route (web) | Page / Section | Auth | Sidebar order | Primary actions | Key APIs |
|---|-------------|----------------|------|---------------|-----------------|----------|
| 1 | `/login` | Login | Public | — | Sign in | `POST /auth/login` |
| 2 | `/` → `/dashboard` | Dashboard | Required | 1 | Punch, quick task, overview | `GET /dashboard/summary`, `POST /attendance/punch` |
| 3 | `/tasks` | Buckets & Tasks board | Required | 2 | Bucket CRUD, task CRUD, status, assign | `/buckets`, `/tasks` |
| 4 | `/tasks/[id]` | Task detail (sub-tasks) | Required | (child) | Sub-tasks, edit, history* | `/tasks/:id`, `/subtasks` |
| 5 | `/todos` | My To-Do list | Required | 3 | Add/complete/delete | `/todos` |
| 6 | `/timesheet` | Timesheet (week) | Required | 4 | Enter hours, submit/update, approve | `/timesheets` |
| 7 | `/attendance` | Attendance summary + punch history | Required | 5 | View month, punch log | `/attendance` |
| 8 | `/leaves` | Leave apply + approvals | Required | (More/child) | Apply, approve/reject | `/leaves` |
| 9 | `/calendar` | Calendar (attendance+tasks) | Required | 6 | Navigate months, day detail | `/calendar` |
| 10 | `/notices` | Notice board | Required | 7 | Read, publish (admin) | `/notices` |

| 11 | `/notices/[id]` | Notice detail | Required | (child) | Read, pin (admin) | `/notices/:id` |
| 12 | `/reports` | Reports | Manager+ | 8 | Filters, charts, export | `/reports/*` |
| 13 | `/items` | Item list (master) | Required | 9 | CRUD, search | `/items` |
| 14 | `/team` | Team members | Admin+ | 10 | Add member, roles, teams | `/members`, `/teams` |
| 15 | `/notifications` | Notification center | Required | (bell) | Read, mark-all | `/notifications` |
| 16 | `/settings` | Settings (sections) | Admin | 11 | Shifts, geofence, channels | `/settings/*` |
| 17 | `/profile` | My profile | Required | (avatar menu) | Edit, password, language | `/me` |
| 18 | `/help` | Help / getting started tour | Required | (icon) | Run tour, FAQ | `PATCH /me` (flag) |
| 19 | `/search?q=` | Global search results | Required | (topbar) | Cross-module search | `/search` |
| 20 | *(future)* `/chat` | Chat (Phase 5+, confirm) | Required | (float) | Conversations | `/chat/*` + WS |

**Notes**
- `#addtaskfloater` concept → **FAB** (floating action button) on `/tasks`, `/todos`, `/dashboard` — original design, not copied.
- Redirects: `/` → `/dashboard` (logged in) else `/login`.
- Next.js `middleware.ts` se route protection + role check; API layer par bhi RBAC check (defense in depth).
- `*` = comments/activity history assumed (open question).

---

## 3. Navigation Inventory / नेविगेशन

| Zone | Items | Evidence |
|------|-------|----------|
| Sidebar (main) | Dashboard, Tasks, To-Do, Timesheet, Attendance, Calendar, Notices, Reports, Items, Team, Settings, Help | Feature icons inventory |
| Topbar | Global search, Language switcher (EN/HI), Notification bell (unread badge), Profile menu | `.languageLink`, bell icon, `.profile-detail`, navbar search |
| Profile menu | My Profile, Help/Tour, Logout | `.profile-detail`, `Help.svg` |
| Floating | Quick-add task floater; Punch float (`.float_punchout`); optional later: Chat float | dashboard.css / smallchat.css |
| Mobile bottom nav | Dashboard, Tasks, Punch/Attendance, Calendar, **More** (rest inside) | mobile-ready requirement |

**Hindi:** Desktop par sidebar mein sab modules hote hain; mobile par bottom bar mein sirf 5 zaroori — baaki "More" mein. Search, language, bell, profile hamesha topbar mein rehte hain.

---

## 4. Web ↔ Mobile Screen Mapping

| Web route | Mobile screen (future RN) | Shared backend |
|-----------|---------------------------|----------------|
| `/login` | `LoginScreen` | `/api/v1/auth/*` |
| `/dashboard` | `HomeScreen` (punch card + tasks) | `/dashboard/summary` |
| `/tasks`, `/tasks/[id]` | `TasksScreen`, `TaskDetailScreen` | `/buckets`, `/tasks` |
| `/todos` | `TodosScreen` | `/todos` |
| `/timesheet` | `TimesheetScreen` (per-day entry) | `/timesheets` |
| `/attendance`, `/leaves` | `AttendanceScreen`, `LeavesScreen` | `/attendance`, `/leaves` |
| `/calendar` | `CalendarScreen` (day-list default) | `/calendar` |
| `/notices` + detail | `NoticesScreen`, `NoticeDetailScreen` | `/notices` |
| `/reports` | `ReportsScreen` (simplified) | `/reports/*` |
| `/items` | `ItemsScreen` | `/items` |
| `/team` | `TeamScreen` (admin role) | `/members` |
| `/notifications` | `NotificationsScreen` + push | `/notifications` |
| `/settings` | `SettingsScreen` (sections) | `/settings/*` |
| `/profile` | `ProfileScreen` | `/me` |
| `/search` | `SearchScreen` | `/search` |

> **Rule:** Screen banegi, business logic nahi — saara logic REST API + server par.
> `WEB ↓ API ↓ BACKEND ↓ DB` = `MOBILE ↓ API ↓ BACKEND ↓ DB`

---

## 5. Page States (har list/page ke liye standard)

| State | Requirement |
|---|---|
| Loading | Skeleton (layout-preserving), no spinner-on-white-page |
| Empty | Illustration + CTA ("Naya bucket banayein") |
| Error | Retry button + friendly message (locale ke hisaab se EN/HI) |
| Permission denied | 403 state (role kam hone par) |
| Offline (mobile) | Cached last data + action queue (punch/task) sync |

---

**Next:** [`REFERENCE_ANALYSIS.md`](./REFERENCE_ANALYSIS.md) · [`FEATURE_MATRIX.md`](./FEATURE_MATRIX.md) · [`WEB_MOBILE_ARCHITECTURE.md`](./WEB_MOBILE_ARCHITECTURE.md)

