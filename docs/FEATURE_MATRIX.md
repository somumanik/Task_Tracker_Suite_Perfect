# FEATURE_MATRIX.md — Feature × (Web / API / DB / Mobile) Matrix (Phase 0)

> Har feature ka: source of discovery, priority, aur platform coverage.
> Legend: ✅ Planned · ⏳ Later phase · ❓ Needs confirmation · 🔒 = server-side only (RBAC)

**Priority:** P0 = MVP, P1 = MVP ke turant baad, P2 = later, P3 = optional/confirm

| # | Feature | Source (evidence) | P | Web UI | REST API (v1) | DB (PostgreSQL) | Mobile (RN/Expo) | Notes |
|---|---------|-------------------|---|--------|----------------|------------------|------------------|-------|
| 1 | Login / session | 🟡 assumed | P0 | `/login` form | `POST /auth/login`, `/refresh`, `/logout`, `GET /auth/me` | `users`, `sessions` | Secure token storage | JWT + HttpOnly cookie (web) |
| 2 | Roles & permissions (RBAC) | 🟡 assumed | P0 | Role-gated menus | middleware + per-route checks | `users.role` | Same gating | 🔒 Admin/Manager/Employee — matrix ❓ |
| 3 | Dashboard overview | 🟢 `newdashboard.svg` | P0 | Widgets grid | `GET /dashboard/summary` | Aggregate queries + indexes | Home screen | Charts lazy-loaded |
| 4 | Buckets CRUD | 🟢 `addbucket.svg` | P0 | Board sections | `/buckets` CRUD | `buckets` | List + add sheet | sort_order |
| 5 | Tasks CRUD + status/priority/due | 🟢 `addtasknew.png`, `.dueDate*` | P0 | Cards/list/FAB | `/tasks` CRUD + filters + page | `tasks` + indexes | Swipe actions | Optimistic UI |
| 6 | Task assign | 🟢 `.assignIcon` | P0 | Member picker | `PATCH /tasks/:id` | `tasks.assignee_id` | Same | 🔒 scope check |
| 7 | Sub-tasks + progress | 🟢 `sub-task.svg` | P1 | Task detail checklist | `/tasks/:id/subtasks` | `subtasks` | Checkbox rows | Auto progress % |
| 8 | Personal To-Do list | 🟢 `todolist.svg` | P1 | `/todos` | `/todos` CRUD | `todos` | List + FAB | Separate from tasks |
| 9 | Quick-add task floater | 🟢 `#addtaskfloater` | P0 | FAB + mini form | `POST /tasks` | `tasks` | FAB | Same API |
| 10 | Team members CRUD | 🟢 `addteammember.svg`, `#addteam` | P0 | Table + modal | `/members`, `/teams` | `users`, `teams`, `team_members` | Admin screens | 🔒 Admin only |
| 11 | Timesheet entry (week grid) | 🟢 `#submittimesheet` | P0 | Editable grid | `GET/POST/PATCH /timesheets` | `timesheet_entries` | Per-day entry | Draft autosave |
| 12 | Timesheet approval | 🟢 workflow implied | P1 | Manager queue | `POST /timesheets/:id/approve\|reject` | `status` column | Approval screen | 🔒 Manager+ |
| 13 | Punch In/Out | 🟢 `.punchIcon`, `.float_punchout` | P0 | Button (dashboard+page) | `POST /attendance/punch` | `attendance_punches` | Widget + offline queue | 3 states |
| 14 | Geofencing | 🟢 `Geofencing_n.svg`, `location.svg` | P1 | Radius settings + map | punch payload + `/settings/geofences` | `geofences` | Location at punch time | Block vs warn ❓ |
| 15 | Multiple shifts | 🟢 `Multipleshifts.svg` | P1 | Shift settings | `/settings/shifts` | `shifts` | Shift display | Config-driven |
| 16 | Leave apply/approve | 🟢 `#addleavenotify` | P1 | Form + approval list | `/leaves` CRUD+approve | `leaves` | Apply screen | Notify approver |
| 17 | Holidays | 🟢 calendar.css `holiday` | P1 | Settings + calendar | `/holidays` | `holidays` | Calendar view | Admin managed |
| 18 | Attendance calendar | 🟢 `calendar.svg`, status colors | P0 | Month grid + legend | `GET /calendar` | reads attendance/leaves/holidays | Day-list + month | Colors = theme tokens |

