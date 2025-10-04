import React from 'react';

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

// Datos estructurados para LocalBusiness
export const localBusinessData = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://umep.vercel.app',
  name: 'UMEP - Unidad de Mantenimiento Electrónico Profesional',
  description: 'Mantenimiento y reparación profesional de equipos industriales: variadores, PLCs, HMIs, balanzas y más.',
  url: 'https://umep.vercel.app',
  telephone: '+57-300-321-2328',
  email: 'contacto.umep@gmail.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Cali',
    addressRegion: 'Valle del Cauca',
    addressCountry: 'CO',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 3.4516,
    longitude: -76.5320,
  },
  areaServed: {
    '@type': 'State',
    name: 'Valle del Cauca',
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
  sameAs: [
    'https://www.facebook.com/share/166ieRm1tF/?mibextid=wwXIfr',
    'https://www.instagram.com/umep.co?igsh=aHVwdng1Nm00aGY3',
  ],
};
