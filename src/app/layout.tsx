import './globals.css';
import type { Metadata, Viewport } from 'next';
import ClientShell from '@/components/layout/ClientShell';
import Script from 'next/script';

export const metadata: Metadata = {
  title: {
    default: 'WatchCrew — Track Your Anime Journey',
    template: '%s | WatchCrew',
  },
  description:
    'Track anime episodes, earn XP, unlock achievements, and compete with friends. The ultimate anime tracking experience, gamified.',
  keywords: [
    'anime tracker',
    'anime list',
    'episode tracker',
    'anime achievements',
    'anime leaderboard',
    'watchcrew',
    'otaku',
    'anime social',
  ],
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'WatchCrew',
  },
  openGraph: {
    type: 'website',
    siteName: 'WatchCrew',
    title: 'WatchCrew — Track Your Anime Journey',
    description:
      'Track anime episodes, earn XP, unlock achievements, and compete with friends.',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WatchCrew — Track Your Anime Journey',
    description:
      'Track anime episodes, earn XP, unlock achievements, and compete with friends.',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icons/icon-192x192.svg', sizes: '192x192', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/icons/icon-152x152.svg', sizes: '152x152' },
      { url: '/icons/icon-192x192.svg', sizes: '192x192' },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: '#00F0FF',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[99999] focus:px-4 focus:py-2 focus:rounded focus:bg-[#00F0FF] focus:text-[#06060B] focus:font-bold focus:text-sm focus:outline-2 focus:outline-offset-2 focus:outline-[#00F0FF]"
        >
          Skip to main content
        </a>
        <ClientShell>{children}</ClientShell>
        <Script
          id="sw-register"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                  navigator.serviceWorker.register('/sw.js').catch(() => {});
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
