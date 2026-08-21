'use client';

import '@/styles/components/hero.css';

export default function HeroFallback() {
  return (
    <div className="hero-fallback" aria-hidden="true">
      <div className="hero-fallback__glow hero-fallback__glow--1" />
      <div className="hero-fallback__glow hero-fallback__glow--2" />
    </div>
  );
}
