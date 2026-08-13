import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { getProjectBySlug, getAllProjectSlugs } from '@/data/projects';
import '@/styles/components/work.css';

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: `${project.title} — MindStocs Studio Case Study`,
    description: project.shortDescription,
    openGraph: {
      title: `${project.title} | MindStocs Studio Case Study`,
      description: project.shortDescription,
      type: 'website',
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <Header />
      <main id="main-content">
        <article className="work-page">
          {/* Hero */}
          <section className="work-page__hero section" aria-labelledby="project-title">
            <div className="container">
              <span className="work-page__label">{project.label}</span>
              <h1 className="work-page__title" id="project-title">
                {project.title}
              </h1>
              <p className="work-page__subtitle">{project.shortDescription}</p>
            </div>
          </section>

          {/* Details Grid */}
          <section className="section section--tight">
            <div className="container">
              <div className="work-grid">
                {/* Main Content */}
                <div className="work-content">
                  <div className="work-section">
                    <h2 className="work-section__title">THE CHALLENGE</h2>
                    <p className="work-section__text">{project.challenge}</p>
                  </div>

                  <div className="work-section">
                    <h2 className="work-section__title">THE APPROACH</h2>
                    <p className="work-section__text">{project.approach}</p>
                  </div>

                  <div className="work-section">
                    <h2 className="work-section__title">WHAT WE BUILT</h2>
                    <ul className="work-section__list">
                      {project.whatWeBuilt.map((item, i) => (
                        <li key={i} className="work-section__item">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="work-section">
                    <h2 className="work-section__title">THE OUTCOME</h2>
                    <p className="work-section__text">{project.outcome}</p>
                  </div>
                </div>

                {/* Sidebar Details */}
                <aside className="work-sidebar" aria-label="Project details sidebar">
                  <div className="work-meta__group">
                    <span className="work-meta__title">CLIENT</span>
                    <span className="work-meta__val">{project.client}</span>
                  </div>

                  <div className="work-meta__group">
                    <span className="work-meta__title">CLASSIFICATION</span>
                    <span className="work-meta__val">
                      {project.isInternal ? 'MindStocs Internal Project' : 'Client Project'}
                    </span>
                  </div>

                  <div className="work-meta__group">
                    <span className="work-meta__title">TECHNOLOGIES</span>
                    <div className="work-meta__badges">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="work-meta__badge">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="work-meta__group">
                    <span className="work-meta__title">SERVICES</span>
                    <div className="work-meta__badges">
                      {project.services.map((svc) => (
                        <span key={svc} className="work-meta__badge">
                          {svc.replace(/-/g, ' ')}
                        </span>
                      ))}
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
