# WEB_MOBILE_ARCHITECTURE.md — Original Web + Mobile Ready Architecture (Phase 0)

> **Stack:** Next.js · React · TypeScript · Tailwind CSS · PostgreSQL · REST API
> **Rule:** Business logic sirf backend/API par. Web aur mobile dono **same API** consume karte hain.
> **Security:** DB credentials sirf server-side (`.env`), browser/mobile kabhi PostgreSQL se direct connect nahi karte.

---

## 1. High-Level Diagrams

### 1.1 WEB

```
┌──────────────────────────────┐
│  NEXT.JS WEB APP             │
│  (React + TS + Tailwind)     │
│  ┌────────────────────────┐  │
│  │ UI Components (themes) │  │  ← design tokens (--color-*)
│  │ Server Components      │  │  ← data fetch (RSC)
│  │ Client Components      │  │  ← interactivity only
│  └───────────┬────────────┘  │
│              │ fetch('/api/v1/...')  (HTTP REST + JWT cookie)
└──────────────┼───────────────┘
               ▼
┌──────────────────────────────┐
│  REST API LAYER              │  Next.js Route Handlers (/app/api)
│  validation · RBAC · errors  │  (Phase 1 mein in-process; baad mein
└──────────────┬───────────────┘   chaha to alag Node/Express service)
               ▼
┌──────────────────────────────┐
│  BACKEND SERVICES (server)   │
│  domain logic (tasks, att.,  │
│  timesheet, reports) + jobs  │
└──────────────┬───────────────┘
               ▼
┌──────────────────────────────┐
│  PostgreSQL (server-only)    │  connection pool · migrations · indexes
│  .env credentials (secret)   │
└──────────────────────────────┘
```

### 1.2 MOBILE (future React Native / Expo)

```
┌──────────────────────────────┐
│  REACT NATIVE / EXPO APP     │
│  screens + native features   │  (camera, GPS, push, secure storage)
│  theme objects (same tokens) │
└──────────────┬───────────────┘
               │ fetch('https://<API>/api/v1/...')  (REST + Bearer JWT)
               ▼
┌──────────────────────────────┐
│  SAME REST API LAYER         │  ← koi mobile-specific logic nahi
│  same validation · RBAC      │     (sirf headers/device differ)
└──────────────┬───────────────┘
               ▼
┌──────────────────────────────┐
│  SAME BACKEND SERVICES       │
└──────────────┬───────────────┘
               ▼
┌──────────────────────────────┐
│  SAME PostgreSQL DATABASE    │
└──────────────────────────────┘
```

**Equivalence rule:**
`WEB → API → BACKEND → DB` ≡ `MOBILE → API → BACKEND → DB`
→ Isliye **koi bhi business logic React page/component mein nahi** — sirf presentation + API calls.

---

## 2. Technology Choices (confirmed + minimal)

| Layer | Choice | Reason |
|---|---|---|
| Web framework | **Next.js (App Router) + React + TypeScript** | RSC = minimal client JS; SSR fast |
| Styling | **Tailwind CSS + CSS variable design tokens** | Theme switching bina component duplication |
| API | **REST** (`/api/v1/...`) via Route Handlers | Spec requirement; mobile se reusable |
| DB | **PostgreSQL** | JSONB, FTS, strong indexes |
| DB access | Server-side driver + migration tool (e.g. node-postgres + SQL migrations) | No ORM lock-in *(final lib Phase 1 mein confirm)* |
| Validation | Shared Zod-style schemas (server enforced) | Web + API dono same rules |
| Auth | JWT (access) + refresh rotation; web = HttpOnly cookie, mobile = Bearer | Standard, secure |
| i18n | Static dictionaries `en.json` / `hi.json` | No runtime API needed |
| State/data | Server Components + light client cache (fetch de-dup) | Avoid duplicate API calls |

> **No package installs in Phase 0.** Phase 1 mein sirf zaroori dependencies install hongi.

---

## 3. Proposed Folder Structure

