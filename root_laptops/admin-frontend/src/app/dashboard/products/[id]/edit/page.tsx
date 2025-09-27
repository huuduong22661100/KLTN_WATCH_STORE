'use client';

import React, { useEffect, useState } from 'react';
import { ProductForm } from '@/features/products/components/ProductForm';
import { fetchProductById, updateProduct } from '@/features/products/api';
import { Product, ProductPayload } from '@/features/products/types';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';

export default function EditProductPage() {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const params = useParams();
  const productId = params.id as string;

  useEffect(() => {
    const loadProduct = async () => {
      if (!productId) return;
      setLoading(true);
      setError(null);
      try {
        const response = await fetchProductById(productId);
        if (response.success && response.data) {
          setProduct(response.data);
        } else {
          setError(response.message || 'Failed to fetch product details.');
        }
      } catch (err: any) {
        setError(err.message || 'An unexpected error occurred while fetching product.');
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [productId]);

  const handleSubmit = async (payload: ProductPayload) => {
    if (!productId) return;
    setSubmitting(true);
    setError(null);
    try {
      const response = await updateProduct(productId, payload);
      if (response.success) {
        alert('Product updated successfully!');
        router.push('/dashboard/products'); // Redirect to product list
      } else {
        setError(response.message || 'Failed to update product');
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred during product update.');
    }
  };

  if (loading) return <p>Loading product details...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Edit Product</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <ProductForm initialData={product} onSubmit={handleSubmit} loading={submitting} />
    </div>
  );
}
