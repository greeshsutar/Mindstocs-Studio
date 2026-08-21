import Link from 'next/link';
import { company } from '@/data/company';
import { services } from '@/data/services';
import { mainNavItems } from '@/data/navigation';
import Logo from './Logo';
import '@/styles/components/footer.css';

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer__grid">
          {/* Brand Column */}
          <div className="footer__brand">
            <Link href="/" className="footer__logo" aria-label="MindStocs Studio — Home">
              <Logo height={42} />
            </Link>
            <p className="footer__tagline">Technology. Products. Growth.</p>
            <p className="footer__description">
              {company.shortDescription}
            </p>
          </div>

          {/* Services */}
          <div className="footer__column">
            <h3 className="footer__heading">Services</h3>
            <ul className="footer__list">
              {services.map((service) => (
                <li key={service.id}>
                  <Link href={`/services/${service.slug}`} className="footer__link">
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="footer__column">
            <h3 className="footer__heading">Company</h3>
            <ul className="footer__list">
              {mainNavItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="footer__link">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/contact" className="footer__link">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/portal" className="footer__link">
                  Client Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div className="footer__column">
            <h3 className="footer__heading">Connect</h3>
            <ul className="footer__list">
              <li>
                <a
                  href={company.whatsapp.link}
                  className="footer__link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp
                </a>
              </li>
              {company.social.instagram && (
                <li>
                  <a
                    href={company.social.instagram}
                    className="footer__link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Instagram
                  </a>
                </li>
              )}
              {company.social.linkedin && (
                <li>
                  <a
                    href={company.social.linkedin}
                    className="footer__link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Location + Legal */}
        <div className="footer__bottom">
          <div className="footer__location">
            <h3 className="footer__heading">Location</h3>
            <address className="footer__address">
              <p>{company.address.line1}</p>
              <p>{company.address.line2}</p>
              <p>{company.address.line3}</p>
            </address>
            <p className="footer__gst">GST: {company.gst}</p>
          </div>

          <div className="footer__legal">
            <Link href="/privacy" className="footer__legal-link">
              Privacy Policy
            </Link>
            <Link href="/terms" className="footer__legal-link">
              Terms of Service
            </Link>
          </div>

          <p className="footer__copyright">
            © {new Date().getFullYear()} {company.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
