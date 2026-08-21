'use client';

import Link from 'next/link';
import { ArrowRight, Sparkles, Code2, TrendingUp, Layers } from 'lucide-react';
import '@/styles/components/hero.css';

import { trackEvent } from '@/lib/analytics';

export default function HeroOverlay() {
  return (
    <div className="hero-overlay">
      <div className="container">
        <div className="hero-overlay__content">
          {/* Eyebrow Pill Badge */}
          <div className="hero-overlay__badge">
            <span className="hero-overlay__badge-dot" />
            <Sparkles size={13} className="hero-overlay__badge-icon" />
            <span>ENGINEERING HIGH-PERFORMANCE DIGITAL SYSTEMS</span>
          </div>

          {/* Luxury Kinetic Hero Title */}
          <h1 className="hero-overlay__title">
            <span className="hero-title__top">ARCHITECTING</span>
            <span className="hero-title__gradient">DIGITAL POWER.</span>
            <span className="hero-title__sub">ENGINEERING MEASURABLE SCALE.</span>
          </h1>

          <p className="hero-overlay__description">
            We engineer bespoke software, scalable SaaS platforms, automated quantitative trading systems, and performance growth funnels that turn ambitious visions into high-yield digital reality.
          </p>

          <div className="hero-overlay__actions">
            <Link
              href="/contact"
              className="btn btn--primary hero-btn-start"
              id="hero-cta-start"
              onClick={() =>
                trackEvent('hero_cta_click', { cta: 'start_project' })
              }
            >
              <span>START A PROJECT</span>
              <ArrowRight size={15} />
            </Link>

            <Link
              href="/services"
              className="btn btn--outline hero-btn-services"
              id="hero-cta-services"
              onClick={() =>
                trackEvent('hero_cta_click', { cta: 'explore_services' })
              }
            >
              <span>EXPLORE SERVICES</span>
            </Link>
          </div>

          {/* Quick Capability Tags */}
          <div className="hero-overlay__stats-strip">
            <div className="hero-stat-pill">
              <Code2 size={13} className="hero-stat-icon" />
              <span>Full-Stack Engineering</span>
            </div>
            <div className="hero-stat-pill">
              <Layers size={13} className="hero-stat-icon" />
              <span>SaaS Product Scaling</span>
            </div>
            <div className="hero-stat-pill">
              <TrendingUp size={13} className="hero-stat-icon" />
              <span>Quantitative Algorithms</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}