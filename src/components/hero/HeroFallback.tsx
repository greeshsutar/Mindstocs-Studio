'use client';

import '@/styles/components/hero.css';

export default function HeroFallback() {
  return (
    <div className="hero-fallback" aria-hidden="true">
      <div className="hero-fallback__glow hero-fallback__glow--1" />
      <div className="hero-fallback__glow hero-fallback__glow--2" />
      {/* Decorative static dots */}
      <div className="hero-fallback__dots">
        {Array.from({ length: 30 }).map((_, i) => (
          <span
            key={i}
            className="hero-fallback__dot"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.15 + Math.random() * 0.35,
              animationDelay: `${Math.random() * 3}s`,
              width: `${1 + Math.random() * 2}px`,
              height: `${1 + Math.random() * 2}px`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
