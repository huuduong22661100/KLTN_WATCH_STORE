'use client';
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { Product } from '@/features/products/types';
import { ProductTopBar } from '@/features/products/components/ProductTopBar';
import { ProductDetails } from '@/features/products/components/ProductDetails';
import { ProductGallery } from '@/features/products/components/ProductGallery';
import styles from './page.module.css';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

const fetchProductById = async (id: string): Promise<Product> => {
  const res = await fetch(`${API_URL}/products/${id}`);
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await res.json();
  return data.data;
};

interface ProductDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = React.use(params);

  const { data: product, isLoading, isError } = useQuery<Product>({
    queryKey: ['product', id],
    queryFn: () => fetchProductById(id),
    enabled: !!id,
  });

  const [quantity, setQuantity] = useState(1);
  const [activeIndex, setActiveIndex] = useState(0);

  if (isLoading) {
    return <div className={styles.loadingMessage}>Loading product...</div>;
  }

  if (isError) {
    return <div className={styles.errorMessage}>Failed to fetch product. Please ensure the backend server is running and the product ID is correct.</div>;
  }

  if (!product) {
    return <div className={styles.notFoundMessage}>Product not found.</div>;
  }

  const totalPrice = product.price * quantity;
  const allImages = [product.images.mainImg, ...product.images.sliderImg];

  return (
    <>
      <main className={styles.mainContent}>
        <div className={styles.productLayout}>
          <ProductGallery images={allImages} productTitle={product.title} />
          
          <ProductDetails 
            product={product} 
            quantity={quantity}
            setQuantity={setQuantity}
          />
        </div>

        <ProductTopBar
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          product={product}
        />
      </main>
    </>
  );
}