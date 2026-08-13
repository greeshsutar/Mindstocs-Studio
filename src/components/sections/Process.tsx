'use client';

import { useState, useEffect, useRef } from 'react';
import '@/styles/components/sections.css';

const steps = [
  { number: '01', title: 'DISCOVER', description: 'Understand the business, users and objectives.' },
  { number: '02', title: 'DEFINE', description: 'Translate requirements into a clear solution.' },
  { number: '03', title: 'DESIGN', description: 'Create the experience and system structure.' },
  { number: '04', title: 'BUILD', description: 'Develop and integrate.' },
  { number: '05', title: 'VALIDATE', description: 'Test, review and refine.' },
  { number: '06', title: 'LAUNCH', description: 'Deploy to production.' },
  { number: '07', title: 'IMPROVE', description: 'Measure, optimize and evolve.' },
];

export default function Process() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const stepElements = section.querySelectorAll('[data-step-index]');
            stepElements.forEach((el) => {
              const stepObserver = new IntersectionObserver(
                ([stepEntry]) => {
                  if (stepEntry.isIntersecting) {
                    const idx = parseInt(el.getAttribute('data-step-index') || '0');
                    setActiveIndex((prev) => Math.max(prev, idx));
                  }
                },
                { threshold: 0.5 }
              );
              stepObserver.observe(el);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const progressHeight = ((activeIndex + 1) / steps.length) * 100;

  return (
    <section className="section" aria-labelledby="process-heading" ref={sectionRef}>
      <div className="container container--narrow">
        <div className="section-heading">
          <span className="section-heading__eyebrow">How We Work</span>
          <h2 className="section-heading__title" id="process-heading">
            FROM REQUIREMENT TO REAL-WORLD PRODUCT.
          </h2>
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
