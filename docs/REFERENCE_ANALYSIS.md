# REFERENCE_ANALYSIS.md — Phase 0 (Analysis Only)

> **Project:** Task Tracker — Original Web + Mobile Ready Architecture
> **Mode:** Sirf analysis (analysis only). Koi bhi application code, purana HTML, purana CSS ya purana JS copy nahi kiya gaya.
> **Status:** ✅ Analysis complete — implementation Phase 1 mein start hogi.

---

## 1. Scope aur Disclaimer / दायरा और अस्वीकरण

Ye document sirf **samajhne ke liye** (understanding only) banaya gaya hai:

- Page structure / Navigation / Features / Workflows / Terminology / Information architecture

**Nahi kiya gaya (NOT done):**

- Purane HTML ka structure copy karna ❌
- Purani CSS copy karna ❌
- Purana JavaScript copy karna ❌
- Visual design, logo, brand name, images ya proprietary assets copy karna ❌

Naya application **original UI + original implementation** ka hoga. Is reference se sirf *business functionality* samjhi gayi hai.

**Hindi mein:** Ye files sirf dekhne-samajhne ke liye hain. Inka design, code ya brand hum duplicate nahi karenge. Humara apna alag modern UI hoga, lekin features wahi rakhenge jo business ke liye zaroori hain.

---

## 2. Inspected Files / निरीक्षित फ़ाइलें

| # | File | Type | Kya mila (Finding) |
|---|------|------|--------------------|
| 1 | `auETluE1WxU.html` (526 KB) | Saved YouTube embed page | Video title: *"Smart Task Management Software for SMEs \| Full Product Demo Task Tracker by Tracker Suite"* — ye product demo video hai, HTML app page nahi |
| 2 | `LJ-zpHUxMCs.html` (512 KB) | Saved YouTube embed page | Video title: *"Smart Task Management System \| Hindi Demo"* |
| 3 | `dashboard.css` (64 KB) | App dashboard stylesheet (structure hints only) | Selectors: `#addemptask`, `#addtaskfloater`, `#submittimesheet`, `#updatetimesheet`, `#addleavenotify`, `#addteam`, `.punchIcon`, `.float_punchout`, `.bucketName`, `.dueDate*`, `.taskTab`, `.noticeIcon`, `.language`, `.languageLink`, `.profile-detail`, `.reports`, `.select-items` |
| 4 | `calendar.css` (27 KB) | Attendance/task calendar stylesheet | Status colors: present / absent / late / leave / holiday / missed / half-day; task states: `closedtaskcls`, `todaydue`, `openandoverdutdate`, `progresstest` |
| 5 | `smallchat.css` + `smallchat.js` | Live chat widget | Chat panel, groups (`createnewgroupfromlive`), contacts with online/away/busy status, punch-out float button, audio-note lib (`Mp3LameEncoder`) |
| 6 | `atlantis2.css` / `atlantis.min.js` | Third-party admin template (Atlantis Lite) — **not copied** | Generic admin shell: sidebar nav, navbar search, notification bell, profile pic, chart cards, tasks list widgets |
| 7 | Onboarding step SVGs: `add-bucket-step.svg`, `add-task-step.svg`, `add-teammember-step.svg`, `Notification-step.svg` + `introjs` lib | Product tour steps | Naye user ko 4 cheezein sikhayi jati hain: **Bucket add karna, Task add karna, Team member add karna, Notifications** |
| 8 | Feature icons: `newdashboard.svg`, `todolist.svg`, `timesheet.svg`, `attendance.svg`, `calendar.svg`, `noticeboard.svg`, `reports.svg`, `Setting.svg`, `ItemList.svg`, `sub-task.svg`, `addbucket.svg`, `addteammember.svg`, `Geofencing_n.svg`, `location.svg`, `Multipleshifts.svg`, `externalnotification.svg`, `bell_icon_withoutnoti.svg`, `Help.svg`, `star.svg`, `view.svg`, `zoom.svg` | Module icons | Sidebar/menu ke modules ka pata chalta hai (neeche page list) |
| 9 | `trackersuitelogoo.webp`, `logo.svg` | Original brand assets | **Brand: "Tracker Suite" — BILKUL use nahi karna** (brand requirement) |
| 10 | JS libs: bootstrap, jQuery, datatables, select2, moment, datetimepicker, inputmask, jquery-validate, intro.js | Legacy stack — **replace, not reuse** | Batata hai ki purani app mein tables, forms, date-pickers, validation, tours the |

**Evidence-based conclusion:** Reference mein actual app ka HTML snapshot nahi hai — do demo-video pages aur scraped assets hain. Isliye page/feature list **icon names, CSS selectors, onboarding steps aur video titles** se derive ki gayi hai. Jo confirm nahi hai wo **Assumed** mark ke saath listed hai (section 7 — Open Questions).

---

## 3. Brand Notice / ब्रांड सूचना

