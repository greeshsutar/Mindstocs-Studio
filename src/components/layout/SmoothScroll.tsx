'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

interface SmoothScrollProps {
  children: React.ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // 1. Page Reload Reset: Force scroll position back to top (0, 0) on page refresh
    if (typeof window !== 'undefined') {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
      window.scrollTo(0, 0);
    }

    // 2. Accessibility Guard: Disable smooth scroll overrides if prefers-reduced-motion is active
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const isReducedMotion = reducedMotionQuery.matches;

    let lenis: Lenis | null = null;
    let rafId: number;

    if (!isReducedMotion) {
      // Initialize Lenis with refined inertia and mouse wheel responsiveness
      lenis = new Lenis({
        duration: 1.25,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1.15,
        touchMultiplier: 1.8,
        syncTouch: false,
      });

      lenisRef.current = lenis;

      // Scroll top immediately in Lenis
      lenis.scrollTo(0, { immediate: true });

      // Expose Lenis instance globally for programmatic smooth scrolling
      if (typeof window !== 'undefined') {
        (window as any).__lenis = lenis;
      }

      // Smooth scroll animation frame loop
      function raf(time: number) {
        lenis?.raf(time);
        rafId = requestAnimationFrame(raf);
      }
      rafId = requestAnimationFrame(raf);

      // Listen to scroll events to update document scroll properties & parallax variables
      lenis.on('scroll', ({ scroll, velocity, progress }: any) => {
        document.documentElement.style.setProperty('--scroll-y', `${scroll}px`);
        document.documentElement.style.setProperty('--scroll-velocity', `${Math.min(10, Math.abs(velocity))}`);
        document.documentElement.style.setProperty('--scroll-progress', `${progress}`);
      });
    }

    // 3. Anchor Link Interceptor: Smoothly glide when clicking internal anchors (e.g. #services, #contact)
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;

      const href = target.getAttribute('href');
      if (href && href.startsWith('#') && href.length > 1) {
        const targetElement = document.querySelector(href);
        if (targetElement) {
          e.preventDefault();
          if (lenis) {
            lenis.scrollTo(targetElement as HTMLElement, {
              offset: -80,
              duration: 1.4,
              easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            });
          } else {
            targetElement.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    // 4. Scroll Reveal Observer: Auto-detect cards & sections and reveal on scroll into view
    const observerCallback: IntersectionObserverCallback = (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('scroll-revealed');
          obs.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px',
    });

    const selector = '.section, .service-card, .project-card, .why-card, .process-step, .faq-item, .contact-cta';
    const targets = document.querySelectorAll(selector);

    targets.forEach((el) => {
      // Don't apply reveal to hero section to avoid delaying hero overlay
      if (el.closest('.hero')) return;
      el.classList.add('scroll-reveal');
      observer.observe(el);
    });

    // 5. Reduced Motion listener
    const handleReducedMotionChange = (e: MediaQueryListEvent) => {
      if (e.matches && lenis) {
        lenis.destroy();
        cancelAnimationFrame(rafId);
      }
    };
    reducedMotionQuery.addEventListener('change', handleReducedMotionChange);

    return () => {
      if (lenis) {
        lenis.destroy();
        cancelAnimationFrame(rafId);
      }
      document.removeEventListener('click', handleAnchorClick);
      observer.disconnect();
      reducedMotionQuery.removeEventListener('change', handleReducedMotionChange);
    };
  }, []);

  return <>{children}</>;
}
