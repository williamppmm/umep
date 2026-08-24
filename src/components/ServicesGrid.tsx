import React from 'react';
import Link from 'next/link';
import Card from './ui/Card';
import Icon from './ui/Icon';
import ServiceIcon from './ui/ServiceIcon';
import servicesData from '@/content/services.json';

interface ServicesGridProps {
  limit?: number;
  showLink?: boolean;
}

const services = servicesData;

export default function ServicesGrid({ limit, showLink = true }: ServicesGridProps) {
  const displayServices = limit ? services.slice(0, limit) : services;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {displayServices.map((service) => (
        <Card key={service.slug} className="hover:shadow-lg transition-shadow">
          <ServiceIcon slug={service.slug} size={44} className="mb-4 text-accent" />
          <h3 className="text-xl font-bold text-umep-text mb-3">
            {service.title}
          </h3>
          <p className="text-gray-600 mb-4">{service.excerpt}</p>
          <ul className="space-y-2 mb-6">
            {service.bullets.slice(0, 3).map((bullet, idx) => (
              <li key={idx} className="text-sm text-gray-600 flex items-start">
                <Icon
                  name="check"
                  size={16}
                  className="mr-3 mt-0.5 flex-shrink-0 text-primary"
                />
                {bullet}
              </li>
            ))}
          </ul>
          {showLink && (
            <Link
              href={`/servicios/${service.slug}`}
              className="text-primary font-medium hover:text-primary-600 transition-colors inline-flex items-center"
            >
              Ver detalles
              <Icon name="arrowRight" size={16} className="ml-1" aria-hidden />
            </Link>
          )}
        </Card>
      ))}
    </div>
  );
}