| Item | Value |
|------|-------|
| Original brand (DO NOT USE) | Tracker Suite |
| New brand (centralized config) | `APP_NAME = "YOUR BRAND NAME"` in `/src/config/appConfig.ts` |
| Rule | Brand name kahin bhi components mein hard-code **nahi** hoga — sirf `appConfig` se aayega |

---

## 4. Page-wise Analysis / पेज-दर-पेज विश्लेषण

> Har page ke liye 9 fields diye gaye hain: **purpose, user action, expected result, dependencies, possible API, possible DB, web requirement, mobile requirement**.
> 🟢 = asset/CSS se confirm, 🟡 = reasonable assumption (open question bhi).

### 4.1 Login / Authentication 🟡 (assumed — koi snapshot nahi mila, lekin har SaaS app mein zaroori)

- **Page name:** Login (Sign-in)
- **Purpose / उद्देश्य:** User apne credentials se system mein enter kare; sirf authorized log hi data dekh sakein. *English: Gate the application; issue a session token.*
- **User action / उपयोगकर्ता क्रिया:** Email/username + password enter kare, "Login" dabaye; optional "Remember me".
- **Expected result / अपेक्षित परिणाम:** Valid → dashboard par redirect + secure session token; Invalid → inline error message (koi crash nahi).
- **Dependencies:** Auth provider/session layer, user records, roles, appConfig (brand), theme (login page bhi themed hogi).
- **Possible API requirement:** `POST /api/v1/auth/login`, `POST /api/v1/auth/refresh`, `POST /api/v1/auth/logout`, `GET /api/v1/auth/me`.
- **Possible DB requirement:** `users` (id, name, email, password_hash, role, status, language, avatar), `sessions`/refresh-token table, indexes on `email`.
- **Web requirement:** Server-side form validation, HttpOnly cookies (ya access+refresh token pair), error states, loading state, password field accessibility (aria-live for errors).
- **Mobile requirement:** Same REST endpoints; token stored in secure storage (Keychain/Keystore); biometric unlock ka option future mein.

**Hindi:** Login page par user ID-password daalkar andar jayega. Galat password par error dikhega, sahi par dashboard khulega. Password server par hi check honge, browser mein kabhi nahi.

---

### 4.2 Dashboard 🟢 (`newdashboard.svg`, dashboard.css selectors, chart icon)

- **Page name:** Dashboard (Home / New Dashboard)
- **Purpose:** User ka **command center** — aaj ki tasks, due dates, attendance/punch status, quick actions aur high-level charts ek jagah. *English: One-glance overview of work + attendance + alerts.*
- **User action:** (a) Overview dekhe; (b) floating action se naya task add kare (`#addtaskfloater`); (c) Punch In/Out kare (`.punchIcon`, `.float_punchout`); (d) due-date filters/quick links use kare (`.dueDate*`, `.dashboardduedate`); (e) charts/details par click karke drill-down kare.
- **Expected result:** Live summary render ho — pending/due/overdue tasks, aaj ka attendance state, recent notifications; quick actions turant kaam karein bina page reload.
- **Dependencies:** Tasks API, Attendance API, Notifications API, Reports/summary API, reusable Card/Chart components, theme tokens.
- **Possible API:** `GET /api/v1/dashboard/summary` (tasks counts, punch state, unread notifications), `GET /api/v1/dashboard/activity`, `POST /api/v1/attendance/punch`, `POST /api/v1/tasks` (quick add).
- **Possible DB:** Reads across `tasks`, `timesheets`, `attendance_punches`, `notifications`; **materialized/aggregate query** with indexes on `(user_id, due_date)`, `(user_id, status)`.
- **Web:** Server Components mein initial summary, client widgets only for punch/quick-add; charts lazy-loaded; responsive grid (desktop 3–4 columns → mobile single column).
- **Mobile:** Same summary endpoint; punch button home screen widget; push notification deep-link to task.

**Hindi:** Dashboard par user ko sabse pehle aaj ka kaam, lateness/due dates, aur punch button dikhta hai. Ye page zyada tar API se banega — UI original hoga, data same rahega.

---

### 4.3 Buckets & Tasks (Task Board) 🟢 (`addbucket.svg`, `Add-Bucket-step.svg`, `addtasknew.png`, `AddTaskFloaterIcon.svg`, `.bucketName`, `.taskwrapper`, `#addemptask`)

