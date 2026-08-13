import { company } from '@/data/company';
import '@/styles/components/sections.css';

export default function Location() {
  return (
    <section className="section section--tight" aria-labelledby="location-heading">
      <div className="container">
        <div className="section-heading">
          <span className="section-heading__eyebrow">Location</span>
          <h2 className="section-heading__title" id="location-heading">
            WHERE TO FIND US
          </h2>
        </div>
        <address className="location__address">
          <p>{company.name}</p>
          <p>{company.address.line1}</p>
          <p>{company.address.line2}</p>
          <p>{company.address.line3}</p>
        </address>
      </div>
    </section>
  );
}
