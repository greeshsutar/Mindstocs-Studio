'use client';

import { useState, useEffect, useRef } from 'react';
import '@/styles/components/sections.css';

const steps = [
  {
    number: '01',
    title: 'DISCOVER',
    subtitle: 'Strategic Foundation',
    description: 'Understand the business, technical requirements, target audience, and core growth objectives.',
  },
  {
    number: '02',
    title: 'DESIGN',
    subtitle: 'System Architecture',
    description: 'Translate requirements into scalable software architecture, database schemas, and refined UX.',
  },
  {
    number: '03',
    title: 'BUILD',
    subtitle: 'Precision Engineering',
    description: 'Production-grade software development, automated testing, and seamless API integrations.',
  },
  {
    number: '04',
    title: 'GROW',
    subtitle: 'Continuous Evolution',
    description: 'Deployment to production, performance monitoring, technical SEO, and continuous optimization.',
  },
];

export default function Process() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const stepElements = section.querySelectorAll('[data-step-index]');
    const stepObservers: IntersectionObserver[] = [];

    stepElements.forEach((el) => {
      const idx = parseInt(el.getAttribute('data-step-index') || '0', 10);
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveIndex((prev) => Math.max(prev, idx));
          }
        },
        { threshold: 0.6 }
      );
      observer.observe(el);
      stepObservers.push(observer);
    });

    return () => {
      stepObservers.forEach((obs) => obs.disconnect());
    };
  }, []);

  const progressHeight = Math.min(100, Math.max(15, ((activeIndex + 1) / steps.length) * 100));

  return (
    <section className="section" aria-labelledby="process-heading" ref={sectionRef}>
      <div className="container container--narrow">
        <div className="section-heading section-heading--center">
          <span className="section-heading__eyebrow">How We Work</span>
          <h2 className="section-heading__title" id="process-heading">
            FROM REQUIREMENT TO REAL-WORLD PRODUCT.
          </h2>
          <p className="section-heading__description">
            Our systematic engineering process ensures production-grade execution at every phase.
          </p>
        </div>

        <div className="process-timeline">
          <div className="process-timeline__line" aria-hidden="true" />
          <div
            className="process-timeline__progress"
            style={{ height: `${progressHeight}%` }}
            aria-hidden="true"
          />

          {steps.map((step, i) => (
            <div
              key={step.number}
              className={`process-step ${i <= activeIndex ? 'process-step--active' : ''}`}
              data-step-index={i}
            >
              <div className="process-step__indicator">
                <div className="process-step__dot" />
                <span className="process-step__number">{step.number}</span>
              </div>
              <div className="process-step__content">
                <span className="process-step__subtitle">{step.subtitle}</span>
                <h3 className="process-step__title">{step.title}</h3>
                <p className="process-step__description">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
