import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Avatar AI — Conversations that feel alive',
  description:
    'Real-time, interactive 3D talking avatars powered by Kimi (Moonshot AI) and ElevenLabs voice synthesis.',
  metadataBase: new URL('https://talking-aiavatar-landing.vercel.app'),
  openGraph: {
    title: 'Avatar AI — Conversations that feel alive',
    description:
      'Real-time, interactive 3D talking avatars powered by Kimi and ElevenLabs.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="bg-ink-900 text-white antialiased">{children}</body>
    </html>
  );
}
