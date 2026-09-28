/**
 * ============================================================
 * appConfig.ts — CENTRALIZED APPLICATION CONFIGURATION
 *
 * PURPOSE: Yahan par brand aur app-level settings define hoti hain.
 *   Koi bhi component/page brand name hard-code NAHI karega —
 *   APP_NAME, tagline, logo, favicon SIRF yahan se aayenge.
 *
 * PAGE USAGE: Har page/layout (header, sidebar, login, footer,
 *   document metadata) imports this config.
 *
 * USER ACTION: End user ye file nahi dekhta; brand change karne
 *   par sirf ye file edit karni hoti hai (code-wide change nahi).
 *
 * DATA SOURCE: Static constants + environment variables
 *   (env sirf deployment-specific cheezon ke liye).
 *
 * API / DB ROLE: Ye file client aur server dono par import safe hai —
 *   isme koi secret nahi hai. Database credentials IS file mein
 *   kabhi nahi aayenge (wo sirf server-side .env mein).
 *
 * AUTH: Iska koi direct auth role nahi; login/logout pages sirf
 *   yahan se brand text/logo padhte hain.
 *
 * ERROR HANDLING: Missing env par sensible fallback defaults hain,
 *   isliye build kabhi crash nahi hota.
 *
 * MOBILE: Future React Native/Expo app bhi isi config ko import
 *   karegi (ya config ki values API se laayegi) — brand same rahega.
 * ============================================================
 */

/** App ka poora brand naam — UI ke titles/headings mein use hota hai. */
export const APP_NAME = 'YOUR BRAND NAME';

/** Chhota naam (favicon/compact header/mobile ke liye). */
export const APP_SHORT_NAME = 'Task Tracker';

/** Tagline — login screen aur marketing metadata par. */
export const APP_TAGLINE = 'Smart Task Management for Teams';

/**
 * Logo path — /public folder ke andar ka original asset.
 * Reference site ka logo BILKUL copy nahi karna.
 * Example: '/images/logo.svg'
 */
export const APP_LOGO = '/images/logo.svg';

/** Favicon path — /public folder ke andar (SVG favicon, original asset). */
export const APP_FAVICON = '/images/favicon.svg';

/** Default language (i18n dictionary key). 'en' | 'hi' */
export const DEFAULT_LOCALE = 'en';

/** Supported locales — language switcher isi se bind hota hai. */
export const SUPPORTED_LOCALES = ['en', 'hi'] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];

/** Default theme id — src/theme/themes.ts mein defined. */
export const DEFAULT_THEME_ID = 'ocean';

/**
 * REST API base path — web aur mobile dono isi prefix ko call karte hain.
 * (Versioning se future mobile app purane endpoints par stuck nahi hoga.)
 */
export const API_BASE_PATH = '/api/v1';

/**
 * Public API base URL — mobile app ke liye (web ke liye relative enough).
 * NEXT_PUBLIC_* hi browser/client ko expose hota hai; secrets kabhi nahi.
 */
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? '';

/** Pagination default — har list API isi limit se shuru hoti hai. */
export const DEFAULT_PAGE_SIZE = 20;

/** Search debounce (ms) — performance rule: har keystroke par request nahi. */
export const SEARCH_DEBOUNCE_MS = 300;

/** Feature flags — optional modules ko yahan se on/off kiya ja sakta hai. */
export const FEATURES = {
  chat: false, // Chat premium/complex tha — confirm karke baad mein enable
  geofencing: true,
  externalNotifications: false, // email/SMS provider confirm hone par
  reportsExport: true,
} as const;

/** App-wide config object (default export convenience). */
const appConfig = {
  APP_NAME,
  APP_SHORT_NAME,
  APP_TAGLINE,
  APP_LOGO,
  APP_FAVICON,
  DEFAULT_LOCALE,
  SUPPORTED_LOCALES,
  DEFAULT_THEME_ID,
  API_BASE_PATH,
  API_BASE_URL,
  DEFAULT_PAGE_SIZE,
  SEARCH_DEBOUNCE_MS,
  FEATURES,
} as const;

export default appConfig;
