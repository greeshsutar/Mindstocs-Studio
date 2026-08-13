import { company } from '@/data/company';

interface JSONLDProps {
  type: 'Organization' | 'LocalBusiness' | 'Service' | 'FAQPage';
  data: Record<string, any>;
}

export default function JSONLD({ type, data }: JSONLDProps) {
  // Enforce base Organization attributes
  let schemaData: Record<string, any> = {
    '@context': 'https://schema.org',
    ...data,
  };

  if (type === 'Organization') {
    schemaData = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: company.name,
      url: 'https://mindstocsstudio.com',
      logo: 'https://mindstocsstudio.com/images/logo.png', // placeholder logo image url
      sameAs: [
        company.social.instagram || '',
        company.social.linkedin || '',
      ].filter(Boolean),
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: company.phone,
        contactType: 'customer service',
      },
      ...data,
    };
  }

  if (type === 'LocalBusiness') {
    schemaData = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: company.name,
      image: 'https://mindstocsstudio.com/images/logo.png',
      telephon: company.phone,
      address: {
        '@type': 'PostalAddress',
        streetAddress: `${company.address.line1}, ${company.address.line2}`,
        addressLocality: company.address.city,
        addressRegion: company.address.state,
        postalCode: company.address.pincode,
        addressCountry: 'IN',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: '15.8978', // Sawantwadi coordinates
        longitude: '73.8189',
      },
      url: 'https://mindstocsstudio.com',
      ...data,
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}
