import { MetadataRoute } from 'next';
import { services } from '@/data/services';
import { projects } from '@/data/projects';
import { articles } from '@/data/insights';

const DOMAIN = 'https://mindstocsstudio.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  // 1. Static Pages
  const staticPaths = [
    '',
    '/services',
    '/solutions',
    '/work',
    '/process',
    '/about',
    '/faq',
    '/contact',
    '/privacy',
    '/terms'
  ].map((route) => ({
    url: `${DOMAIN}${route}`,
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: route === '' ? (1.0 as const) : (0.8 as const)
  }));

  // 2. Services dynamic pages
  const servicePaths = services.map((service) => ({
    url: `${DOMAIN}/services/${service.slug}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.7 as const
  }));

  // 3. Projects dynamic pages
  const projectPaths = projects.map((project) => ({
    url: `${DOMAIN}/work/${project.slug}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.6 as const
  }));

  // 4. Articles dynamic pages
  const articlePaths = articles.map((article) => ({
    url: `${DOMAIN}/insights/${article.slug}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.6 as const
  }));

  return [
    ...staticPaths,
    ...servicePaths,
    ...projectPaths,
    ...articlePaths
  ];
}
