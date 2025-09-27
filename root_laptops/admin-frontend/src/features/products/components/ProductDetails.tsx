'use client';
import React from 'react';
import Link from 'next/link';
import { Product } from '@/features/products/types';

interface ProductDetailsProps {
  product: Product;
  activeIndex: number;
}

export function ProductDetails({ product, activeIndex }: ProductDetailsProps) {
  const { title, price, sku, description, specifications } = product;

  const renderContent = () => {
    switch (activeIndex) {
      case 0: // About
        return (
          <div className="mt-4 space-y-4 text-gray-700 leading-relaxed prose max-w-none">
            {description.map((descItem, index) => (
              <div key={index}>
                <h3 className="font-semibold text-lg mb-2">{descItem.title}</h3>
                <div dangerouslySetInnerHTML={{ __html: descItem.description }} />
              </div>
            ))}
          </div>
        );
      case 1: // Details
        return (
          <ul className="mt-4 space-y-3 text-gray-700">
            {Object.entries(specifications).map(([key, value]) => (
              <li key={key} className="flex justify-between border-b pb-2 text-sm">
                <span className="font-semibold capitalize text-gray-600">{key.replace(/_/g, ' ')}</span>
                <span className="text-right max-w-[60%]">{value}</span>
              </li>
            ))}
          </ul>
        );
      case 2: // More Details from Description
        return (
          <div className="mt-4 space-y-4 text-gray-700 leading-relaxed prose max-w-none">
            {description.slice(1).map((descItem, index) => (
              <div key={index}>
                <h3 className="font-semibold text-lg mb-2">{descItem.title}</h3>
                <div dangerouslySetInnerHTML={{ __html: descItem.description }} />
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col">
      <div className="text-sm text-muted-foreground mb-2">
        <Link href="/" className="hover:text-primary">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/products" className="hover:text-primary">Products</Link>
      </div>
      <h1 className="text-3xl lg:text-4xl font-bold">{title}</h1>
      <Link href="#reviews" className="text-sm text-primary hover:underline mt-2">
        Be the first to review this product
      </Link>

      <div className="my-6">
        <span className="text-muted-foreground">Price per item: </span>
        <span className="text-xl font-bold">
          {price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
        </span>
      </div>

      {/* Render content based on activeIndex */}
      <div className="mt-6 pt-6 border-t border-border">
        {renderContent()}
      </div>

      <div className="mt-6 pt-6 border-t border-border text-sm text-muted-foreground">
        <span>SKU: {sku}</span>
      </div>
    </div>
  );
}