- **Page name:** Tasks / Buckets (task board)
- **Purpose:** **Bucket = task ka group** (project/category jaisa). Andar tasks + unke status/priority/due dates. *English: Organized task management grouped into buckets.*
- **User action:** (a) Bucket create/edit/delete (`addbucket.svg`); (b) Bucket ke andar task add kare — title, description, assignee, due date, priority; (c) task status change kare (open → in progress → closed); (d) task ko assign kare (`.assignIcon`); (e) drag/ reorder; (f) task list view toggle (`.taskTab`, `tasklisticon.png`).
- **Expected result:** Optimistic UI update — task turant board par dikhe, background mein save; failure par rollback + toast error; overdue task red state (`.dashboardduedate`, closed/overdue classes).
- **Dependencies:** Buckets API, Tasks API, Users/teams (assignee list), date utils, validation, DnD library (sirf zaroorat par).
- **Possible API:** `GET/POST/PATCH/DELETE /api/v1/buckets`, `GET/POST/PATCH/DELETE /api/v1/tasks`, `GET /api/v1/tasks?bucket=&status=&q=&page=`, `POST /api/v1/tasks/:id/assign`.
- **Possible DB:** `buckets` (id, name, owner/team, sort_order), `tasks` (id, bucket_id, title, description, status, priority, due_date, assignee_id, created_by, timestamps), indexes: `(bucket_id, sort_order)`, `(assignee_id, status, due_date)`, `(due_date)` for overdue queries; `to_tsvector` (Postgres) full-text index on `title` for search.
- **Web:** Kanban/list toggle, keyboard-accessible cards, debounced search box, pagination/infinite scroll for large lists, `next/dynamic` for heavy boards.
- **Mobile:** Vertical list + swipe actions (status change), FAB for new task (matches original floater concept — but original design), same API.

**Hindi:** Buckets mein tasks ka group banta hai. User naya bucket banata hai, usme task daalta hai, date/assignee set karta hai. Sab kuch API se hoga taki mobile app bhi wahi use kar sake.

---

### 4.4 Sub-tasks & To-Do List 🟢 (`sub-task.svg`, `todolist.svg`)

- **Page name:** Sub-tasks (task ke andar chhote steps) + My To-Do List
- **Purpose:** Bade task ko chhote checkable steps mein toda jaye; personal to-do list se apna din plan ho. *English: Break work into checkable subtasks; personal daily list.*
- **User action:** (a) Task detail mein sub-task add/edit/tick kare; (b) apni to-do list mein items add kare, complete/delete kare; (c) sub-task ko due time de.
- **Expected result:** Parent task ka progress % auto-update ho; complete hone par strike-through + counter badle; list real-time refresh (ya optimistic update).
- **Dependencies:** Tasks API (nested), progress calculation, checkboxes a11y.
- **Possible API:** `POST /api/v1/tasks/:id/subtasks`, `PATCH /api/v1/subtasks/:id` (toggle done), `GET /api/v1/todos`, `POST /api/v1/todos`.
- **Possible DB:** `subtasks` (id, task_id, title, is_done, sort_order, due_at); `todos` (id, user_id, title, is_done, due_date, sort_order); index `(task_id)`, `(user_id, is_done, due_date)`.
- **Web:** Inline add-row, checkbox with keyboard support, progress bar token-based.
- **Mobile:** Checkbox rows with swipe-to-complete; list widget.

**Hindi:** Har bade task ke andar chhote kaam add hote hain. Unhe tick karte hi progress badhta hai. Alag se personal to-do list bhi hoti hai.

---

### 4.5 Team / Members 🟢 (`addteammember.svg`, `Add-teammember-step.svg`, `#addteam`, `.teamname`)

- **Page name:** Team Members (Members / Teams)
- **Purpose:** Organisation ke log add/manage karein, unhe teams aur roles dein, tasks assign kar sakein. *English: People management — invite, roles, teams.*
- **User action:** (a) Naya member add kare (name, email, role, team); (b) member edit/deactivate kare; (c) teams banaye (`teamname`); (d) member ki workload/profile dekhe.
- **Expected result:** Member list refresh, invite status dikhe; duplicate email par validation error; role ke hisaab se naya member sirf apna data dekhe (RBAC).
- **Dependencies:** Users API, roles/permissions matrix, teams API, email service (invite — future), appConfig.
- **Possible API:** `GET/POST/PATCH/DELETE /api/v1/members`, `GET/POST /api/v1/teams`, `POST /api/v1/members/:id/role`, `GET /api/v1/members/:id/workload`.
- **Possible DB:** `users` (role, status), `teams`, `team_members` (team_id, user_id); indexes on `(email UNIQUE)`, `(team_id)`.
- **Web:** Data table (sort/filter/pagination), modal form with validation, permission-gated actions (Admin hi delete kare).
- **Mobile:** Member list + detail screen; role changes only admin app se (same API, role checked server-side).

**Hindi:** Yahan team ke members add hote hain, unhe role milta hai, tabhi wo tasks assign/complete kar paate hain. Rights server par check honge, browser mein nahi.

---

### 4.6 Timesheet 🟢 (`timesheet.svg`, `timesheetsactivated.svg`, `#submittimesheet`, `#updatetimesheet`, `.tabletimesheet`)

