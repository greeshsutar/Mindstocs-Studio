import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import '@/styles/components/sections.css';

export const metadata: Metadata = {
  title: 'Solutions',
  description: 'How MindStocs Studio maps systematic capabilities to solve specific business context challenges.',
};

const solutionsData = [
  {
    need: 'I need to launch a digital product.',
    context: 'Startups, SaaS founders, and product teams looking to validate an idea and scale.',
    capability: 'SaaS Product Development',
    solution: 'We help you scope, design, build and launch a subscription-ready MVP using modern Next.js foundations.',
    slug: 'saas-product-development'
  },
  {
    need: 'I need to automate internal workflows.',
    context: 'Operational businesses struggling with manual admin dashboards, fragmented databases, or missing API linkages.',
    capability: 'Software Development',
    solution: 'We engineer custom web apps, administrative panels, and database integrations mapping to your business logic.',
    slug: 'software-development'
  },
  {
    need: 'I want systematic trading structures.',
    context: 'Proprietary traders, asset managers, and financial analysts requiring automated execution.',
    capability: 'Trading Algorithm Development',
    solution: 'We engineer robust low-latency WebSocket market feeds integration, backtesting frameworks, and strict pre-trade risk controls.',
    slug: 'trading-algorithm-development'
  },
  {
    need: 'I want sustainable search visibility.',
    context: 'Companies relying on paid channels who want to establish sustainable organic pipeline feeds.',
    capability: 'SEO',
    solution: 'We establish technical SEO audits, site speed optimization, keyword strategies, and schema markup integration.',
    slug: 'seo'
  }
];

export default function SolutionsPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <section className="section" style={{ paddingTop: 'calc(var(--nav-height) + var(--space-16))' }} aria-labelledby="solutions-title">
          <div className="container">
            <div className="section-heading">
              <span className="section-heading__eyebrow">Solutions</span>
              <h1 className="section-heading__title" id="solutions-title">
                MAPPING BUSINESS CONTEXT TO TECHNOLOGY
              </h1>
              <p className="section-heading__description">
                We believe technology choices must support business objectives. Explore how we align
                our capabilities to match your specific context.
              </p>
            </div>

            <div className="why-grid" style={{ marginTop: 'var(--space-10)' }}>
              {solutionsData.map((sol, index) => (
                <div
                  key={index}
                  className="why-card"
                  style={{
                    backgroundColor: 'var(--color-surface)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: 'var(--space-4)'
                  }}
                >
                  <div>
                    <span className="eyebrow" style={{ color: 'var(--color-gold-muted)' }}>{sol.capability}</span>
                    <h2 className="h3" style={{ color: 'var(--color-text-primary)', marginTop: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
                      {sol.need}
                    </h2>
                    <p className="body-sm" style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-4)' }}>
                      <strong>Context:</strong> {sol.context}
                    </p>
                    <p className="body-sm" style={{ color: 'var(--color-text-primary)' }}>
                      {sol.solution}
                    </p>
                  </div>

                  <Link
                    href={`/services/${sol.slug}`}
                    className="btn btn--outline btn--sm"
                    style={{ width: 'fit-content', marginTop: 'var(--space-4)' }}
                  >
                    Explore Service <ArrowRight size={14} />
                  </Link>
                </div>
              ))}
            </div>

            {/* General contact hook */}
            <div
              style={{
                marginTop: 'var(--space-12)',
                backgroundColor: 'var(--color-bg-elevated)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-8)',
                textAlign: 'center'
              }}
            >
              <h2 className="h3">Not sure which service fits?</h2>
              <p className="body-sm text-secondary" style={{ marginTop: 'var(--space-2)', marginBottom: 'var(--space-6)' }}>
                Tell us about your requirements, and we will advise you on the most practical path forward.
              </p>
              <Link href="/contact" className="btn btn--primary">
                Discuss Your Requirements
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
