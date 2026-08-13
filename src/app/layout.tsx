import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import '@/styles/typography.css';
import '@/styles/animations.css';
import AssistantButton from '@/components/assistant/AssistantButton';
import FounderPopup from '@/components/layout/FounderPopup';
import SmoothScroll from '@/components/layout/SmoothScroll';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: 'MindStocs Studio — Software & Digital Agency',
    template: '%s | MindStocs Studio',
  },
  description:
    'MindStocs Studio is a software and digital agency providing software development, SaaS product development, trading algorithm development, performance marketing, SEO and content creation services.',
  keywords: [
    'software development',
    'SaaS development',
    'digital agency',
    'trading algorithm',
    'performance marketing',
    'SEO',
    'content creation',
    'MindStocs Studio',
  ],
  authors: [{ name: 'MindStocs Studio' }],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'MindStocs Studio',
    title: 'MindStocs Studio — Software & Digital Agency',
    description:
      'Software development, SaaS products, trading systems and digital growth solutions built around real business requirements.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MindStocs Studio — Software & Digital Agency',
    description:
      'Software development, SaaS products, trading systems and digital growth solutions built around real business requirements.',
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
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <SmoothScroll>{children}</SmoothScroll>
        <FounderPopup />
        <AssistantButton />
      </body>
    </html>
  );
}