- **Page name:** Timesheet (Weekly time entry)
- **Purpose:** User apna har din ka kaam-kitne ghante lagaye wo bhare; manager review/approve kare. *English: Log hours against tasks per day; submit for approval.*
- **User action:** (a) Week select kare; (b) rows (tasks) ke against daily hours bhare; (c) comment add kare; (d) **Submit** (`#submittimesheet`) ya revision ke baad **Update** (`#updatetimesheet`) kare; (e) manager approve/reject kare.
- **Expected result:** Totals (day/week) auto-calculate ho; submit ke baad lock state (edit disabled); status badge: Draft → Submitted → Approved/Rejected; validation — negative/huge hours reject.
- **Dependencies:** Tasks list (assignee ke), date/week utils, approval workflow, reports (ghante reports).
- **Possible API:** `GET /api/v1/timesheets?week=&user=`, `POST /api/v1/timesheets` (submit), `PATCH /api/v1/timesheets/:id` (update), `POST /api/v1/timesheets/:id/approve|reject`.
- **Possible DB:** `timesheet_entries` (id, user_id, task_id, week_start, date, hours, comment, status), index `(user_id, week_start)`, `(status)` for manager queues; CHECK constraint `hours BETWEEN 0 AND 24`.
- **Web:** Editable grid (desktop-first), sticky totals row, autosave draft, debounced save.
- **Mobile:** Per-day entry screen with numeric keypad; submit button; status history.

**Hindi:** Timesheet mein har employee batata hai ki usne kis task mein kitne ghante lagaye. Submit ke baad table lock ho jata hai; manager approve karta hai.

---

### 4.7 Attendance — Punch, Shifts, Geofencing, Leave 🟢 (`attendance.svg`, `Geofencing_n.svg`, `location.svg`, `Multipleshifts.svg`, `.punchIcon`, `.float_punchout`, `#addleavenotify`)

- **Page name:** Attendance (Punch In/Out + Shifts + Geofence + Leave)
- **Purpose:** Office timing track ho — kab aaya, kab gaya; location verify ho (geofence); shifts manage hon; leave apply/approve ho. *English: Time & attendance with location and shift rules.*
- **User action:** (a) **Punch In / Punch Out** button dabaye (dashboard widget ya dedicated page); (b) location permission de (geofence check); (c) shift select/dekh Multiple Shifts mode mein; (d) leave apply kare + manager approve/reject (`#addleavenotify` = leave ki notification); (e) apna monthly attendance summary dekhe.
- **Expected result:** Punch record save ho — timestamp + GPS (agar geofence ON) + device info; geofence ke bahar se punch par **warning/block**; shift ke hisaab se late/early/OT calculate ho; leave approved = calendar par leave color.
- **Dependencies:** Geolocation API (browser), location permission UX, shifts config (settings), holidays list, leave workflow, notifications.
- **Possible API:** `POST /api/v1/attendance/punch` (body: type=in|out, lat, lng, deviceId), `GET /api/v1/attendance?month=`, `GET/POST /api/v1/shifts`, `GET/POST /api/v1/leaves`, `POST /api/v1/leaves/:id/approve|reject`, `GET /api/v1/holidays`.
- **Possible DB:** `attendance_punches` (id, user_id, type, punched_at, lat, lng, geofence_ok, device, shift_id) index `(user_id, punched_at)`; `shifts` (name, start, end, grace_min, multi_shift flag); `geofences` (name, lat, lng, radius_m); `leaves` (user_id, from, to, type, status, approver_id); `holidays` (date, name).
- **Web:** Big accessible punch button with 3 states (In/Out/Disabled+reason), map-radius indicator, month grid summary; permission-denied fallback (manual punch with reason).
- **Mobile (critical):** Background location (sirf punch time par — battery friendly), push reminder "Punch in pending", offline punch queue → sync when online (timestamp client+server both).

**Hindi:** Employee ek button se punch in/out karta hai. GPS check hota hai ki wo office ke andar hai ya nahi (geofence). Shift ke hisaab se late/early hota hai. Leave apply karne par uski notification manager ko jaati hai. Mobile app same API use karegi.

---

### 4.8 Calendar 🟢 (`calendar.svg`, `calendar.css` — status colors)

- **Page name:** Calendar (Attendance + Task calendar, month/week view)
- **Purpose:** Ek view mein — har din ka attendance status (present/absent/late/leave/holiday/missed/half-day), tasks ki due dates, leaves, holidays. *English: Unified month view of attendance states + task/leave events.*
- **User action:** (a) Month/week navigate kare; (b) date click → us din ka detail (punch times, tasks due); (c) legend se filter kare; (d) event/task click → detail popup; (e) (assumed) manager team calendar dekhe.
- **Expected result:** Har din ka cell sahi color/status dikhaaye (palette **theme tokens** se — hardcoded original colors nahi); events load hone par loading state; empty/weekend states saaf.
- **Dependencies:** Attendance API, tasks API (due dates), holidays, leaves, chart/calendar component (custom ya well-known lib after approval).
- **Possible API:** `GET /api/v1/calendar?month=&user=` — combined events payload (attendance days + tasks + leaves + holidays), ya alag-alag endpoints with parallel fetch.
- **Possible DB:** Already-covered tables se read; calendar query index `(user_id, date)` on attendance, `(due_date)` on tasks; holidays index `(date)`.
- **Web:** Desktop-first month grid + sidebar day detail; keyboard navigation (arrows), screen-reader day labels (a11y).
- **Mobile:** Vertical day-list default (mobile par month grid chhota hota hai), pinch/switch to month grid; tap → day sheet.

