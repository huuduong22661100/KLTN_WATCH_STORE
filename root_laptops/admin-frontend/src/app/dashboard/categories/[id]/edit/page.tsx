'use client';

import React, { useEffect, useState } from 'react';
import { CategoryForm } from '@/features/categories/components/CategoryForm';
import { fetchCategoryById, updateCategory } from '@/features/categories/api';
import { Category, CategoryPayload } from '@/features/categories/types';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';

export default function EditCategoryPage() {
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const params = useParams();
  const categoryId = params.id as string;

  useEffect(() => {
    const loadCategory = async () => {
      if (!categoryId) return;
      setLoading(true);
      setError(null);
      try {
        const response = await fetchCategoryById(categoryId);
        if (response.success && response.data) {
          setCategory(response.data);
        } else {
          setError(response.message || 'Failed to fetch category details.');
        }
      } catch (err: any) {
        setError(err.message || 'An unexpected error occurred while fetching category.');
      }
    };

    loadCategory();
  }, [categoryId]);

  const handleSubmit = async (payload: CategoryPayload) => {
    if (!categoryId) return;
    setSubmitting(true);
    setError(null);
    try {
      const response = await updateCategory(categoryId, payload);
      if (response.success) {
        alert('Category updated successfully!');
        router.push('/dashboard/categories'); // Redirect to category list
      } else {
        setError(response.message || 'Failed to update category');
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred during category update.');
    }
  };

  if (loading) return <p>Loading category details...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!category) return <p>Category not found.</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Edit Category</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <CategoryForm initialData={category} onSubmit={handleSubmit} loading={submitting} />
    </div>
  );
}
