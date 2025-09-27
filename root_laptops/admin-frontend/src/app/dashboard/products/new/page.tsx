'use client';

import React, { useState } from 'react';
import { ProductForm } from '@/features/products/components/ProductForm';
import { createProduct } from '@/features/products/api';
import { ProductPayload } from '@/features/products/types';
import { useRouter } from 'next/navigation';

export default function AddProductPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (payload: ProductPayload) => {
    setLoading(true);
    setError(null);
    try {
      const response = await createProduct(payload);
      if (response.success) {
        alert('Product created successfully!');
        router.push('/dashboard/products'); // Redirect to product list
      } else {
        setError(response.message || 'Failed to create product');
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred during product creation.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Add New Product</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <ProductForm onSubmit={handleSubmit} loading={loading} />
    </div>
  );
}
