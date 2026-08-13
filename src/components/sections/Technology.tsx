import { techStack } from '@/data/technologies';
import '@/styles/components/sections.css';

export default function Technology() {
  return (
    <section className="section" aria-labelledby="tech-heading">
      <div className="container">
        <div className="section-heading">
          <span className="section-heading__eyebrow">Technology</span>
          <h2 className="section-heading__title" id="tech-heading">
            BUILT WITH THE RIGHT TOOLS.
          </h2>
          <p className="section-heading__description">
            We select technologies based on the requirements of each project — not trends.
          </p>
        </div>

        <div className="tech-grid">
          {techStack.map((category) => (
            <div key={category.name} className="tech-category">
              <h3 className="tech-category__title">{category.name}</h3>
              <ul className="tech-category__list">
                {category.technologies.map((tech) => (
                  <li key={tech} className="tech-category__item">
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
