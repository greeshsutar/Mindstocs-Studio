import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ServicePageLayout from '@/components/services/ServicePageLayout';
import { services, getServiceBySlug, getAllServiceSlugs } from '@/data/services';

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  return {
    title: `${service.title} — MindStocs Studio`,
    description: service.description,
    openGraph: {
      title: `${service.title} | MindStocs Studio`,
      description: service.shortDescription,
      type: 'website',
    },
  };
}

import JSONLD from '@/components/layout/JSONLD';

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const serviceSchema = {
    '@type': 'Service',
    name: service.title,
    description: service.shortDescription,
    provider: {
      '@type': 'LocalBusiness',
      name: 'MindStocs Studio'
    }
  };

  return (
    <>
      <JSONLD type="Service" data={serviceSchema} />
      <Header />
      <main id="main-content">
        <ServicePageLayout service={service} />
      </main>
      <Footer />
    </>
  );
}