```
Task_Tracker_files/
├── docs/                          # Phase 0 documentation
│   ├── REFERENCE_ANALYSIS.md
│   ├── PAGE_MAP.md
│   ├── FEATURE_MATRIX.md
│   └── WEB_MOBILE_ARCHITECTURE.md
├── public/                        # original assets (logo/favicon via appConfig)
├── src/
│   ├── app/                       # Next.js App Router
│   │   ├── (auth)/login/
│   │   ├── (app)/dashboard|tasks|todos|timesheet|attendance|calendar|
│   │   │         notices|reports|items|team|notifications|settings|profile|help
│   │   ├── api/v1/                # REST route handlers
│   │   │   ├── auth/  tasks/  buckets/  attendance/  timesheets/
│   │   │   ├── notices/  notifications/  reports/  items/  members/
│   │   │   ├── settings/  search/  calendar/  leaves/  me/
│   │   ├── layout.tsx  globals.css  middleware.ts
│   ├── components/                # reusable UI (Button, Card, Table, Modal, Form...)
│   │   ├── ui/  layout/  tasks/  attendance/  calendar/  reports/
│   ├── config/
│   │   └── appConfig.ts           # APP_NAME, tagline, logo, favicon (centralized)
│   ├── theme/                     # theme system (tokens, definitions, provider, selector)
│   ├── lib/                       # apiClient, debounce, auth helpers, validators
│   ├── i18n/                      # en.json, hi.json, t() helper
│   ├── server/                    # ⚙️ SERVER-ONLY: db pool, queries, services, rbac
│   │   ├── db/  services/  rbac.ts  audit.ts
│   └── types/                     # shared TS types (API contracts)
├── migrations/                    # SQL migrations + indexes
├── .env.example                   # variable names + dummy values (NO real secrets)
├── .env                           # gitignored, real credentials (server only)
├── package.json  tsconfig.json  tailwind.config.ts
└── (future) mobile/               # React Native / Expo app (same API contracts)
```

**Import boundary rule:** `src/server/**` sirf API route handlers se import hoti hai — components kabhi direct DB na dekhein (`server-only` package concept).

---

## 4. REST API Conventions

| Rule | Standard |
|---|---|
| Base path | `/api/v1` (versioned — future mobile compatibility) |
| Format | JSON: success `{ "data": ..., "meta": { page, limit, total } }`, error `{ "error": { code, message, details? } }` |
| Auth | Web: HttpOnly cookie · Mobile: `Authorization: Bearer <jwt>` — **same token service** |
| Validation | Har request body/query server par validate; 400 + field errors |
| RBAC | Har protected route par role check → 401 (no token) / 403 (no role) |
| Pagination | `?page=1&limit=20` (max 100) — kabhi unbounded list nahi |
| Filtering/sort | `?q=&status=&from=&to=&sort=-created_at` |
| Rate limit | Auth + search endpoints par throttling |
| Idempotency | Punch/submit jaise POSTs mein client-generated id (mobile offline queue) |

### 4.1 Endpoint Catalog (contract overview)

```
AUTH        POST   /api/v1/auth/login | /refresh | /logout    GET /auth/me
ME          GET    /api/v1/me        PATCH /me
            POST   /api/v1/me/avatar | /me/change-password
BUCKETS     GET/POST /api/v1/buckets       GET/PATCH/DELETE /buckets/:id
TASKS       GET/POST /api/v1/tasks         GET/PATCH/DELETE /tasks/:id
            POST   /api/v1/tasks/:id/assign
            GET/POST /api/v1/tasks/:id/subtasks   PATCH /subtasks/:id
TODOS       GET/POST /api/v1/todos         PATCH/DELETE /todos/:id
MEMBERS     GET/POST /api/v1/members       PATCH/DELETE /members/:id
TEAMS       GET/POST /api/v1/teams         ...
TIMESHEETS  GET/POST /api/v1/timesheets    PATCH /timesheets/:id
            POST   /timesheets/:id/approve | /reject
ATTENDANCE  POST   /api/v1/attendance/punch     GET /attendance?month=
LEAVES      GET/POST /api/v1/leaves        POST /leaves/:id/approve|reject
HOLIDAYS    GET/POST /api/v1/holidays
CALENDAR    GET    /api/v1/calendar?month=&user=
NOTICES     GET/POST /api/v1/notices       GET/PATCH/DELETE /notices/:id
            POST   /notices/:id/read
NOTIF.      GET    /api/v1/notifications   POST /notifications/:id/read | /read-all
REPORTS     GET    /api/v1/reports/{attendance|tasks|timesheet}
            GET    /api/v1/reports/export?type=csv
ITEMS       GET/POST /api/v1/items         GET/PATCH/DELETE /items/:id
SETTINGS    GET/PATCH /api/v1/settings     /settings/shifts | /geofences
SEARCH      GET    /api/v1/search?q=&types=&limit=
DASHBOARD   GET    /api/v1/dashboard/summary
(future)    /api/v1/chat/*  + WebSocket channel
```

