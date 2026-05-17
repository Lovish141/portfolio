import type { Metadata, Viewport } from 'next';
import { Fraunces, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  axes: ['opsz', 'SOFT'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://lovish.dev'),
  title: {
    default: 'Lovish Sharma — Full-stack engineer',
    template: '%s — Lovish Sharma',
  },
  description:
    'Full-stack engineer based in Bangalore, building search and discovery at Microchip. Selected work, experience, and contact.',
  keywords: ['Lovish Sharma', 'full-stack engineer', 'Next.js', 'React', 'TypeScript', 'Microchip', 'Bangalore', 'portfolio'],
  authors: [{ name: 'Lovish Sharma', url: 'https://lovish.dev' }],
  creator: 'Lovish Sharma',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://lovish.dev',
    siteName: 'Lovish Sharma',
    title: 'Lovish Sharma — Full-stack engineer',
    description:
      'Full-stack engineer based in Bangalore. Selected work, experience, and contact.',
    images: [
      { url: '/og.png', width: 1200, height: 630, alt: 'Lovish Sharma — Full-stack engineer' },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@LovishS08693875',
    title: 'Lovish Sharma — Full-stack engineer',
    description: 'Full-stack engineer based in Bangalore.',
    images: ['/og.png'],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://lovish.dev' },
};

export const viewport: Viewport = {
  themeColor: '#0a0908',
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'dark',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} ${mono.variable}`}>
      <body className="antialiased">
        <a href="#main" className="skip-link">Skip to content</a>
        {children}
      </body>
    </html>
  );
}
