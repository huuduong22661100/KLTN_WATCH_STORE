'use client';

import { useEffect, useState } from 'react';
import { Suspense } from 'react';
import CategoryBannerSection from '@/features/products/components/CategoryBannerSection';
import { getCategories } from '@/features/products/api/categories';
import { ProductCategory } from '@/features/products/types';
import styles from '../page.module.css';

function CategorySectionSkeleton() {
  return (
    <section className={styles.skeletonSection}>
      <div className={styles.skeletonHeader}>
        <div className={styles.skeletonTitle}></div>
        <div className={styles.skeletonLink}></div>
      </div>
      <div className={styles.skeletonGrid}>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className={styles.skeletonCard}>
            <div className={styles.skeletonImage}></div>
            <div className={styles.skeletonText}></div>
            <div className={styles.skeletonTextShort}></div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function DynamicProductSections() {
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await getCategories();
        setCategories(categoriesData?.data || []);
      } catch (err) {
        console.error('Failed to load categories:', err);
        setError('Không thể tải danh mục sản phẩm. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className={styles.productSectionsWrapper}>
        <div className={`${styles.container} ${styles.productSections}`}>
          {[1, 2, 3].map((i) => (
            <CategorySectionSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.productSectionsWrapper}>
        <div className={`${styles.container} ${styles.productSections}`}>
          <div style={{ textAlign: 'center', padding: '3rem 0' }}>
            <p style={{ color: '#666', fontSize: '1rem' }}>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (categories.length === 0) {
    return null;
  }

  return (
    <div className={styles.productSectionsWrapper}>
      <div className={`${styles.container} ${styles.productSections}`}>
        {categories.map((category: ProductCategory) => (
          <Suspense key={category._id} fallback={<CategorySectionSkeleton />}>
            <CategoryBannerSection category={category} />
          </Suspense>
        ))}
      </div>
    </div>
  );
}
