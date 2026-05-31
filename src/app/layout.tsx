import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { SITE } from '@/lib/site';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: 'JMVC Ads AI — Crea campañas de Meta, Google y TikTok Ads con IA',
    template: '%s · JMVC Ads AI',
  },
  description: SITE.shortDescription,
  applicationName: SITE.name,
  keywords: [
    'inteligencia artificial para campañas publicitarias',
    'crear anuncios con IA',
    'automatizar campañas publicitarias',
    'IA para Meta Ads',
    'IA para Google Ads',
    'IA para TikTok Ads',
    'software para crear campañas publicitarias',
    'plataforma de marketing con IA',
    'herramienta de publicidad digital con IA',
    'campañas publicitarias para ecommerce',
    'automatización de marketing digital',
    'JMVC Ads AI',
    'jmvcapp.com',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: SITE.locale,
    url: SITE.url,
    siteName: SITE.name,
    title: 'JMVC Ads AI — Crea campañas de Meta, Google y TikTok Ads con IA',
    description: SITE.shortDescription,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'JMVC Ads AI — Plataforma de IA para campañas publicitarias',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: SITE.twitter,
    title: 'JMVC Ads AI — Crea campañas de Meta, Google y TikTok Ads con IA',
    description: SITE.shortDescription,
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.webmanifest',
};

export const viewport: Viewport = {
  themeColor: SITE.themeColor,
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={inter.variable} suppressHydrationWarning>
      <body className="min-h-screen bg-bg text-white antialiased">
        {/* Skip link para accesibilidad. */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-white"
        >
          Saltar al contenido principal
        </a>
        {children}
      </body>
    </html>
  );
}
