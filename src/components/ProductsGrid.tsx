import React from 'react';
import ProductCard from './ProductCard';
import products from '@/content/products.json';

interface ProductsGridProps {
  limit?: number;
}

export default function ProductsGrid({ limit }: ProductsGridProps) {
  const displayProducts = limit ? products.slice(0, limit) : products;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {displayProducts.map((product) => (
        <ProductCard key={product.slug} product={product} />
      ))}
    </div>
  );
}
