import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Service } from '@/data/services';
import { company } from '@/data/company';
import FAQ from '@/components/sections/FAQ';
import '@/styles/components/service-page.css';

interface ServicePageLayoutProps {
  service: Service;
}

export default function ServicePageLayout({ service }: ServicePageLayoutProps) {
  return (
    <article className="service-page">
      {/* Service Hero */}
      <section className="service-page__hero section" aria-labelledby="service-title">
        <div className="container">
          <span className="number-index service-page__number">{service.number}</span>
          <h1 className="service-page__title" id="service-title">
            {service.title}
          </h1>
          <p className="service-page__positioning">{service.positioning}</p>
          {service.disclaimer && (
            <p className="service-page__disclaimer">{service.disclaimer}</p>
          )}
        </div>
      </section>

      {/* Description */}
      <section className="section section--tight">
        <div className="container container--narrow">
          <p className="service-page__description">{service.description}</p>
        </div>
      </section>

      {/* Capabilities */}
      <section className="section" aria-labelledby="capabilities-heading">
        <div className="container">
          <h2 className="section-heading__title" id="capabilities-heading">
            CAPABILITIES
          </h2>
          <ul className="service-page__capabilities">
            {service.capabilities.map((cap) => (
              <li key={cap} className="service-page__capability">
                {cap}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Process */}
      <section className="section" aria-labelledby="service-process-heading">
        <div className="container container--narrow">
          <h2 className="section-heading__title" id="service-process-heading">
            PROCESS
          </h2>
          <div className="service-page__process">
            {service.process.map((step) => (
              <div key={step.number} className="service-page__process-step">
                <span className="number-index">{step.number}</span>
                <div>
                  <h3 className="service-page__process-title">{step.title}</h3>
                  <p className="service-page__process-desc">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="section section--tight" aria-labelledby="service-tech-heading">
        <div className="container">
          <h2 className="section-heading__title" id="service-tech-heading">
            TECHNOLOGY
          </h2>
          <div className="service-page__tech-list">
            {service.technologies.map((tech) => (
              <span key={tech} className="service-page__tech-badge">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section className="section section--tight" aria-labelledby="deliverables-heading">
        <div className="container container--narrow">
          <h2 className="section-heading__title" id="deliverables-heading">
            DELIVERABLES
          </h2>
          <ul className="service-page__deliverables">
            {service.deliverables.map((d) => (
              <li key={d} className="service-page__deliverable">
                {d}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Service FAQ */}
      {service.faqs.length > 0 && (
        <section className="section" aria-labelledby="service-faq-heading">
          <div className="container container--narrow">
            <h2 className="section-heading__title" id="service-faq-heading">
              FREQUENTLY ASKED
            </h2>
            <div className="service-page__faq-list">
              {service.faqs.map((faq) => (
                <div key={faq.question} className="service-page__faq-item">
                  <h3 className="service-page__faq-q">{faq.question}</h3>
                  <p className="service-page__faq-a">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="section contact-cta">
        <div className="container">
          <h2 className="section-heading__title contact-cta__title">
            READY TO START?
          </h2>
          <div className="contact-cta__actions">
            <Link
              href={service.cta.href}
              className="btn btn--primary btn--lg"
            >
              {service.cta.label}
            </Link>
            <a
              href={company.whatsapp.link}
              className="btn btn--outline btn--lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              CHAT ON WHATSAPP
            </a>
          </div>
        </div>
      </section>
    </article>
  );
}
