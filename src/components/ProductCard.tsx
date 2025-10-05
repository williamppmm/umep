'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
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
  features: string[];
  datasheetUrl?: string;
}

interface ProductCardProps {
  product: Product;
  onQuoteClick?: (product: Product) => void;
}

export default function ProductCard({ product, onQuoteClick }: ProductCardProps) {
  const [hasImageError, setHasImageError] = React.useState(false);
  const [showImageModal, setShowImageModal] = React.useState(false);

  const fallbackLabel = React.useMemo(() => {
    const normalized = product.category.toLowerCase();
    if (normalized.includes('industrial')) {
      return 'IND';
    }
    if (normalized.includes('prec')) {
      return 'LAB';
    }
    if (normalized.includes('comer')) {
      return 'COM';
    }
    return normalized.slice(0, 3).toUpperCase();
  }, [product.category]);

  const featurePreview = React.useMemo(() => product.features.slice(0, 3), [product.features]);

  const handleQuoteClick = () => {
    if (onQuoteClick) {
      onQuoteClick(product);
    } else {
      const contactForm = document.getElementById('contacto');
      contactForm?.scrollIntoView({ behavior: 'smooth' });
    }

    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'view_product', {
        event_category: 'ecommerce',
        event_label: product.title,
        value: product.price_from,
      });
    }
  };

  const openImageModal = React.useCallback(() => {
    if (product.image && !hasImageError) {
      setShowImageModal(true);
    }
  }, [hasImageError, product.image]);

  const closeImageModal = React.useCallback(() => {
    setShowImageModal(false);
  }, []);

  React.useEffect(() => {
    if (!showImageModal) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowImageModal(false);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [showImageModal]);

  return (
    <Card className="flex flex-col h-full">
      <div
        className="relative w-full h-48 rounded-xl overflow-hidden bg-gray-100 mb-4 group cursor-pointer"
        onClick={openImageModal}
        role={product.image ? 'button' : undefined}
        tabIndex={product.image ? 0 : -1}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            openImageModal();
          }
        }}
        aria-label={product.image ? `Ampliar imagen de ${product.title}` : undefined}
      >
        {product.image && !hasImageError ? (
          <>
            <Image
              src={product.image}
              alt={product.imageAlt || product.title}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              className="object-contain p-4 transition-transform duration-200 group-hover:scale-105"
              onError={() => setHasImageError(true)}
            />
            <div className="absolute bottom-2 right-2 rounded-full bg-black/60 text-white text-xs px-3 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
              Ver imagen
            </div>
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-2xl font-semibold text-gray-400">
            {fallbackLabel}
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 mb-3">
        <span className="bg-accent/10 text-umep-text px-3 py-1 rounded-full text-xs font-medium">
          {product.category}
        </span>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            product.availability === 'En stock'
              ? 'bg-green-100 text-green-800'
              : 'bg-yellow-100 text-yellow-800'
          }`}
        >
          {product.availability}
        </span>
      </div>

      <h3 className="text-xl font-bold text-umep-text mb-2">{product.title}</h3>
      <p className="text-sm text-gray-500 mb-3">
        {product.brand} - Modelo {product.model}
      </p>

      <p className="text-gray-600 mb-4 flex-1">{product.description}</p>

      <div className="mb-4">
        <h4 className="text-sm font-semibold text-umep-text mb-2">Especificaciones:</h4>
        <ul className="space-y-1">
          {product.specs.slice(0, 4).map((spec, idx) => (
            <li key={idx} className="text-sm text-gray-600 flex items-start">
              <span className="text-primary mr-2">-</span>
              {spec}
            </li>
          ))}
        </ul>
      </div>

      {featurePreview.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-umep-text mb-2">Caracteristicas destacadas:</h4>
          <ul className="space-y-1">
            {featurePreview.map((feature, idx) => (
              <li key={idx} className="text-sm text-gray-600 flex items-start">
                <span className="text-primary mr-2">*</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      )}

      {product.datasheetUrl && (
        <Link
          href={product.datasheetUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-semibold text-primary hover:underline mb-4"
        >
          Ver ficha tecnica completa
        </Link>
      )}

      <div className="mt-auto pt-4 border-t border-umep-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs text-gray-500">Desde</p>
            <p className="text-2xl font-bold text-primary">
              ${product.price_from.toLocaleString('es-CO')}
            </p>
            <p className="text-xs text-gray-500">Garantia: {product.warranty}</p>
          </div>
        </div>
        <Button variant="primary" onClick={handleQuoteClick} className="w-full">
          Solicitar cotizacion
        </Button>
      </div>

      {showImageModal && product.image && !hasImageError && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex flex-col items-center justify-center p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`Imagen ampliada de ${product.title}`}
          onClick={closeImageModal}
        >
          <button
            type="button"
            onClick={closeImageModal}
            className="self-end mb-4 text-white text-sm font-semibold hover:underline"
          >
            Cerrar
          </button>
          <div
            className="relative w-full max-w-4xl h-[70vh] bg-white rounded-xl overflow-hidden"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={product.image}
              alt={product.imageAlt || product.title}
              fill
              sizes="(min-width: 1024px) 1024px, 100vw"
              className="object-contain bg-white"
            />
          </div>
        </div>
      )}
    </Card>
  );
}
