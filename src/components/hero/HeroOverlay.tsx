'use client';

import Link from 'next/link';
import '@/styles/components/hero.css';

import { trackEvent } from '@/lib/analytics';

export default function HeroOverlay() {
  return (
    <div className="hero-overlay">
      <div className="container">
        <div className="hero-overlay__content">
          <span className="eyebrow hero-overlay__eyebrow">MINDSTOCS STUDIO</span>
          <p className="label hero-overlay__label">SOFTWARE • PRODUCTS • DIGITAL GROWTH</p>
          <h1 className="display hero-overlay__title">
            BUILD WHAT <span className="text-gradient-gold">YOUR BUSINESS NEEDS NEXT.</span>
          </h1>
          <p className="hero-overlay__description">
            We design and develop software, SaaS products, trading systems and digital growth
            solutions built around real business requirements.
          </p>
          <div className="hero-overlay__actions">
            <Link
              href="/contact"
              className="btn btn--primary"
              id="hero-cta-start"
              onClick={() => trackEvent('hero_cta_click', { cta: 'start_project' })}
            >
              START A PROJECT
            </Link>
            <Link
              href="/services"
              className="btn btn--outline"
              id="hero-cta-services"
              onClick={() => trackEvent('hero_cta_click', { cta: 'explore_services' })}
            >
              EXPLORE SERVICES
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
