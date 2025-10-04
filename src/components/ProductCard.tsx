'use client';

import React from 'react';
import Image from 'next/image';
import Card from './ui/Card';
import Button from './ui/Button';

interface Product {
  slug: string;
  title: string;
  brand: string;
  model: string;
  category: string;
  description: string;
  specs: string[];
  price_from: number;
  currency: string;
  availability: string;
  warranty: string;
  image: string;
  imageAlt: string;
}

interface ProductCardProps {
  product: Product;
  onQuoteClick?: (product: Product) => void;
}

export default function ProductCard({ product, onQuoteClick }: ProductCardProps) {
  const handleQuoteClick = () => {
    if (onQuoteClick) {
      onQuoteClick(product);
    } else {
      const contactForm = document.getElementById('contacto');
      contactForm?.scrollIntoView({ behavior: 'smooth' });
    }

    // GA4 event
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'view_product', {
        event_category: 'ecommerce',
        event_label: product.title,
        value: product.price_from,
      });
    }
  };

  return (
    <Card className="flex flex-col h-full">
      {/* Placeholder Image */}
      <div className="relative w-full h-48 bg-gray-100 rounded-xl mb-4 flex items-center justify-center">
        <div className="text-6xl">{product.category === 'Industrial' ? '⚖️' : product.category === 'Precisión' ? '🔬' : '🏪'}</div>
      </div>

      {/* Badge */}
      <div className="flex items-center gap-2 mb-3">
        <span className="bg-accent/10 text-umep-text px-3 py-1 rounded-full text-xs font-medium">
          {product.category}
        </span>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          product.availability === 'En stock'
            ? 'bg-green-100 text-green-800'
            : 'bg-yellow-100 text-yellow-800'
        }`}>
          {product.availability}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-umep-text mb-2">
        {product.title}
      </h3>
      <p className="text-sm text-gray-500 mb-3">
        {product.brand} - Modelo {product.model}
      </p>

      {/* Description */}
      <p className="text-gray-600 mb-4 flex-1">
        {product.description}
      </p>

      {/* Specs */}
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-umep-text mb-2">Especificaciones:</h4>
        <ul className="space-y-1">
          {product.specs.slice(0, 4).map((spec, idx) => (
            <li key={idx} className="text-sm text-gray-600 flex items-start">
              <span className="text-primary mr-2">•</span>
              {spec}
            </li>
          ))}
        </ul>
      </div>

      {/* Price and CTA */}
      <div className="mt-auto pt-4 border-t border-umep-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs text-gray-500">Desde</p>
            <p className="text-2xl font-bold text-primary">
              ${product.price_from.toLocaleString('es-CO')}
            </p>
            <p className="text-xs text-gray-500">Garantía: {product.warranty}</p>
          </div>
        </div>
        <Button
          variant="primary"
          onClick={handleQuoteClick}
          className="w-full"
        >
          Solicitar cotización
        </Button>
      </div>
    </Card>
  );
}
