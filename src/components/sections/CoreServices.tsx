import Link from 'next/link';
import { services } from '@/data/services';
import { ArrowRight } from 'lucide-react';
import '@/styles/components/sections.css';

export default function CoreServices() {
  return (
    <section className="section" aria-labelledby="services-heading">
      <div className="container">
        <div className="section-heading section-heading--center">
          <span className="section-heading__eyebrow">What We Do</span>
          <h2 className="section-heading__title" id="services-heading">
            ONE STUDIO. SIX CORE CAPABILITIES.
          </h2>
          <p className="section-heading__description">
            From engineering digital products to creating demand for them, MindStocs brings
            technology and digital growth capabilities together around real business requirements.
          </p>
        </div>

        <div className="services-grid">
          {services.map((service) => (
            <Link
              key={service.id}
              href={`/services/${service.slug}`}
              className="service-card"
              id={`service-card-${service.id}`}
            >
              <span className="service-card__number">{service.number}</span>
              <h3 className="service-card__title">{service.title}</h3>
              <p className="service-card__description">{service.shortDescription}</p>
              <span className="service-card__arrow">
                Learn more <ArrowRight size={14} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
