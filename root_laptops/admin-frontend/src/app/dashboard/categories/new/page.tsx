'use client';

import React, { useState } from 'react';
import { CategoryForm } from '@/features/categories/components/CategoryForm';
import { createCategory } from '@/features/categories/api';
import { CategoryPayload } from '@/features/categories/types';
import { useRouter } from 'next/navigation';

export default function AddCategoryPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (payload: CategoryPayload) => {
    setLoading(true);
    setError(null);
    try {
      const response = await createCategory(payload);
      if (response.success) {
        alert('Category created successfully!');
        router.push('/dashboard/categories'); // Redirect to category list
      } else {
        setError(response.message || 'Failed to create category');
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred during category creation.');
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Add New Category</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <CategoryForm onSubmit={handleSubmit} loading={loading} />
    </div>
  );
}
