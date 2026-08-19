'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  radius: number;
  color: string;
  vx: number;
  vy: number;
  alpha: number;
  alphaSpeed: number;
  baseAlpha: number;
}

export default function GlobalBackgroundDots() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const isMobile = width < 768;
    const particleCount = isMobile ? 65 : 140;

    const colors = [
      'rgba(201, 168, 76,',  // Gold
      'rgba(230, 195, 95,',  // Luminous Gold
      'rgba(255, 255, 255,', // Pure White
      'rgba(240, 236, 228,', // Warm White
    ];

    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const colorPrefix = colors[Math.floor(Math.random() * colors.length)];
      const baseAlpha = 0.35 + Math.random() * 0.55;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 1.4 + Math.random() * 2.4, // Small glowing dot size
        color: colorPrefix,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35 - 0.08, // Subtle organic drift
        alpha: baseAlpha,
        alphaSpeed: 0.005 + Math.random() * 0.015,
        baseAlpha,
      });
    }

    let time = 0;

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!prefersReducedMotion) {
          p.x += p.vx;
          p.y += p.vy;

          // Wrap around edges seamlessly
          if (p.x < -15) p.x = width + 15;
          else if (p.x > width + 15) p.x = -15;

          if (p.y < -15) p.y = height + 15;
          else if (p.y > height + 15) p.y = -15;

          // Gentle alpha breathing / glow twinkle
          p.alpha = p.baseAlpha + Math.sin(time * 1.5 + i) * 0.22;
          p.alpha = Math.max(0.18, Math.min(0.98, p.alpha));
        }

        // Draw glowing dot with radial glow
        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color} ${p.alpha})`;
        ctx.shadowColor = p.color.includes('255')
          ? 'rgba(255, 255, 255, 0.9)'
          : 'rgba(201, 168, 76, 0.9)';
        ctx.shadowBlur = p.radius * 4.5;
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 1,
      }}
    />
  );
}
