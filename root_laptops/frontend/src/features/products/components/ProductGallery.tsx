'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { ProductImage } from '@/features/products/types';
import styles from './ProductGallery.module.css';

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
      <div className={styles.noImagesWrapper}>
        <p className={styles.noImagesText}>No images available</p>
      </div>
    );
  }

  return (
    <div className={styles.galleryWrapper}>
      <div className={styles.mainImageWrapper}>
        {activeImg && (
          <>
            <Image
              src={activeImg}
              fill
              className={styles.mainImage}
              alt={productTitle}
              priority
            />
            
            {images.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  className={`${styles.navButton} ${styles.prevButton}`}
                  aria-label="Previous image"
                >
                  <ChevronLeft className={styles.navIcon} />
                </button>
                <button
                  onClick={handleNextImage}
                  className={`${styles.navButton} ${styles.nextButton}`}
                  aria-label="Next image"
                >
                  <ChevronRight className={styles.navIcon} />
                </button>
              </>
            )}

            <button
              onClick={() => setIsZoomed(!isZoomed)}
              className={styles.zoomButton}
              aria-label="Zoom image"
            >
              <Maximize2 className={styles.zoomIcon} />
            </button>

            <div className={styles.imageCounter}>
              {activeThumbIndex + 1} / {images.length}
            </div>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className={styles.thumbnailGrid}>
          {images.map((img, index) => (
            <button
              key={img.url || index}
              onClick={() => handleImageSelect(img.url, index)}
              className={`${styles.thumbnailButton} ${
                activeThumbIndex === index 
                  ? styles.thumbnailActive
                  : styles.thumbnailInactive
              }`}
              aria-label={`View image ${index + 1}`}
            >
              <Image 
                src={img.url} 
                fill
                className={styles.thumbnailImage} 
                alt={img.alt_text || `${productTitle} - Image ${index + 1}`}
              />
            </button>
          ))}
        </div>
      )}

      {isZoomed && (
        <div 
          className={styles.zoomOverlay}
          onClick={() => setIsZoomed(false)}
        >
          <button
            className={styles.closeZoomButton}
            onClick={() => setIsZoomed(false)}
          >
            ×
          </button>
          <div className={styles.zoomedImageWrapper}>
            <Image
              src={activeImg}
              fill
              className={styles.zoomedImage}
              alt={productTitle}
            />
          </div>
        </div>
      )}
    </div>
  );
}
