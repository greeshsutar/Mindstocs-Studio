'use client';

import '@/styles/components/technology.css';

interface TechItem {
  name: string;
  category: string;
  viewBox?: string;
  svgPath: string;
}

const row1Items: TechItem[] = [
  {
    name: 'React',
    category: 'Frontend',
    viewBox: '0 0 24 24',
    svgPath: 'M12 13.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm0-10.5c-4.42 0-8 1.79-8 4s3.58 4 8 4 8-1.79 8-4-3.58-4-8-4zm0 6.5c-3.31 0-6-1.12-6-2.5s2.69-2.5 6-2.5 6 1.12 6 2.5-2.69 2.5-6 2.5zm-5.66 9.34c-2.21-3.83-2.21-8.17 0-12s5.84-2.34 8.05 1.49 2.21 8.17 0 12-5.84 2.34-8.05-1.49zm6.93-10.87c-2.87-1.65-5.91-.76-6.79.76s.76 4.14 3.63 5.79 5.91.76 6.79-.76-.76-4.14-3.63-5.79zm-6.93 10.87c2.21-3.83 5.84-5.33 8.05-1.49s2.21 8.17 0 12-5.84 2.34-8.05-1.49zm6.93-1.13c-2.87 1.65-5.91.76-6.79-.76s.76-4.14 3.63-5.79 5.91-.76 6.79.76-.76 4.14-3.63 5.79z',
  },
  {
    name: 'Next.js',
    category: 'Frontend',
    viewBox: '0 0 24 24',
    svgPath: 'M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.4 17.5L10 8v8H8.5V6.5h2.2l6.8 9.5h-.1V6.5H19v11h-1.6z',
  },
  {
    name: 'TypeScript',
    category: 'Frontend',
    viewBox: '0 0 24 24',
    svgPath: 'M1.5 0h21A1.5 1.5 0 0 1 24 1.5v21a1.5 1.5 0 0 1-1.5 1.5h-21A1.5 1.5 0 0 1 0 22.5v-21A1.5 1.5 0 0 1 1.5 0zm10.7 13.9v-2H6.8V9.3h7.6v2.6h-5.2v2h3.5v6.5h-2.4v-4.5h-3.5v4.5H4.4v-6.5h7.8zm9.5 2.1c-.2-.6-.6-1.1-1.2-1.4-.6-.3-1.4-.5-2.4-.5-1 0-1.8.2-2.3.6-.6.4-.9.9-1 1.6h2.2c.1-.3.2-.5.5-.7.3-.2.6-.3 1.1-.3.4 0 .8.1 1 .2.2.2.3.4.3.7 0 .2-.1.4-.3.5-.2.2-.6.3-1.1.5-.9.3-1.6.6-2 1-.5.4-.7 1-.7 1.7 0 .7.3 1.3.8 1.7.5.4 1.3.6 2.2.6 1.1 0 2-.2 2.6-.7.6-.5.9-1.2 1-2.1h-2.2c-.1.4-.3.7-.5.9-.3.2-.7.3-1.2.3-.4 0-.7-.1-.9-.2-.2-.1-.3-.3-.3-.6 0-.2.1-.4.3-.5.2-.1.6-.3 1.2-.5 1-.3 1.7-.6 2.2-1 .4-.4.7-1 .7-1.8z',
  },
  {
    name: 'Node.js',
    category: 'Backend',
    viewBox: '0 0 24 24',
    svgPath: 'M12 1.82L2.68 7.2v10.77L12 23.37l9.32-5.4V7.2L12 1.82zm7.42 15.11L12 21.46l-7.42-4.53V8.04L12 3.51l7.42 4.53v8.89z',
  },
  {
    name: 'Python',
    category: 'Backend',
    viewBox: '0 0 24 24',
    svgPath: 'M11.89 0C5.7 0 6.06 2.69 6.06 2.69V5.5h5.88v.83H3.88S0 5.92 0 12.13c0 6.2 3.4 5.98 3.4 5.98h2.03v-2.87s-.11-3.4 3.4-3.4h5.84s3.28.05 3.28-3.19V3.19S18.3 0 11.89 0zm-3.1 1.77a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8zM12.11 24c6.19 0 5.83-2.69 5.83-2.69v-2.81h-5.88v-.83h8.06S24 18.08 24 11.87c0-6.2-3.4-5.98-3.4-5.98h-2.03v2.87s.11 3.4-3.4 3.4h-5.84s-3.28-.05-3.28 3.19v5.46S5.7 24 12.11 24zm3.1-1.77a.9.9 0 1 1 0-1.8.9.9 0 0 1 0 1.8z',
  },
  {
    name: 'REST APIs',
    category: 'Backend',
    viewBox: '0 0 24 24',
    svgPath: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
  },
];