**Hindi:** Calendar par har din ka rang batata hai — present, absent, late, chhutti. Saath mein us din ke tasks bhi dikhte hain. Colors theme system se aayengi, purani CSS copy nahi hogi.

---

### 4.9 Notice Board 🟢 (`noticeboard.svg`, `.noticeIcon`)

- **Page name:** Notice Board (Announcements)
- **Purpose:** Company/management sabko ek jagah message de — policy update, event, alert. *English: Organization-wide announcements.*
- **User action:** (a) Notices padhe (list + detail); (b) admin/manager naya notice publish kare (title, body, attach, audience, expiry); (c) read/unread mark kare; (d) important notice ko pin kare.
- **Expected result:** Publish hote hi (ya poll/refresh par) notice list mein dikhe; unread count badge update ho; expired notice hide/pin ho jaye.
- **Dependencies:** Auth roles (sirf authorized publish kare), rich text (basic markdown/plain — avoid heavy editor initially), notifications fan-out.
- **Possible API:** `GET /api/v1/notices?page=`, `POST /api/v1/notices`, `PATCH /api/v1/notices/:id`, `DELETE /api/v1/notices/:id`, `POST /api/v1/notices/:id/read`.
- **Possible DB:** `notices` (id, title, body, author_id, audience, pinned, expires_at, created_at), `notice_reads` (notice_id, user_id); indexes `(created_at DESC)`, `(expires_at)`.
- **Web:** Card/list layout with detail modal ya dedicated route, unread marker, pagination (badi lists ke liye).
- **Mobile:** List + detail screen; push notification for new notice (fan-out via notifications table).

**Hindi:** Notice board company ka notice-majboard hai. Sirf admin likh sakta hai, sab padh sakte hain. Naya notice aane par notification jaata hai.

---

### 4.10 Reports 🟢 (`reports.svg`, `reportnew.png`, `charticon.png`, `.reports`, `.searchReports`, datatables lib)

- **Page name:** Reports (Analytics)
- **Purpose:** Management ko numbers dein — task completion, attendance %, timesheet hours, team performance. Filter + export. *English: Aggregated reporting with filters and export.*
- **User action:** (a) Report type chune (attendance/tasks/timesheet/team); (b) date range + filters (user, team, status) lagaye; (c) charts/table dekhe; (d) search within report (`.searchReports`); (e) export CSV/PDF (datatable export lib pehle thi).
- **Expected result:** Filters ke saath data re-render (loading skeleton); empty result = friendly message; export file download ho; large data pagination ke saath.
- **Dependencies:** Aggregation APIs, chart components (lazy-loaded), CSV/PDF export (server-side preferred), permission (sirf apna/ team data).
- **Possible API:** `GET /api/v1/reports/attendance?from=&to=&userId=`, `GET /api/v1/reports/tasks?...`, `GET /api/v1/reports/timesheet?...`, `GET /api/v1/reports/export?type=csv`.
- **Possible DB:** SQL aggregation queries (SUM/AVG/COUNT) + **indexes** (attendance `(user_id, date)`, timesheet `(user_id, week_start)`, tasks `(status, completed_at)`); bade reports ke liye DB views; pagination/limit mandatory.
- **Web:** Desktop-first dashboard of charts; server-side filtering; `dynamic import` for chart libs (code splitting); debounced filters (250–400 ms).
- **Mobile:** Simplified report cards + horizontal-scroll charts; export = share sheet (server-generated file link).

**Hindi:** Reports page par manager dekhta hai ki team ne kitna kaam kiya, kitni attendance rahi. Sab filter hota hai date aur naam se. Export bhi kar sakte hain.

---

### 4.11 Item List 🟢 (`ItemList.svg`, `.select-items`)

- **Page name:** Item List (Custom item/asset master)
- **Purpose:** Business ke items (products/assets/records) ki master list — jo tasks/teams se related hon. Exact domain **unknown** (open question). *English: Master list of business items with CRUD.* 🟡 semantics assumed, CRUD confirmed by icon + `select-items` (dropdown selectors elsewhere reuse this list).
- **User action:** (a) Items ki list dekhe (search/filter/paginate); (b) naya item add/edit/delete (admin); (c) item ko dropdown selectors mein use kare (tasks/notices ke fields).
- **Expected result:** CRUD ke baad list refresh + validation errors inline; search debounced; bada dataset paginate ho.
- **Dependencies:** Generic CRUD API pattern, table component, permissions, search API.
- **Possible API:** `GET /api/v1/items?page=&q=&sort=`, `POST /api/v1/items`, `PATCH /api/v1/items/:id`, `DELETE /api/v1/items/:id`.
- **Possible DB:** `items` (id, name, code, attributes JSONB, status, created_at) + GIN index on `JSONB`, trigram/GIN search index on `name`, index `(status, name)`.
- **Web:** Reusable DataTable (sort/filter/pagination) + modal form — same component Settings/Reports mein reuse hoga.
- **Mobile:** List + form screen; pull-to-refresh; infinite scroll.

