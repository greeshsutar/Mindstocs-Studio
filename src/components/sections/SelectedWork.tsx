import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { projects } from '@/data/projects';
import '@/styles/components/work.css';

export default function SelectedWork() {
  return (
    <section className="section" aria-labelledby="work-heading">
      <div className="container">
        <div className="section-heading section-heading--center">
          <span className="section-heading__eyebrow">Case Studies</span>
          <h2 className="section-heading__title" id="work-heading">
            SELECTED WORK
          </h2>
          <p className="section-heading__description">
            Explore the technology, internal products, and systematic frameworks engineered by
            MindStocs Studio.
          </p>
        </div>

        <div className="projects-grid">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/work/${project.slug}`}
              className="project-card"
              id={`home-project-${project.id}`}
            >
              <span className="project-card__label">{project.label}</span>
              <h3 className="project-card__title">{project.title}</h3>
              <p className="project-card__desc">{project.shortDescription}</p>
              <span className="project-card__link">
                View Case Study <ArrowRight size={14} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
