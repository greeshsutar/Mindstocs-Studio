import Image from 'next/image';
import Link from 'next/link';
import { services } from '@/data/services';
import { ArrowRight } from 'lucide-react';
import '@/styles/components/sections.css';

// Map each service number to its existing image in public/videos/
const serviceImageMap: Record<string, { src: string; alt: string }> = {
  '01': { src: '/videos/software.jpg',        alt: 'Software development — application architecture and system engineering' },
  '02': { src: '/videos/saas.jpg',             alt: 'SaaS product development — cloud dashboard and product interface' },
  '03': { src: '/videos/traderalgorithm.jpg',  alt: 'Trading algorithm development — financial chart and signal systems' },
  '04': { src: '/videos/performance.jpg',      alt: 'Performance marketing — analytics and conversion growth' },
  '05': { src: '/videos/seo.jpeg',             alt: 'SEO — search indexing, technical SEO and ranking graph' },
  '06': { src: '/videos/contentcreation.jpg',  alt: 'Content creation — editorial workflow and publishing pipeline' },
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
          {services.map((service) => {
            const img = serviceImageMap[service.number];
            return (
              <Link
                key={service.id}
                href={`/services/${service.slug}`}
                className="service-card"
                id={`service-card-${service.id}`}
              >
                {/* Service Number */}
                <div className="service-card__top">
                  <span className="service-card__number">{service.number}</span>
                </div>

                {/* Image Visual Area */}
                <div className="service-card__image-wrap">
                  {img && (
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="service-card__image"
                      quality={80}
                    />
                  )}
                  {/* Dark overlay so text below reads cleanly */}
                  <div className="service-card__image-overlay" aria-hidden="true" />
                  {/* Gold glow on hover */}
                  <div className="service-card__glow-bg" aria-hidden="true" />
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
            );
          })}
        </div>
      </div>
    </section>
  );
}
