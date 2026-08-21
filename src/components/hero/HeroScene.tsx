'use client';

import { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import ParticleSphere from './ParticleSphere';

interface HeroSceneProps {
  reducedMotion: boolean;
}

function LoadingFallback() {
  return null; // Canvas shows transparent until loaded
}

export default function HeroScene({ reducedMotion }: HeroSceneProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Pause when off-screen via IntersectionObserver
  useEffect(() => {
    const el = document.getElementById('hero-canvas');
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const particleCount = isMobile ? 1500 : 4000;
  const sphereRadius = isMobile ? 1.8 : 2.5;

  return (
    <div
      id="hero-canvas"
      style={{
        position: 'absolute',
        inset: 0,
        top: 'var(--nav-height)',
        zIndex: 0,
      }}
    >
      {/* Subtle background golden glow behind the sphere */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: isMobile
            ? 'radial-gradient(circle at 50% 50%, rgba(240, 236, 228, 0.035) 0%, rgba(201, 168, 76, 0.02) 35%, transparent 70%)'
            : 'radial-gradient(circle at 50% 50%, rgba(240, 236, 228, 0.055) 0%, rgba(201, 168, 76, 0.03) 35%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: -1,
        }}
      />
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={isMobile ? 1 : Math.min(window.devicePixelRatio, 2)}
        frameloop={isVisible && !reducedMotion ? 'always' : 'demand'}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={<LoadingFallback />}>
          {/* Main 3D particle sphere */}
          <ParticleSphere
            count={particleCount}
            radius={sphereRadius}
            reducedMotion={reducedMotion}
            isMobile={isMobile}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