**Hindi:** Item list ek master record hai (jaise company ke saare assets ya products). Iska exact matlab client se confirm karna hai — but structure simple CRUD hoga jo har jagah reuse ho.

---

### 4.12 Notifications 🟢 (`bell_icon_withoutnoti.svg`, `externalnotification.svg`, `externalnotification_disable.svg`, `Notification-step.svg`)

- **Page name:** Notifications (In-app bell + External notifications)
- **Purpose:** User ko bataye — naya task assign hua, notice aya, leave approve hui, reminder. **External** = email/SMS/WhatsApp/webhook toggle (`externalnotification*.svg` se dono ON/OFF states confirm). *English: In-app notification center + external channel toggles.*
- **User action:** (a) Bell icon par click → dropdown/list; (b) notification padh kar related page par jaaye; (c) mark-all-read; (d) settings mein external channels ON/OFF kare; (e) (assumed) per-event preferences chune.
- **Expected result:** Bell par live unread badge; click → deep link (task/notice/leave); unread → read state persist ho; external toggle turant save ho.
- **Dependencies:** Notifications API, deep-link routing, real-time strategy (WebSocket/SSE later — Phase pehle polling), settings API, external provider integration (email/SMS — future).
- **Possible API:** `GET /api/v1/notifications?unread=true&page=`, `POST /api/v1/notifications/:id/read`, `POST /api/v1/notifications/read-all`, `GET/PUT /api/v1/settings/notifications`.
- **Possible DB:** `notifications` (id, user_id, type, payload JSONB, read_at, created_at) index `(user_id, read_at, created_at DESC)`; `notification_prefs` (user_id, channel, enabled).
- **Web:** Bell dropdown + dedicated page; **avoid unnecessary polling** — refresh on focus/navigation only (documented perf rule); later SSE.
- **Mobile:** Push notifications (FCM) → deep link; notification inbox screen; same read/unread APIs.

**Hindi:** Bell icon par click karke user dekhta hai ki kya naya hua. External notification matlab email ya SMS bhejna — uska toggle settings mein hota hai. Pehle sirf polling ya refresh, baad mein real-time.

---

### 4.13 Settings 🟢 (`Setting.svg`)

- **Page name:** Settings (Organisation / System settings)
- **Purpose:** System ke rules configure kare — shifts, geofence, holidays, notification channels, language, roles, integrations, brand. *English: Admin configuration hub.*
- **User action:** (a) Sections navigate kare (General, Attendance/Shifts, Geofence, Notifications, Integrations, Roles); (b) values edit karke Save kare; (c) geofence radius map par set kare; (d) shifts (incl. multiple shifts) define kare; (e) external notification channels toggle kare.
- **Expected result:** Section-wise forms with validation; save success toast; risky changes par confirm dialog; non-admin ke liye read-only/403.
- **Dependencies:** Auth RBAC, settings API, map component (geofence), shifts CRUD, appConfig (brand display).
- **Possible API:** `GET /api/v1/settings`, `PATCH /api/v1/settings`, `GET/POST/PATCH/DELETE /api/v1/settings/shifts`, `GET/POST /api/v1/settings/geofences`, `GET/POST /api/v1/settings/holidays`.
- **Possible DB:** `settings` (key JSONB per org/user), `shifts`, `geofences`, `holidays`; index on `key`; audit log table for changes (recommended).
- **Web:** Two-pane settings layout (left section nav + right form) — desktop-first; unsaved-changes guard.
- **Mobile:** Section list → form screens; map/geofence editor optimized for touch (radius slider).

**Hindi:** Settings mein admin decide karta hai ki office kitne baje se hai, geofence kitne meter ka hai, email notification on hai ya nahi. Sab server par save hota hai.

---

### 4.14 Profile 🟢 (`.profile-detail`, `default.jpg` avatar, `star.svg` favorites?)

- **Page name:** My Profile (User profile)
- **Purpose:** Apni info dekhe/sambhale — name, photo, contact, language, password, apne stats. *English: Self-service profile management.*
- **User action:** (a) Profile detail dekhe; (b) photo/name/phone update kare; (c) password change kare; (d) apni language select kare; (e) (assumed) apne tasks/attendance snapshot dekhe.
- **Expected result:** Save ke baad header/sidebar mein naya naam/photo turant dikhe (session refresh); password change par re-auth + sessions revoke option.
- **Dependencies:** Auth API, file upload (avatar — server storage), i18n, theme (profile page themed).
- **Possible API:** `GET/PATCH /api/v1/me`, `POST /api/v1/me/avatar` (multipart), `POST /api/v1/me/change-password`.
- **Possible DB:** `users` columns update; `audit_log` entry; avatar path in row (file object storage par).
- **Web:** Form with client + server validation, image crop (optional), accessible labels.
- **Mobile:** Same APIs; camera/gallery se photo upload; secure storage for session.

