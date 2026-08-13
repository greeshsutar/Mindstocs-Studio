import Link from 'next/link';
import { company } from '@/data/company';
import '@/styles/components/sections.css';

export default function ContactCTA() {
  return (
    <section className="section contact-cta" aria-labelledby="cta-heading">
      <div className="container">
        <h2 className="section-heading__title contact-cta__title" id="cta-heading">
          READY TO BUILD WHAT&apos;S NEXT?
        </h2>
        <p className="contact-cta__description">
          Tell us what you&apos;re trying to build, improve or grow.
        </p>
        <div className="contact-cta__actions">
          <Link href="/contact" className="btn btn--primary btn--lg" id="cta-start-project">
            START A PROJECT
          </Link>
          <a
            href={company.whatsapp.link}
            className="btn btn--outline btn--lg"
            target="_blank"
            rel="noopener noreferrer"
            id="cta-whatsapp"
          >
            CHAT ON WHATSAPP
          </a>
        </div>
      </div>
    </section>
  );
}
