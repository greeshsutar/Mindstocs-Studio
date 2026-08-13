import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import '@/styles/components/sections.css';

export const metadata: Metadata = {
  title: 'Our Process',
  description: 'How MindStocs Studio takes a software or growth requirement from initial discovery to production-ready product.',
};

const processStages = [
  {
    step: '01',
    title: 'DISCOVER',
    subtitle: 'Understanding Context & Constraints',
    desc: 'We start by interviewing your team, reviewing existing systems, and outlining constraints. We establish what the business needs to achieve before suggesting any code library or system architecture.'
  },
  {
    step: '02',
    title: 'DEFINE',
    subtitle: 'Scoping & Strategy Alignment',
    desc: 'We translate raw requirements into a clear technical scope, backlog, and architecture plan. For SaaS products, we plan the MVP boundaries. For trading systems, we document the strategy logic and risk rules.'
  },
  {
    step: '03',
    title: 'DESIGN',
    subtitle: 'System & Interface Architecture',
    desc: 'We create intuitive, high-performance UI/UX designs and map database schemas, APIs, and microservices interactions. We ensure the layout supports screen readers and respects logical accessibility principles.'
  },
  {
    step: '04',
    title: 'BUILD',
    subtitle: 'Clean & Robust Implementation',
    desc: 'We develop codebases utilizing TypeScript, structured API routing, and verified libraries. Every line of code is structured to support long-term maintainability and prevent technical debt.'
  },
  {
    step: '05',
    title: 'VALIDATE',
    subtitle: 'Thorough Quality Assurance',
    desc: 'We audit the system against common edge cases. We run backtesting pipelines for trading algorithms, verify form submission rate limits, test keyboard navigation flow, and check PageSpeed performance indexes.'
  },
  {
    step: '06',
    title: 'LAUNCH',
    subtitle: 'Secure Production Deployment',
    desc: 'We set up secure server configurations, deployment pipelines, automated backups, SSL certificates, and search analytics integrations (like Google Search Console) to verify sitemaps.'
  },
  {
    step: '07',
    title: 'IMPROVE',
    subtitle: 'Continuous Measurement & Iteration',
    desc: 'Launch is just the beginning. We monitor logs, analyze search visibility shifts, measure campaign conversion rates, and iterate components to match real-world user activity.'
  }
];

export default function ProcessPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <section className="section" style={{ paddingTop: 'calc(var(--nav-height) + var(--space-16))' }} aria-labelledby="process-title">
          <div className="container container--narrow">
            <div className="section-heading">
              <span className="section-heading__eyebrow">How We Work</span>
              <h1 className="section-heading__title" id="process-title">
                OUR METHODOLOGY: REQUIREMENT TO PRODUCTION
              </h1>
              <p className="section-heading__description">
                We believe that reliable digital products are the result of structured processes. Here
                is how we guide your project from concept to live deployment.
              </p>
            </div>

            <div className="process-timeline" style={{ marginTop: 'var(--space-10)' }}>
              <div className="process-timeline__line" aria-hidden="true" style={{ left: '20px' }} />
              {processStages.map((stage) => (
                <div key={stage.step} className="process-step process-step--active" style={{ gap: 'var(--space-8)' }}>
                  <div className="process-step__indicator">
                    <div className="process-step__dot" style={{ backgroundColor: 'var(--color-gold)' }} />
                    <span className="process-step__number" style={{ color: 'var(--color-gold)' }}>{stage.step}</span>
                  </div>
                  <div className="process-step__content">
                    <h2 className="h3 process-step__title" style={{ color: 'var(--color-text-primary)', margin: 0 }}>
                      {stage.title}
                    </h2>
                    <p className="eyebrow" style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-gold-muted)', margin: 'var(--space-1) 0 var(--space-2)' }}>
                      {stage.subtitle}
                    </p>
                    <p className="process-step__description" style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-base)' }}>
                      {stage.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom contact hook */}
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
              <h3 className="h4">Have a project requirement?</h3>
              <p className="body-sm text-secondary" style={{ marginTop: 'var(--space-2)', marginBottom: 'var(--space-6)' }}>
                We start with a thorough requirement discovery call. No sales pitch, just engineering facts.
              </p>
              <Link href="/contact" className="btn btn--primary">
                Schedule a Call
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
