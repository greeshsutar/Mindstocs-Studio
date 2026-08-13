'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import HeroOverlay from './HeroOverlay';
import HeroFallback from './HeroFallback';
import '@/styles/components/hero.css';

// Lazy load the 3D scene — only on client, with no SSR
const HeroScene = dynamic(() => import('./HeroScene'), {
  ssr: false,
  loading: () => null,
});

function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return reducedMotion;
}

function useWebGLSupport() {
  const [supported, setSupported] = useState(true);
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const ctx =
        canvas.getContext('webgl2') || canvas.getContext('webgl');
      setSupported(!!ctx);
    } catch {
      setSupported(false);
    }
  }, []);
  return supported;
}

export default function Hero() {
  const reducedMotion = useReducedMotion();
  const webglSupported = useWebGLSupport();

  const show3D = webglSupported && !reducedMotion;

  return (
    <section className="hero" id="hero" aria-label="Hero">
      {/* 3D scene or fallback */}
      {show3D ? (
        <HeroScene reducedMotion={reducedMotion} />
      ) : (
        <HeroFallback />
      )}

      {/* Text overlay on top */}
      <HeroOverlay />
    </section>
  );
}
