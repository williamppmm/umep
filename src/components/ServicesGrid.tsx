import React from 'react';
import Link from 'next/link';
import Card from './ui/Card';
import services from '@/content/services.json';

interface ServicesGridProps {
  limit?: number;
  showLink?: boolean;
}

export default function ServicesGrid({ limit, showLink = true }: ServicesGridProps) {
  const displayServices = limit ? services.slice(0, limit) : services;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {displayServices.map((service) => (
        <Card key={service.slug} className="hover:shadow-lg transition-shadow">
          <div className="text-4xl mb-4">{service.icon}</div>
          <h3 className="text-xl font-bold text-umep-text mb-3">
            {service.title}
          </h3>
          <p className="text-gray-600 mb-4">{service.excerpt}</p>
          <ul className="space-y-2 mb-6">
            {service.bullets.slice(0, 3).map((bullet, idx) => (
              <li key={idx} className="text-sm text-gray-600 flex items-start">
                <span className="text-accent mr-2">•</span>
                {bullet}
              </li>
            ))}
          </ul>
          {showLink && (
            <Link
              href="/servicios"
              className="text-primary font-medium hover:text-primary-600 transition-colors inline-flex items-center"
            >
              Ver detalles
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          )}
        </Card>
      ))}
    </div>
  );
}