const row2Items: TechItem[] = [
  {
    name: 'PostgreSQL',
    category: 'Database',
    viewBox: '0 0 24 24',
    svgPath: 'M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10 10 10 0 0 0 10-10A10 10 0 0 0 12 2zm1 14.5h-2v-4h2v4zm0-6h-2V7.5h2V10.5z',
  },
  {
    name: 'MongoDB',
    category: 'Database',
    viewBox: '0 0 24 24',
    svgPath: 'M12 0s-5.63 7.84-5.63 12.7c0 3.73 2.14 7.02 5.63 8.8 3.49-1.78 5.63-5.07 5.63-8.8C17.63 7.84 12 0 12 0zm.45 19.85v-7.1h1.74v7.1c-1.12.38-1.74 0-1.74 0z',
  },
  {
    name: 'AWS',
    category: 'Cloud & Deployment',
    viewBox: '0 0 24 24',
    svgPath: 'M12 2L2 7v10l10 5 10-5V7L12 2zm6.7 14.5l-6.7 3.3-6.7-3.3V9.2l6.7-3.3 6.7 3.3v7.3z',
  },
  {
    name: 'Vercel',
    category: 'Cloud & Deployment',
    viewBox: '0 0 24 24',
    svgPath: 'M12 1L24 22H0L12 1z',
  },
  {
    name: 'Redis',
    category: 'Database',
    viewBox: '0 0 24 24',
    svgPath: 'M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.3l6.9 3.5-6.9 3.4-6.9-3.4L12 4.3zM4 9.1l7 3.5v7.2l-7-3.5V9.1zm16 7.2l-7 3.5v-7.2l7-3.5v7.2z',
  },
  {
    name: 'GraphQL',
    category: 'Backend',
    viewBox: '0 0 24 24',
    svgPath: 'M12 2L2.5 7.5v11L12 24l9.5-5.5v-11L12 2zm-7 6.3l7-4 7 4v8l-7 4-7-4v-8z',
  },
];

export default function Technology() {
  const track1 = [...row1Items, ...row1Items, ...row1Items];
  const track2 = [...row2Items, ...row2Items, ...row2Items];

  return (
    <section className="tech-section" aria-labelledby="tech-heading">
      <div className="tech-section__header">
        <div className="section-heading">
          <span className="section-heading__eyebrow">Technology</span>
          <h2 className="section-heading__title" id="tech-heading">
            BUILT WITH THE RIGHT TOOLS.
          </h2>
          <p className="section-heading__description">
            We select technologies based on the requirements of each project — not trends.
          </p>
        </div>
      </div>

      <div className="tech-marquee-wrapper">
        {/* Row 1: Moves Left */}
        <div className="tech-marquee-track tech-marquee-track--left">
          {track1.map((item, idx) => (
            <div key={`row1-${item.name}-${idx}`} className="tech-card">
              <div className="tech-card__info">
                <span className="tech-card__category">{item.category}</span>
                <span className="tech-card__name">{item.name}</span>
              </div>
              <div className="tech-card__icon-wrapper">
                <svg
                  className="tech-card__icon"
                  viewBox={item.viewBox || '0 0 24 24'}
                  aria-hidden="true"
                >
                  <path d={item.svgPath} />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Row 2: Moves Right */}
        <div className="tech-marquee-track tech-marquee-track--right">
          {track2.map((item, idx) => (
            <div key={`row2-${item.name}-${idx}`} className="tech-card">
              <div className="tech-card__info">
                <span className="tech-card__category">{item.category}</span>
                <span className="tech-card__name">{item.name}</span>
              </div>
              <div className="tech-card__icon-wrapper">
                <svg
                  className="tech-card__icon"
                  viewBox={item.viewBox || '0 0 24 24'}
                  aria-hidden="true"
                >
                  <path d={item.svgPath} />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
