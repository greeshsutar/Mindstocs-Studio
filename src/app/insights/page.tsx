import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { articles } from '@/data/insights';
import '@/styles/components/insights.css';

export const metadata: Metadata = {
  title: 'Insights',
  description: 'Technical insights, SEO strategies, and product development methodologies from MindStocs Studio.',
};

export default function InsightsIndex() {
  return (
    <>
      <Header />
      <main id="main-content">
        <section className="section insights-page__hero" aria-labelledby="insights-title">
          <div className="container">
            <div className="section-heading">
              <span className="section-heading__eyebrow">Insights</span>
              <h1 className="section-heading__title" id="insights-title">
                TECHNICAL & STRATEGIC INSIGHTS
              </h1>
              <p className="insights-page__subtitle">
                Read our engineering overviews, marketing checklists, and SaaS validation guides built around real-world requirements.
              </p>
            </div>

            <div className="insights-grid">
              {articles.map((article) => (
                <Link
                  key={article.id}
                  href={`/insights/${article.slug}`}
                  className="insight-card"
                  id={`insight-card-${article.id}`}
                >
                  <div className="insight-card__meta">
                    <span>{article.category}</span>
                    <span>{article.readingTime}</span>
                  </div>
                  <h2 className="insight-card__title">{article.title}</h2>
                  <p className="insight-card__desc">{article.description}</p>
                  <span className="insight-card__link">
                    Read Article <ArrowRight size={14} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