**Hindi:** Profile page par user apni photo, naam, password badal sakta hai. Password badalne par dobara login dena pad sakta hai (security).

---

### 4.15 Language / i18n 🟢 (`.language`, `.languageLink` in dashboard.css; Hindi demo video)

- **Page name:** Language switcher (header control, not a full page)
- **Purpose:** UI ki bhasha badlo — **English + Hindi** (demo video "Hindi Demo" hai, isliye Hindi confirmed zaroori). *English: Runtime language switching.*
- **User action:** Header mein language dropdown khole → English/Hindi chune.
- **Expected result:** Saare labels turant nayi bhasha mein dikhein (ya soft reload); choice persist ho (localStorage + user profile); date/number formats bhi locale ke hisaab se.
- **Dependencies:** i18n dictionary files (`en.json`, `hi.json`), locale-aware date lib, appConfig default locale.
- **Possible API:** `PATCH /api/v1/me { language }` (profile par persist); dictionaries static — API se nahi.
- **Possible DB:** `users.language` column (default 'en').
- **Web:** Client-side dictionary swap without full reload; `<html lang>` update; missing-key fallback = English.
- **Mobile:** Same dictionaries (shared JSON) + OS-level override support (react-native i18n later).

**Hindi:** User dropdown se Hindi/English select karega, poora UI badal jayega. Dictionary files common rahengi web aur mobile dono ke liye.

---

### 4.16 Global Search 🟢 (navbar search in template + `search` occurrences, `.searchReports`)

- **Page name:** Global Search (header search)
- **Purpose:** Tasks, members, notices, items — sab kuch ek jagah dhundo bina navigation ke. *English: Cross-module search with debouncing.*
- **User action:** Search box mein type kare (min 2–3 chars) → grouped suggestions dikhe → result par click → us page par land kare.
- **Expected result:** **Debounced** (250–400 ms) requests; loading state; no duplicates (previous request cancel/ignore); empty + error states; keyboard navigation (↑↓ + Enter); result click ke baad box clear.
- **Dependencies:** Search API (or per-module `q=` params), command-palette component, debounce util, auth scope (sirf apna data).
- **Possible API:** `GET /api/v1/search?q=&types=tasks,members,notices,items&limit=10` — ek consolidated endpoint (recommended) ya per-module search.
- **Possible DB:** Postgres full-text search (`tsvector` + GIN) on `tasks.title`, `notices.title`, `items.name`; `pg_trgm` for prefix matching; result LIMIT mandatory.
- **Web:** Command-palette style overlay (Ctrl+K optional), `role="combobox"` a11y, request cancellation via AbortController.
- **Mobile:** Search screen (top bar tap) with sectioned results; same endpoint.

**Hindi:** Search box mein likhte hi suggestions aayenge — 0.3 second ruk kar (debounce) taaki har letter par server par load na pade. Sirf wahi data dikhega jiska dekhne ka user ko haq hai.

---

### 4.17 Help & Onboarding Tour 🟢 (`Help.svg`, intro.js + 4 step SVGs)

- **Page name:** Help (product tour / getting started)
- **Purpose:** Naye user ko guided tour — (1) Bucket add karo, (2) Task add karo, (3) Team member add karo, (4) Notifications dekho. *English: Step-by-step first-run tour + help links.*
- **User action:** Help icon → tour start kare → steps "Next/Finish" kare; (assumed) help links/FAQ dekhe.
- **Expected result:** Overlay highlight har step par; tour complete hone par flag save ho (dobara na dikhe); user turant "Skip" kar sake; mobile par bottom-sheet style steps.
- **Dependencies:** Tour library (ya original custom stepper — UI original hona chahiye), `onboarding_completed` flag API, feature tour placement selectors.
- **Possible API:** `GET/PATCH /api/v1/me { onboardingCompleted }`.
- **Possible DB:** `users.onboarding_completed` boolean.
- **Web:** Non-blocking overlay, keyboard accessible, focus trap, reduced-motion respected.
- **Mobile:** Native step cards/skippable carousel; same flag.

**Hindi:** Pehli baar login par user ko 4 step sikhaye jaate hain — bucket, task, team member, notification. Uske baad tour band ho jaata hai.

---

### 4.18 Live Chat 🟢 but OPTIONAL/PHASE-LATER (`smallchat.css/js`, groups, `chaticon_nonpremium.png`, `teamvideo`, `Mp3LameEncoder` audio notes, `footerwhatsapp.png`)

- **Page name:** Chat (team chat widget — "nonpremium" icon se limited/paid feature lagta hai)
- **Purpose:** Team members real-time baat karein — groups, contacts (online/away/busy), audio notes; WhatsApp footer link = support channel. *English: In-app messaging.*
- **User action:** Chat icon → panel khole → group banaye/choose kare → message/audio bheje.
- **Expected result:** Messages deliver/read status; presence (online/away/busy) dikhe.
- **Dependencies:** Real-time transport (WebSocket), presence service, media storage (audio), moderation — **high complexity**.
- **Possible API:** `GET /api/v1/chat/conversations`, `GET/POST /api/v1/chat/messages`, WS channel `ws:/chat`.
- **Possible DB:** `conversations`, `conversation_members`, `messages` (id, conv_id, sender, body, audio_url, read_at) index `(conversation_id, created_at)`.
- **Web / Mobile:** Real-time client (ws), background sync, media upload.
- **Recommendation:** **MVP se bahar rakhein** (Phase 5+). Notice board + notifications se basic communication cover ho jata hai.

