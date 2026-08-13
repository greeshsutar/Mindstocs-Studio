import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for MindStocs Studio.',
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <section className="section" style={{ paddingTop: 'calc(var(--nav-height) + var(--space-16))' }} aria-labelledby="terms-title">
          <div className="container container--narrow">
            <h1 className="h1" id="terms-title" style={{ marginBottom: 'var(--space-6)' }}>TERMS OF SERVICE</h1>
            <p className="body-md text-secondary" style={{ marginBottom: 'var(--space-4)', lineHeight: 1.8 }}>
              By accessing this website, you agree to these terms.
            </p>
            <h2 className="h3" style={{ marginTop: 'var(--space-6)', marginBottom: 'var(--space-3)' }}>1. Agency Services</h2>
            <p className="body-sm text-secondary" style={{ marginBottom: 'var(--space-4)', lineHeight: 1.6 }}>
              MindStocs Studio provides technology, product engineering, and digital growth services. All estimates and timelines provided are subject to detailed statements of work.
            </p>
            <h2 className="h3" style={{ marginTop: 'var(--space-6)', marginBottom: 'var(--space-3)' }}>2. Disclaimers</h2>
            <p className="body-sm text-secondary" style={{ marginBottom: 'var(--space-4)', lineHeight: 1.6 }}>
              Our trading algorithm service is purely technical engineering. Trading involves financial risk. MindStocs Studio does not guarantee profitability or past results.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
