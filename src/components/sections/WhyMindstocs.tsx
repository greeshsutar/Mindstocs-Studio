import '@/styles/components/sections.css';

const differentiators = [
  {
    title: 'BUSINESS BEFORE TECHNOLOGY',
    description:
      'We begin by understanding the requirement before selecting the solution.',
  },
  {
    title: 'ENGINEERING WITH PURPOSE',
    description:
      'Technology choices should support reliability, maintainability and business objectives.',
  },
  {
    title: 'CONNECTED CAPABILITIES',
    description:
      'Software, product development and digital growth can work together when the business requires it.',
  },
  {
    title: 'CLEAR EXECUTION',
    description:
      'Projects should have clear scope, communication and progress.',
  },
  {
    title: 'LONG-TERM THINKING',
    description:
      'Build solutions that can evolve rather than become technical dead ends.',
  },
];

export default function WhyMindstocs() {
  return (
    <section className="section" aria-labelledby="why-heading">
      <div className="container">
        <div className="section-heading">
          <span className="section-heading__eyebrow">Why Us</span>
          <h2 className="section-heading__title" id="why-heading">
            WHY MINDSTOCS
          </h2>
        </div>

        <div className="why-grid">
          {differentiators.map((d, i) => (
            <div key={i} className="why-card">
              <h3 className="why-card__title">{d.title}</h3>
              <p className="why-card__description">{d.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
