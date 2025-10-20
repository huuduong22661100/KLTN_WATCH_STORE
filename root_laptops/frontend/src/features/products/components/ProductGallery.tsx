'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { ProductImage } from '@/features/products/types';

interface ProductGalleryProps {
  images: ProductImage[];
  productTitle: string;
}

export function ProductGallery({ images, productTitle }: ProductGalleryProps) {
  const [activeImg, setActiveImg] = useState('');
  const [activeThumbIndex, setActiveThumbIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    if (images && images.length > 0) {
      setActiveImg(images[0].url);
      setActiveThumbIndex(0);
    }
  }, [images]);

  const handleImageSelect = (url: string, index: number) => {
    setActiveImg(url);
    setActiveThumbIndex(index);
  };

  const handlePrevImage = () => {
    const newIndex = activeThumbIndex > 0 ? activeThumbIndex - 1 : images.length - 1;
    setActiveImg(images[newIndex].url);
    setActiveThumbIndex(newIndex);
  };

  const handleNextImage = () => {
    const newIndex = activeThumbIndex < images.length - 1 ? activeThumbIndex + 1 : 0;
    setActiveImg(images[newIndex].url);
    setActiveThumbIndex(newIndex);
  };

  if (!images || images.length === 0) {
    return (
      <div className="flex items-center justify-center h-[500px] bg-muted rounded-lg">
        <p className="text-muted-foreground">No images available</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 lg:sticky lg:top-8 lg:self-start">
      {/* Main Image Display */}
      <div className="relative w-full aspect-square bg-background rounded-xl border overflow-hidden group">
        {activeImg && (
          <>
            <Image
              src={activeImg}
              fill
              className="object-contain p-8 transition-transform duration-300"
              alt={productTitle}
              priority
            />
            
            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}

            {/* Zoom Button */}
            <button
              onClick={() => setIsZoomed(!isZoomed)}
              className="absolute top-4 right-4 bg-background/80 hover:bg-background p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Zoom image"
            >
              <Maximize2 className="h-5 w-5" />
            </button>

            {/* Image Counter */}
            <div className="absolute bottom-4 right-4 bg-background/80 px-3 py-1 rounded-full text-sm font-medium">
              {activeThumbIndex + 1} / {images.length}
            </div>
          </>
        )}
      </div>

      {/* Thumbnail Gallery */}
      {images.length > 1 && (
        <div className="grid grid-cols-6 gap-2">
          {images.map((img, index) => (
            <button
              key={img.url || index}
              onClick={() => handleImageSelect(img.url, index)}
              className={`relative aspect-square rounded-md border overflow-hidden transition-all hover:border-primary/50 ${
                activeThumbIndex === index 
                  ? 'border-primary ring-1 ring-primary/20' 
                  : 'border-border'
              }`}
              aria-label={`View image ${index + 1}`}
            >
              <Image 
                src={img.url} 
                fill
                className="object-cover p-0.5" 
                alt={img.alt_text || `${productTitle} - Image ${index + 1}`}
              />
            </button>
          ))}
        </div>
      )}

      {}
      {isZoomed && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setIsZoomed(false)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300 text-4xl font-light"
            onClick={() => setIsZoomed(false)}
          >
            ×
          </button>
          <div className="relative w-full h-full max-w-6xl max-h-[90vh]">
            <Image
              src={activeImg}
              fill
              className="object-contain"
              alt={productTitle}
            />
          </div>
        </div>
      )}
    </div>
  );
}
