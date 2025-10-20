'use client';
import React from 'react';
import { Product } from '@/features/products/types';

interface ProductTopBarProps {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  product: Product;
}

export function ProductTopBar({
  activeIndex,
  setActiveIndex,
  product,
}: ProductTopBarProps) {
  const { description, specifications } = product;

  const renderContent = () => {
    switch (activeIndex) {
      case 0: 
        return (
          <div className="mt-6 space-y-6 text-foreground leading-relaxed prose prose-lg max-w-none">
            {description.map((descItem, index) => (
              <div key={index} className="bg-card rounded-lg p-6 border">
                <h3 className="font-bold text-2xl mb-4 text-primary">{descItem.title}</h3>
                <div 
                  className="text-muted-foreground"
                  dangerouslySetInnerHTML={{ __html: descItem.description }} 
                />
              </div>
            ))}
          </div>
        );
      case 1: 
        return (
          <div className="mt-6 bg-card rounded-lg border overflow-hidden">
            <div className="bg-muted/50 px-6 py-4 border-b">
              <h3 className="font-bold text-xl">Technical Specifications</h3>
            </div>
            <div className="divide-y">
              {Object.entries(specifications).map(([key, value], index) => (
                <div 
                  key={key} 
                  className={`flex px-6 py-4 ${index % 2 === 0 ? 'bg-muted/10' : 'bg-background'}`}
                >
                  <span className="font-semibold capitalize text-foreground w-1/3">
                    {key.replace(/_/g, ' ')}
                  </span>
                  <span className="text-muted-foreground w-2/3">{value}</span>
                </div>
              ))}
            </div>
          </div>
        );
      case 2: 
        return (
          <div className="mt-6 bg-card rounded-lg p-8 border text-center">
            <div className="max-w-md mx-auto space-y-4">
              <div className="text-6xl">⭐</div>
              <h3 className="font-bold text-2xl">No Reviews Yet</h3>
              <p className="text-muted-foreground">
                Be the first to review this product and share your experience with others.
              </p>
              <button className="mt-4 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                Write a Review
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="border-t border-border mt-12 pt-8">
      {}
      <div className="flex gap-1 mb-8 border-b">
        <button
          onClick={() => setActiveIndex(0)}
          className={`px-6 py-3 font-semibold text-base transition-all relative ${
            activeIndex === 0 
              ? 'text-primary border-b-2 border-primary' 
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          About Product
        </button>
        <button
          onClick={() => setActiveIndex(1)}
          className={`px-6 py-3 font-semibold text-base transition-all relative ${
            activeIndex === 1 
              ? 'text-primary border-b-2 border-primary' 
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Specifications
        </button>
        <button
          onClick={() => setActiveIndex(2)}
          className={`px-6 py-3 font-semibold text-base transition-all relative ${
            activeIndex === 2 
              ? 'text-primary border-b-2 border-primary' 
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Reviews
        </button>
      </div>

      {}
      <div className="min-h-[400px]">
        {renderContent()}
      </div>
    </div>
  );
}