---

## 5. Authentication & Security Architecture

```
WEB LOGIN:  form → POST /auth/login → verify hash → set HttpOnly cookie (access+refresh)
            middleware.ts: cookie check → redirect /login
MOBILE:     form → POST /auth/login → JSON { accessToken, refreshToken }
            store refreshToken in Keychain/Keystore; attach Bearer on every call
BOTH:       refresh flow on 401 → POST /auth/refresh → retry once → else logout
```

- Passwords: **bcrypt/argon2 hash** (kabhi plain text nahi).
- RBAC: roles = `admin | manager | employee` (❓ confirm) — checked in `server/rbac.ts`, **server par hi**.
- `.env` gitignored; `.env.example` sirf naam + dummy values. **`DATABASE_URL` kabhi `NEXT_PUBLIC_*` nahi.**
- Input validation + parameterized queries (SQL injection safe), output escaping (XSS safe).
- Audit log for sensitive mutations (settings, member role change).
- Rate limiting + brute-force lockout on login.

**Hindi:** Password server par hash ban kar rakha jaata hai. DB ka address sirf server ke `.env` file mein hai — na browser na mobile app usse kabhi direct baat nahi karta. Har API par pehle check hota hai ki token sahi hai aur usko ye kaam karne ka haq hai.

---

## 6. Database Design Overview (PostgreSQL)

**Core tables:** `users` · `sessions` · `teams` · `team_members` · `buckets` · `tasks` · `subtasks` · `todos` · `timesheet_entries` · `attendance_punches` · `shifts` · `geofences` · `leaves` · `holidays` · `notices` · `notice_reads` · `notifications` · `notification_prefs` · `items` · `settings` · `audit_log`

**Key indexes (performance requirement):**

```sql
CREATE INDEX idx_tasks_assignee_status_due ON tasks (assignee_id, status, due_date);
CREATE INDEX idx_tasks_bucket_order        ON tasks (bucket_id, sort_order);
CREATE INDEX idx_tasks_due                 ON tasks (due_date) WHERE status <> 'closed';
CREATE INDEX idx_punch_user_time           ON attendance_punches (user_id, punched_at);
CREATE INDEX idx_attendance_user_date      ON attendance_punches (user_id, punched_at::date); -- or generated col
CREATE INDEX idx_timesheet_user_week       ON timesheet_entries (user_id, week_start);
CREATE INDEX idx_notif_user_unread         ON notifications (user_id, read_at, created_at DESC);
CREATE INDEX idx_notices_created           ON notices (created_at DESC);
CREATE INDEX idx_items_name_trgm           ON items USING gin (name gin_trgm_ops);
CREATE INDEX idx_tasks_search              ON tasks USING gin (to_tsvector('simple', title));
```

- Har list query: `LIMIT/OFFSET` (keyset pagination for big tables), `SELECT` mein sirf needed columns.
- JSONB sirf flexible attrs (items/settings) par; core fields typed columns.
- Migrations version-controlled SQL files; staging par `EXPLAIN ANALYZE` review.

---

## 7. Performance Strategy (spec → implementation plan)

| Requirement | Implementation plan |
|---|---|
| Code splitting | Route-level code split (App Router default); heavy widgets (charts/board/calendar) via `next/dynamic` |
| Lazy loading | `next/image` (lazy + sized), below-fold sections, chart libs async |
| Optimized images | AVIF/WebP via `next/image`, explicit width/height, no CLS |
| Pagination | API-level `page&limit` + table/list virtualization only if needed |
| Debounced search | Shared `useDebouncedValue(300ms)` + `AbortController` (no duplicate/parallel duplicates) |
| Duplicate API avoidance | `lib/apiClient` request de-dup per key; RSC fetch cache; invalidate on mutation |
| Avoid unnecessary polling | No intervals by default; refetch on focus/route change; SSE/WebSocket Phase later |
| Efficient DB queries | Indexes (§6), aggregates server-side, no `SELECT *`, connection pooling |
| Minimal client JS | Server Components default; `"use client"` sirf interactive islands (forms, board, calendar) |
| Reusable components | `components/ui/*` theme-token based — ek baar banao, har jagah use |
| Monolith avoidance | Feature folders (tasks/, attendance/...) — max ~200–300 lines per component file |

---

## 8. Theme Architecture (web + mobile ready)

