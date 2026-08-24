import { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/siteConfig';
import servicesData from '@/content/services.json';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  const serviceEntries: MetadataRoute.Sitemap = servicesData.map((service) => ({
    url: `${baseUrl}/servicios/${service.slug}`,
    lastModified: new Date('2026-08-24'),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date('2026-03-13'),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/servicios`,
      lastModified: new Date('2026-08-24'),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...serviceEntries,
    {
      url: `${baseUrl}/productos`,
      lastModified: new Date('2026-03-13'),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contacto`,
      lastModified: new Date('2026-03-13'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/legal/privacidad`,
      lastModified: new Date('2025-10-01'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];
}
