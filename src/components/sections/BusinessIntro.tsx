import '@/styles/components/sections.css';

export default function BusinessIntro() {
  return (
    <section className="section business-intro" aria-labelledby="intro-heading">
      <div className="container container--narrow">
        <div className="section-heading section-heading--center">
          <span className="section-heading__eyebrow">Who We Are</span>
          <h2 className="section-heading__title" id="intro-heading">
            MORE THAN A DIGITAL AGENCY.
          </h2>
        </div>
        <p className="business-intro__text">
          MindStocs Studio brings software engineering, product development and digital growth
          capabilities together under one studio. We work with businesses that need reliable
          software, scalable products and measurable digital growth — built around real
          requirements, not assumptions.
        </p>
      </div>
    </section>
  );
}