```
src/theme/
├── tokens.ts         # base design tokens (spacing, radius, typography, shadow, z)
├── themes.ts         # 6 theme DEFINITIONS → semantic color maps (source of truth)
├── ThemeProvider.tsx # React context: applies CSS vars on :root, persists localStorage
├── ThemeSelector.tsx # accessible theme picker UI (uses context only)
├── theme.css         # :root fallback tokens (first paint, no FOUC)
└── index.ts          # barrel exports
```

**Semantic tokens (components sirf ye use karte hain — hard-coded hex kabhi nahi):**
`--color-primary` · `--color-secondary` · `--color-background` · `--color-surface` · `--color-text` · `--color-muted` · `--color-border` · `--color-success` · `--color-warning` · `--color-danger` (+ `--color-focus`, `--color-primary-contrast`)

**6 themes:** Ocean · Royal Purple · Emerald · Sunset · Graphite · Professional Blue

**How switching works (no component duplication):**
1. `themes.ts` defines `{ id, label, colors }` per theme (single source of truth).
2. `ThemeProvider` writes semantic vars onto `document.documentElement` and sets `data-theme="<id>"`.
3. Components style via `text-[var(--color-text)]` / plain CSS referencing vars — **theme badalne par sirf vars change, components nahi**.
4. Persist: `localStorage['task-tracker-theme']` (restore before paint via default in `theme.css` + provider effect).
5. `ThemeSelector` renders swatch buttons (`aria-pressed`), keyboard accessible.

**Mobile reuse:** Same `themes.ts` objects → RN `StyleSheet` / `useTheme()` map banega (CSS vars RN mein nahi chalti, isliye TS definitions hi mobile ka source hain). Tokens file platform-independent rakha gaya hai.

**Hindi:** Ek baar colors define kiye — component mein sirf `var(--color-primary)` likha hai. Theme badalne par wahi variable doosra rang le leta hai. Isliye 6 themes ke liye 6 copies banane ki zaroorat nahi. Mobile app bhi isi `themes.ts` ko import karegi.

---

## 9. Hindi Code Documentation Rule (development standard)

Important components/business logic par **meaningful Hindi comments** (har line par nahi), jo batayein:

1. Component ka purpose
2. Ye kis page par use hota hai
3. User kya action karta hai
4. Data kahan se aata hai
5. API ka kya role hai
6. Database mein kya operation hota hai
7. Authentication kaise work karta hai
8. Error handling kaise hoti hai
9. Mobile app future mein same API kaise use karegi

Example header comment:

```tsx
// ============================================================
// TaskBoard — /tasks page ka main board dikhata hai.
// User buckets ke andar tasks dekhta hai, naya task add karta hai
// ya status change karta hai.
// Data: GET /api/v1/tasks (server se), error par retry + empty state.
// API hi business rules enforce karti hai (RBAC + validation),
// isliye future mobile app bhi wahi endpoint use karegi.
// ============================================================
```

---

## 10. Recommended Implementation Phases

| Phase | Scope | Deliverables |
|---|---|---|
| **Phase 0 (abhi)** | Analysis + foundation files | 4 docs, `appConfig.ts`, `src/theme/*`, `.env.example` ✅ |
| **Phase 1** | Project scaffold + auth + shell | Next.js setup (deps install), Tailwind, login/session, middleware, app shell (sidebar/topbar/bottom-nav), theme selector live, i18n scaffolding |
| **Phase 2** | Core work management | Buckets/tasks/subtasks/todos CRUD + FAB + assign, task detail, optimistic UI, search (debounced) |
| **Phase 3** | Attendance suite | Punch (+geofence option), shifts, leaves, holidays, attendance calendar, timesheet entry+approval |
| **Phase 4** | Communication + oversight | Notices, notifications (focus-refresh), dashboard summary, reports (charts + pagination), items CRUD, team management, settings, profile |
| **Phase 5** | Mobile + polish | RN/Expo app (same API), push, offline queue, onboarding tour, exports, audit log |
| **Phase 6 (optional)** | Real-time + chat | SSE/WebSocket notifications, live chat (confirm business need), external email/SMS provider |

**Definition of Done (har phase):** tests for API (where applicable), a11y pass, EN/HI strings, theme-token-only styling, `.env.example` updated, docs updated.

---

**Index:** [`REFERENCE_ANALYSIS.md`](./REFERENCE_ANALYSIS.md) · [`PAGE_MAP.md`](./PAGE_MAP.md) · [`FEATURE_MATRIX.md`](./FEATURE_MATRIX.md) · `WEB_MOBILE_ARCHITECTURE.md` (current)


