import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [],
    },
    sitemap: 'https://umep.vercel.app/sitemap.xml',
    host: 'https://umep.vercel.app',
  };
}
