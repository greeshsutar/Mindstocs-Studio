'use client';

import Link from 'next/link';
import '@/styles/components/hero.css';

import { trackEvent } from '@/lib/analytics';

export default function HeroOverlay() {
  return (
    <div className="hero-overlay">
      <div className="container">
        <div className="hero-overlay__content">
          <span className="eyebrow hero-overlay__eyebrow">
            MINDSTOCS STUDIO
          </span>

          <p className="label hero-overlay__label">
            SOFTWARE • PRODUCTS • DIGITAL GROWTH
          </p>

          <h1 className="display hero-overlay__title">
            BUILD
            <br />
            <span className="text-gradient-gold">GROW</span>
            <br />
            SCALE
          </h1>

          <p className="hero-overlay__description">
            We design and develop software, SaaS products, trading systems,
            and digital growth solutions that turn business goals into
            measurable results.
          </p>

          <div className="hero-overlay__actions">
            <Link
              href="/contact"
              className="btn btn--primary"
              id="hero-cta-start"
              onClick={() =>
                trackEvent('hero_cta_click', { cta: 'start_project' })
              }
            >
              START A PROJECT
            </Link>

            <Link
              href="/services"
              className="btn btn--outline"
              id="hero-cta-services"
              onClick={() =>
                trackEvent('hero_cta_click', { cta: 'explore_services' })
              }
            >
              EXPLORE SERVICES
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}