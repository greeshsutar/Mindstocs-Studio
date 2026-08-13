import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { projects } from '@/data/projects';
import '@/styles/components/work.css';

export const metadata: Metadata = {
  title: 'Selected Work',
  description: 'Explore the proprietary systems, trading engines, and digital products engineered by MindStocs Studio.',
};

export default function WorkIndex() {
  return (
    <>
      <Header />
      <main id="main-content">
        <section className="section work-page__hero" aria-labelledby="work-title">
          <div className="container">
            <div className="section-heading">
              <span className="section-heading__eyebrow">Portfolio</span>
              <h1 className="section-heading__title" id="work-title">
                SELECTED WORK
              </h1>
              <p className="work-page__subtitle">
                Explore the proprietary systems, SaaS platforms, and technology frameworks
                developed by MindStocs Studio. All case studies shown are genuine internal builds.
              </p>
            </div>

            <div className="projects-grid">
              {projects.map((project) => (
                <Link
                  key={project.id}
                  href={`/work/${project.slug}`}
                  className="project-card"
                  id={`project-card-${project.id}`}
                >
                  <span className="project-card__label">{project.label}</span>
                  <h2 className="project-card__title">{project.title}</h2>
                  <p className="project-card__desc">{project.shortDescription}</p>
                  <span className="project-card__link">
                    View Case Study <ArrowRight size={14} />
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
