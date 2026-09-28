import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { ThemeProvider } from '@/theme';
import { APP_FAVICON, APP_NAME, APP_TAGLINE } from '@/config/appConfig';
import './globals.css';
import '@/theme/theme.css';

/**
 * Root layout — poore web app ka wrapper.
 * - Brand (title/description/logo) SIRF appConfig se aata hai.
 * - ThemeProvider theme switching + localStorage persistence sambhalta hai
 *   (src/theme/ThemeProvider.tsx). Login/auth is phase mein nahi hai.
 */
export const metadata: Metadata = {
  title: {
    default: `${APP_NAME} | ${APP_TAGLINE}`,
    template: `%s | ${APP_NAME}`,
  },
  description: APP_TAGLINE,
  icons: { icon: APP_FAVICON },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    // suppressHydrationWarning: theme ka data-theme attribute
    // client par load hone ke baad lagta hai — hydration warning avoid.
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
