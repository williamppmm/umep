import React from 'react';
import { contactInfo, siteConfig, socialLinks } from '@/lib/siteConfig';

interface StructuredDataProps {
  data: object;
}

export default function StructuredData({ data }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export const localBusinessData = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': siteConfig.url,
  name: siteConfig.legalName,
  description: siteConfig.description,
  url: siteConfig.url,
  telephone: contactInfo.whatsappInternational,
  email: contactInfo.email,
  address: {
    '@type': 'PostalAddress',
    addressLocality: contactInfo.city,
    addressRegion: contactInfo.region,
    addressCountry: contactInfo.countryCode,
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 3.4516,
    longitude: -76.532,
  },
  areaServed: {
    '@type': 'State',
    name: contactInfo.region,
  },
  priceRange: '$$',
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '18:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '08:00',
      closes: '12:00',
    },
  ],
  sameAs: [socialLinks.facebook, socialLinks.instagram],
};

export const organizationData = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${siteConfig.url}#organization`,
  name: siteConfig.legalName,
  url: siteConfig.url,
  logo: `${siteConfig.url}${siteConfig.ogImage}`,
  email: contactInfo.email,
  telephone: contactInfo.whatsappInternational,
  sameAs: [socialLinks.facebook, socialLinks.instagram],
  address: {
    '@type': 'PostalAddress',
    addressLocality: contactInfo.city,
    addressRegion: contactInfo.region,
    addressCountry: contactInfo.countryCode,
  },
};
