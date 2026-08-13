import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for MindStocs Studio.',
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <section className="section" style={{ paddingTop: 'calc(var(--nav-height) + var(--space-16))' }} aria-labelledby="privacy-title">
          <div className="container container--narrow">
            <h1 className="h1" id="privacy-title" style={{ marginBottom: 'var(--space-6)' }}>PRIVACY POLICY</h1>
            <p className="body-md text-secondary" style={{ marginBottom: 'var(--space-4)', lineHeight: 1.8 }}>
              At MindStocs Studio, we respect your privacy. This policy outlines how we handle any information collected through our contact forms or assistant.
            </p>
            <h2 className="h3" style={{ marginTop: 'var(--space-6)', marginBottom: 'var(--space-3)' }}>1. Data Collection</h2>
            <p className="body-sm text-secondary" style={{ marginBottom: 'var(--space-4)', lineHeight: 1.6 }}>
              We collect information you submit via our project brief form (Name, Email, Company, Phone, Description, Timeline, and Budget) to evaluate requirements.
            </p>
            <h2 className="h3" style={{ marginTop: 'var(--space-6)', marginBottom: 'var(--space-3)' }}>2. Cookies & Analytics</h2>
            <p className="body-sm text-secondary" style={{ marginBottom: 'var(--space-4)', lineHeight: 1.6 }}>
              We do not track private conversation contents. We may collect anonymous browser logs to improve rendering speeds and verify sitemap indexing performance.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
