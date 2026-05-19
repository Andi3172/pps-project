import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Povestea Pietei Romane | Istoria Ascunsa a Bucurestiului',
  description:
    'Descopera istoria ascunsa a Pietei Romane din Bucuresti. O harta interactiva cu povesti, fapte istorice si contributii ale comunitatii.',
  keywords: ['Piata Romana', 'Bucuresti', 'istorie', 'harta interactiva', 'ASE'],
  authors: [{ name: 'Povestea Pietei Romane' }],
  openGraph: {
    title: 'Povestea Pietei Romane',
    description: 'Descopera istoria ascunsa a orasului.',
    type: 'website',
    locale: 'ro_RO',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#6366f1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ro" className={inter.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
