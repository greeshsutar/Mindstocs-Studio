import type { Metadata } from 'next';
import { Suspense } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ContactForm from '@/components/forms/ContactForm';
import { company } from '@/data/company';
import '@/styles/components/contact.css';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Start a project with MindStocs Studio. Tell us what you need and we will help turn the requirement into a practical next step.',
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <section className="section contact-page__hero">
          <div className="container container--narrow">
            <div className="section-heading">
              <span className="section-heading__eyebrow">Contact</span>
              <h1 className="section-heading__title">
                TELL US WHAT YOU&apos;RE BUILDING.
              </h1>
              <p className="contact-page__subtitle">
                Tell us what you need. We&apos;ll help turn the requirement into a practical
                next step.
              </p>
            </div>

            <Suspense fallback={null}>
              <ContactForm />
            </Suspense>
          </div>
        </section>

        {/* Address */}
        <section className="section section--tight">
          <div className="container container--narrow">
            <h2 className="section-heading__title">LOCATION</h2>
            <address style={{ fontStyle: 'normal', color: 'var(--color-text-secondary)', marginTop: 'var(--space-6)', lineHeight: 1.8 }}>
              <p>{company.name}</p>
              <p>{company.address.line1}</p>
              <p>{company.address.line2}</p>
              <p>{company.address.line3}</p>
              <p style={{ marginTop: 'var(--space-4)', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-tertiary)' }}>
                GST: {company.gst}
              </p>
            </address>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