| 19 | Notice board | 🟢 `noticeboard.svg`, `.noticeIcon` | P0 | List + detail + publish | `/notices` CRUD + read | `notices`, `notice_reads` | List + detail | 🔒 publish = admin |
| 20 | Notifications (in-app) | 🟢 bell icons, step SVG | P0 | Bell dropdown + page | `/notifications` list/read | `notifications` | Inbox + badge | No constant polling |
| 21 | External notifications (email/SMS) | 🟢 `externalnotification*.svg` | P2 | Settings toggles | `/settings/notifications` | `notification_prefs` | Same | Provider ❓ |
| 22 | Reports (attendance/tasks/timesheet) | 🟢 `reports.svg`, charticon | P1 | Charts + table + export | `/reports/*` | Aggregates + indexes + views | Simplified cards | Server-side pagination |
| 23 | Report export CSV/PDF | 🟢 datatables export libs | P2 | Download button | `/reports/export` | — (stream query) | Share link | Server-generated |
| 24 | Item list (master CRUD) | 🟢 `ItemList.svg`, `.select-items` | P1 | DataTable + modal | `/items` CRUD | `items` (+JSONB, GIN) | List/form | Domain ❓ |
| 25 | Global search | 🟢 navbar search | P1 | Command palette overlay | `GET /search` | FTS (tsvector/GIN) + trgm | Search screen | Debounced + abortable |
| 26 | Language switcher EN/HI | 🟢 `.languageLink`, Hindi demo | P0 | Topbar dropdown | `PATCH /me {language}` | `users.language` | Same | Static dictionaries |
| 27 | Profile edit + avatar | 🟢 `.profile-detail` | P0 | Profile form | `GET/PATCH /me`, `/me/avatar` | `users` columns | Profile screen | Multipart upload |
| 28 | Password change | 🟡 assumed | P0 | Profile → security | `POST /me/change-password` | `password_hash` | Same | Re-auth + session revoke |
| 29 | Settings hub (general/notify) | 🟢 `Setting.svg` | P0 | Two-pane settings | `GET/PATCH /settings` | `settings` JSONB | Section screens | 🔒 Admin |
| 30 | Onboarding tour (4 steps) | 🟢 intro.js + step SVGs | P1 | Custom stepper overlay | `PATCH /me {onboardingCompleted}` | `users.onboarding_completed` | Skippable carousel | Original animation |
| 31 | Help page | 🟢 `Help.svg` | P2 | Help + tour trigger | — (static + flag) | — | Same | |
| 32 | Favorites/star | 🟢 `star.svg` ❓ | P3 | Star on tasks/notices | `PATCH /tasks/:id {starred}` | `tasks.starred`/join table | Same | Confirm need |
| 33 | Live chat (groups, audio) | 🟢 smallchat, nonpremium icon | P3 | Float panel | `/chat/*` + WebSocket | `conversations`, `messages` | Full chat screens | MVP se bahar — confirm |
| 34 | WhatsApp support link | 🟢 `footerwhatsapp.png` | P2 | Footer link | — | — | Deep link | External URL |
| 35 | Audit log | 🟡 best practice | P2 | (admin view) | — | `audit_log` | — | Settings/member changes |

---

## Coverage Summary / कवरेज सारांश

| Platform | P0 | P1 | P2+ | Total |
|---|---|---|---|---|
| Web (Next.js) | 14 | 11 | 10 | 35 |
| REST API | 14 | 11 | 10 | 35 (same endpoints — **single source of truth**) |
| PostgreSQL | 14 | 11 | 10 | schema per table above |
| Mobile (future RN/Expo) | sab P0/P1 features same API se | — | chat/maps enhanced | ~26 screens |

**Key principle:** Koi bhi business rule (validation, RBAC, calculations) **API layer par** likha jayega — na web page par, na mobile screen par. Isi liye matrix ka API column dono platforms ka common contract hai.

**Hindi:** Table se saaf hai — har feature ke saamne 4 column hain: web par kya dikhega, API kaunsa, database mein kaunsi table, mobile par kya. API column dono apps ka contract hai; usme badlav tabhi jab feature badle.

---

**Next:** [`WEB_MOBILE_ARCHITECTURE.md`](./WEB_MOBILE_ARCHITECTURE.md)

