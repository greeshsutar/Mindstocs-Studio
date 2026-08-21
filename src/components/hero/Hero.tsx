'use client';

import HeroOverlay from './HeroOverlay';
import HeroFallback from './HeroFallback';
import '@/styles/components/hero.css';

export default function Hero() {
  return (
    <section className="hero" id="hero" aria-label="Hero">
      {/* Clean luxury ambient glow background */}
      <HeroFallback />

      {/* Text overlay on top */}
      <HeroOverlay />
    </section>
  );
}
