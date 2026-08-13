import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main-content">
        <section
          className="section"
          style={{
            paddingTop: 'calc(var(--nav-height) + var(--space-20))',
            paddingBottom: 'var(--space-20)',
            textAlign: 'center',
          }}
        >
          <div className="container container--narrow">
            <span className="eyebrow" style={{ fontSize: 'var(--font-size-lg)' }}>
              404
            </span>
            <h1 className="display" style={{ marginTop: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
              PAGE NOT FOUND
            </h1>
            <p className="body-lg text-secondary" style={{ marginBottom: 'var(--space-8)' }}>
              The page you are looking for does not exist or has been moved.
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/" className="btn btn--primary">
                Go Home
              </Link>
              <Link href="/services" className="btn btn--outline">
                Explore Services
              </Link>
              <Link href="/contact" className="btn btn--outline">
                Contact us
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
