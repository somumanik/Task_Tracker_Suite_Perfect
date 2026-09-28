/**
 * theme/index.ts — barrel exports.
 * Bahar se sirf `@/theme` import karo, andar ki file structure
 * kabhi directly import mat karo (refactor-safe).
 */

export { ThemeProvider, useTheme } from './ThemeProvider';
// ThemeSelector ek UI component hai — spec ke hisaab se components/theme/ mein.
export { ThemeSelector } from '@/components/theme/ThemeSelector';
export {
  THEMES,
  DEFAULT_THEME_ID,
  getThemeById,
  colorsToCssVars,
  type ThemeColors,
  type ThemeDefinition,
} from './themes';
export * as tokens from './tokens';
