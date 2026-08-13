import Link from 'next/link';
import { services } from '@/data/services';
import { ArrowRight } from 'lucide-react';
import {
  SoftwareDevVisual,
  SaaSVisual,
  TradingVisual,
  MarketingVisual,
  SEOVisual,
  ContentVisual,
} from './ServiceVisuals';
import '@/styles/components/sections.css';

const visualMap: Record<string, React.ReactNode> = {
  '01': <SoftwareDevVisual />,
  '02': <SaaSVisual />,
  '03': <TradingVisual />,
  '04': <MarketingVisual />,
  '05': <SEOVisual />,
  '06': <ContentVisual />,
};

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
              {/* Service Number Header */}
              <div className="service-card__top">
                <span className="service-card__number">{service.number}</span>
              </div>

              {/* Custom Technical Visual Area */}
              <div className="service-card__visual-area">
                {visualMap[service.number]}
                <div className="service-card__glow-bg" />
              </div>

              {/* Service Content */}
              <div className="service-card__body">
                <h3 className="service-card__title">{service.title}</h3>
                <p className="service-card__description">{service.shortDescription}</p>
                <span className="service-card__arrow">
                  LEARN MORE <ArrowRight size={14} className="service-card__arrow-icon" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