**Hindi:** Chat ka feature dikhta hai lekin ye complex hai (real-time, online status). Isliye pehle chhod kar baad mein — business zaroorat confirm karke.

---







## 5. Cross-Cutting Requirements / साझा आवश्यकताएँ

### 5.1 Non-functional (performance — spec se)
| Requirement | Kaise pura hoga |
|---|---|
| Code splitting | Route-level `next/dynamic` for heavy widgets (charts, board, calendar) |
| Lazy loading | Images via `next/image`, below-fold sections defer |
| Pagination | Har list API `page&limit` (default 20–50), no unbounded queries |
| Debounced search | 250–400 ms + AbortController (search, filters) |
| Duplicate API avoidance | Central `apiClient` + per-key request de-dup / SWR-style cache |
| No unnecessary polling | Notifications: refresh on focus/route change only; SSE later |
| Efficient DB queries | Indexes (neeche), `EXPLAIN ANALYZE` review, no SELECT * |
| Minimal client JS | Server Components default; `"use client"` sirf interactive parts |
| Reusable components | Button/Card/Table/Modal/Form/Tokens — theme-aware |

### 5.2 Security (spec se)
- Postgres credentials **sirf server-side** (`.env`, kabhi `NEXT_PUBLIC_*` nahi).
- Browser/Mobile → **sirf REST API**; DB kabhi direct nahi.
- Password hashing (bcrypt/argon2), JWT + refresh rotation, HTTP-only cookies (web).
- RBAC middleware har protected API par; rate limiting on auth + search.
- Validation har input par; XSS-safe rendering (no raw HTML in notices initially).

### 5.3 Accessibility & Responsive
- Desktop-first, mobile-ready: sidebar → drawer (tablet) → bottom nav (mobile).
- Keyboard navigable tables/forms, visible focus (theme `--color-focus`), ARIA labels, color contrast ≥ 4.5:1 har theme mein.

---

## 6. Key Workflows (summary) / मुख्य वर्कफ़्लो

1. **Task workflow:** Bucket create → Task add (title/date/assignee) → Sub-tasks → Status change → Due/overdue reminders → Reports mein completion.
2. **Attendance workflow:** Shift assign → Punch In (geofence check) → Work → Punch Out → Calendar/attendance summary → Late/absent rules → Report.
3. **Timesheet workflow:** Week entry → Draft autosave → Submit → Manager approve/reject → Locked → Report hours.
4. **Leave workflow:** Apply → Notification to approver → Approve/reject → Calendar mark → External notify (optional).
5. **Notice workflow:** Admin composes → Publish → Fan-out notifications → Users read → Read receipts.
6. **Onboarding workflow:** First login → 4-step tour → `onboarding_completed` flag.

---

## 7. Open Questions / Unknowns ❓

| # | Question | Kyun zaroori |
|---|----------|--------------|
| 1 | **Item List** ka exact domain (assets? products? inventory?) | Table design + fields |
| 2 | Roles kitne? (Admin/Manager/Employee?) aur permission matrix | RBAC rules |
| 3 | Multi-tenant (ek se zyada company) ya single organisation? | DB schema (`org_id`) |
| 4 | Languages: sirf EN+HI ya aur? | i18n dictionary scope |
| 5 | Chat feature chahiye ya nahi (premium tha)? | Phase plan |
| 6 | Geofence rule: block karna hai ya warn? Radius kaun set kare? | Attendance logic |
| 7 | Real-time strategy: SSE/WebSocket kab? (Phase 1 mein focus-refresh) | Infra cost |
| 8 | External notifications: email/SMS/WhatsApp kaunsa provider? | Integration effort |
| 9 | Reports ki exact list (konse KPI managers ko chahiye)? | Aggregation queries |
| 10 | Timesheet approval kaun karega — direct manager ya admin? | Workflow flags |
| 11 | Demo videos (2) ka detailed walkthrough — koi module miss ho raha hai? | Scope completeness |
| 12 | Firebase/FCM push for mobile — account available? | Mobile notifications |

> In answers ke bina bhi Phase 1 (scaffold + auth + theme) start ho sakta hai — decisions mostly schema/workflow ko affect karti hain.

---

**End of REFERENCE_ANALYSIS.md** → Next: [`PAGE_MAP.md`](./PAGE_MAP.md) · [`FEATURE_MATRIX.md`](./FEATURE_MATRIX.md) · [`WEB_MOBILE_ARCHITECTURE.md`](./WEB_MOBILE_ARCHITECTURE.md)

