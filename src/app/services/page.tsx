import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { services } from '@/data/services';
import '@/styles/components/sections.css';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'MindStocs Studio offers software development, SaaS product development, trading algorithm development, performance marketing, SEO and content creation services.',
};

export default function ServicesIndex() {
  return (
    <>
      <Header />
      <main id="main-content">
        <section className="section" style={{ paddingTop: 'calc(var(--nav-height) + var(--space-16))' }}>
          <div className="container">
            <div className="section-heading">
              <span className="section-heading__eyebrow">Services</span>
              <h1 className="section-heading__title">
                ONE STUDIO. SIX CORE CAPABILITIES.
              </h1>
              <p className="section-heading__description">
                From engineering digital products to creating demand for them, MindStocs brings
                technology and digital growth capabilities together around real business requirements.
              </p>
            </div>

            <div className="services-grid">
              {services.map((service) => (
                <Link
                  key={service.id}
                  href={`/services/${service.slug}`}
                  className="service-card"
                >
                  <span className="service-card__number">{service.number}</span>
                  <h2 className="service-card__title">{service.title}</h2>
                  <p className="service-card__description">{service.description}</p>
                  <span className="service-card__arrow">
                    Learn more <ArrowRight size={14} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
