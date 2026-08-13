import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import '@/styles/components/sections.css';

const problems = [
  { question: 'I need custom software', service: 'Software Development', slug: 'software-development' },
  { question: 'I have a SaaS idea', service: 'SaaS Product Development', slug: 'saas-product-development' },
  { question: 'I need a trading system', service: 'Trading Algorithm Development', slug: 'trading-algorithm-development' },
  { question: 'I need more qualified demand', service: 'Performance Marketing', slug: 'performance-marketing' },
  { question: 'I need stronger search visibility', service: 'SEO', slug: 'seo' },
  { question: 'I need better business content', service: 'Content Creation', slug: 'content-creation' },
];

export default function ProblemSelector() {
  return (
    <section className="section" aria-labelledby="problem-heading">
      <div className="container">
        <div className="section-heading section-heading--center">
          <span className="section-heading__eyebrow">Find Your Service</span>
          <h2 className="section-heading__title" id="problem-heading">
            WHAT ARE YOU TRYING TO BUILD OR GROW?
          </h2>
        </div>

        <div className="problem-selector__grid">
          {problems.map((p) => (
            <Link
              key={p.slug}
              href={`/services/${p.slug}`}
              className="problem-card"
              id={`problem-${p.slug}`}
            >
              <span className="problem-card__question">{p.question}</span>
              <span className="problem-card__service">
                {p.service} <ArrowRight size={12} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
