import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import '@/styles/components/sections.css';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'MindStocs Studio is a software and digital agency combining engineering rigour and digital growth capabilities.',
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <section className="section" style={{ paddingTop: 'calc(var(--nav-height) + var(--space-16))' }} aria-labelledby="about-title">
          <div className="container container--narrow">
            <div className="section-heading">
              <span className="section-heading__eyebrow">Our Agency</span>
              <h1 className="section-heading__title" id="about-title">
                TECHNOLOGY. PRODUCTS. GROWTH.
              </h1>
              <p className="section-heading__description">
                MindStocs Studio is a software and digital growth partner. We combine engineering
                rigour with digital marketing capabilities under one roof.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)', marginTop: 'var(--space-10)' }}>
              <div>
                <h2 className="h3" style={{ color: 'var(--color-text-primary)', marginBottom: 'var(--space-3)' }}>
                  OUR PHILOSOPHY
                </h2>
                <p className="body-md text-secondary" style={{ lineHeight: 1.8 }}>
                  We believe software should solve business problems, not create technical complexity.
                  Our approach is grounded in direct, clear requirements scoping. We do not use
                  bloated buzzwords, promise unrealistic timelines, or fabricate reviews.
                </p>
              </div>

              <div>
                <h2 className="h3" style={{ color: 'var(--color-text-primary)', marginBottom: 'var(--space-3)' }}>
                  INTEGRATED TEAM CAPABILITIES
                </h2>
                <p className="body-md text-secondary" style={{ lineHeight: 1.8 }}>
                  Many agencies split software development from demand generation. We bring them
                  together. A SaaS application needs billing and multi-tenant engineering just as
                  much as it needs search engine optimization and ad targeting. By combining these
                  skills, we help clients build and promote digital products from a single, coherent source.
                </p>
              </div>

              <div>
                <h2 className="h3" style={{ color: 'var(--color-text-primary)', marginBottom: 'var(--space-3)' }}>
                  A NOTE ON HONESTY
                </h2>
                <p className="body-md text-secondary" style={{ lineHeight: 1.8 }}>
                  We are a focused digital studio. We do not claim 500+ client projects, years of history
                  which we do not have, or imaginary global offices. When you work with MindStocs Studio,
                  you communicate directly with the engineers and strategists building your product.
                </p>
              </div>
            </div>

            {/* CTA panel */}
            <div
              style={{
                marginTop: 'var(--space-16)',
                padding: 'var(--space-8)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: 'var(--color-bg-elevated)',
                textAlign: 'center'
              }}
            >
              <h3 className="h4">Let&apos;s build together</h3>
              <p className="body-sm text-secondary" style={{ marginTop: 'var(--space-2)', marginBottom: 'var(--space-6)' }}>
                Tell us about your business goals and we will suggest the most practical next step.
              </p>
              <Link href="/contact" className="btn btn--primary">
                Contact the Studio
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
