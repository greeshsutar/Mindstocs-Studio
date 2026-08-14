'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import '@/styles/components/sections.css';
import '@/styles/components/problem-selector.css';

interface ProblemOption {
  slug: string;
  eyebrow: string;
  question: string;
  description: string;
  service: string;
  image: string;
  imageAlt: string;
}

const problems: ProblemOption[] = [
  {
    slug: 'software-development',
    eyebrow: '01 / Software',
    question: 'I need custom software built.',
    description: 'Web applications, business platforms, APIs, dashboards — engineered around your actual workflows.',
    service: 'Software Development',
    image: '/videos/software.jpg',
    imageAlt: 'Custom software development — application architecture and system engineering',
  },
  {
    slug: 'saas-product-development',
    eyebrow: '02 / SaaS',
    question: 'I have a SaaS idea to bring to market.',
    description: 'From product discovery and MVP scoping to a production-ready, scalable SaaS product.',
    service: 'SaaS Product Development',
    image: '/videos/saas.jpg',
    imageAlt: 'SaaS product development — cloud dashboard and product interface',
  },
  {
    slug: 'trading-algorithm-development',
    eyebrow: '03 / Trading',
    question: 'I need a systematic trading system.',
    description: 'Market data, signal generation, backtesting, risk management and execution infrastructure.',
    service: 'Trading Algorithm Development',
    image: '/videos/traderalgorithm.jpg',
    imageAlt: 'Trading algorithm development — financial chart and systematic signal systems',
  },
  {
    slug: 'performance-marketing',
    eyebrow: '04 / Marketing',
    question: 'I need more qualified demand.',
    description: 'Paid campaign strategy, audience targeting, conversion optimization and performance reporting.',
    service: 'Performance Marketing',
    image: '/videos/performance.jpg',
    imageAlt: 'Performance marketing — analytics dashboard and conversion growth',
  },
  {
    slug: 'seo',
    eyebrow: '05 / SEO',
    question: 'I need stronger search visibility.',
    description: 'Technical SEO, keyword strategy, content optimization and measurable organic growth.',
    service: 'SEO',
    image: '/videos/seo.jpeg',
    imageAlt: 'SEO — search indexing, technical foundations and ranking improvement',
  },
  {
    slug: 'content-creation',
    eyebrow: '06 / Content',
    question: 'I need content that communicates my value.',
    description: 'Brand storytelling, social content, campaign creative and educational content that converts.',
    service: 'Content Creation',
    image: '/videos/contentcreation.jpg',
    imageAlt: 'Content creation — editorial workflow and publishing pipeline',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
};

export default function ProblemSelector() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <section className="section ps-section" aria-labelledby="problem-heading">
      <div className="container container--narrow">

        {/* Section heading */}
        <div className="section-heading section-heading--center">
          <span className="section-heading__eyebrow">Find Your Service</span>
          <h2 className="section-heading__title" id="problem-heading">
            WHAT ARE YOU TRYING TO BUILD OR GROW?
          </h2>
          <p className="section-heading__description">
            Tell us what you need and we&apos;ll guide you toward the right MindStocs capability.
          </p>
        </div>

        {/* Cards grid */}
        <motion.div
          className="ps-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {problems.map((p) => {
            const isSelected = selected === p.slug;
            return (
              <motion.div
                key={p.slug}
                variants={cardVariants}
                className={`ps-card ${isSelected ? 'ps-card--selected' : ''}`}
                onClick={() => setSelected(isSelected ? null : p.slug)}
                role="button"
                tabIndex={0}
                aria-pressed={isSelected}
                aria-label={p.question}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelected(isSelected ? null : p.slug);
                  }
                }}
              >
                {/* Image strip */}
                <div className="ps-card__image-wrap" aria-hidden="true">
                  <Image
                    src={p.image}
                    alt={p.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="ps-card__image"
                    quality={75}
                  />
                  {/* Overlay */}
                  <div className="ps-card__image-overlay" />
                  {/* Selected state gold shimmer */}
                  <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        className="ps-card__selected-shine"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        aria-hidden="true"
                      />
                    )}
                  </AnimatePresence>
                </div>

                {/* Content */}
                <div className="ps-card__body">
                  <span className="ps-card__eyebrow">{p.eyebrow}</span>
                  <h3 className="ps-card__question">{p.question}</h3>
                  <p className="ps-card__desc">{p.description}</p>

                  <div className="ps-card__footer">
                    {/* Service label + CTA */}
                    <AnimatePresence mode="wait">
                      {isSelected ? (
                        <motion.div
                          key="selected"
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.2 }}
                          className="ps-card__cta-wrap"
                        >
                          <Link
                            href={`/services/${p.slug}`}
                            className="ps-card__cta"
                            onClick={(e) => e.stopPropagation()}
                          >
                            EXPLORE {p.service.toUpperCase()}
                            <ArrowRight size={13} className="ps-card__arrow" />
                          </Link>
                        </motion.div>
                      ) : (
                        <motion.span
                          key="label"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.15 }}
                          className="ps-card__service-label"
                        >
                          {p.service}
                          <ArrowRight size={12} className="ps-card__arrow" />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Passive hint */}
        <p className="ps-hint" aria-hidden="true">
          Select a card to explore that capability →
        </p>
      </div>
    </section>
  );
}
