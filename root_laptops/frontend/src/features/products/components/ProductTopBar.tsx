'use client';
import React from 'react';
import { Product } from '@/features/products/types';
import styles from './ProductTopBar.module.css';

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
          <div className={styles.descriptionContent}>
            {description.map((descItem, index) => (
              <div key={index} className={styles.descriptionItem}>
                <h3 className={styles.descriptionTitle}>{descItem.title}</h3>
                <div 
                  className={styles.descriptionText}
                  dangerouslySetInnerHTML={{ __html: descItem.description }} 
                />
              </div>
            ))}
          </div>
        );
      case 1: 
        return (
          <div className={styles.specificationsTable}>
            <div className={styles.specificationsHeader}>
              <h3 className={styles.specificationsTitle}>Technical Specifications</h3>
            </div>
            <div className={styles.specificationsBody}>
              {Object.entries(specifications).map(([key, value], index) => (
                <div 
                  key={key} 
                  className={`${styles.specificationsRow} ${index % 2 === 0 ? styles.specificationsRowEven : styles.specificationsRowOdd}`}
                >
                  <span className={styles.specificationsLabel}>
                    {key.replace(/_/g, ' ')}
                  </span>
                  <span className={styles.specificationsValue}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        );
      case 2: 
        return (
          <div className={styles.reviewsSection}>
            <div className={styles.reviewsContent}>
              <div className={styles.reviewsIcon}>⭐</div>
              <h3 className={styles.reviewsTitle}>No Reviews Yet</h3>
              <p className={styles.reviewsText}>
                Be the first to review this product and share your experience with others.
              </p>
              <button className={styles.writeReviewButton}>
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
    <div className={styles.topBarWrapper}>
      <div className={styles.tabsContainer}>
        <button
          onClick={() => setActiveIndex(0)}
          className={`${styles.tabButton} ${
            activeIndex === 0 
              ? styles.tabActive 
              : styles.tabInactive
          }`}
        >
          About Product
        </button>
        <button
          onClick={() => setActiveIndex(1)}
          className={`${styles.tabButton} ${
            activeIndex === 1 
              ? styles.tabActive 
              : styles.tabInactive
          }`}
        >
          Specifications
        </button>
        <button
          onClick={() => setActiveIndex(2)}
          className={`${styles.tabButton} ${
            activeIndex === 2 
              ? styles.tabActive 
              : styles.tabInactive
          }`}
        >
          Reviews
        </button>
      </div>

      <div className={styles.contentArea}>
        {renderContent()}
      </div>
    </div>
  );
}