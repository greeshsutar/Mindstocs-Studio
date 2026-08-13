import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FAQ from '@/components/sections/FAQ';
import JSONLD from '@/components/layout/JSONLD';
import { getAllFAQItems } from '@/data/faq';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description: 'Common questions and answers about MindStocs Studio software engineering, SaaS, trading, SEO and marketing capabilities.',
};

export default function FAQPage() {
  const faqSchema = {
    '@type': 'FAQPage',
    mainEntity: getAllFAQItems().map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <JSONLD type="FAQPage" data={faqSchema} />
      <Header />
      <main id="main-content">
        <div style={{ paddingTop: 'calc(var(--nav-height) + var(--space-8))' }}>
          <FAQ showAll={true} />
        </div>
      </main>
      <Footer />
    </>
  );
}
