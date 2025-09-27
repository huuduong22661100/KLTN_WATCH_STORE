'use client';

import React, { useState } from 'react';
import { NewsForm } from '@/features/news/components/NewsForm';
import { createNews } from '@/features/news/api';
import { NewsPayload } from '@/features/news/types';
import { useRouter } from 'next/navigation';

export default function AddNewsPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (payload: NewsPayload) => {
    setLoading(true);
    setError(null);
    try {
      const response = await createNews(payload);
      if (response.success) {
        alert('News article created successfully!');
        router.push('/dashboard/news'); // Redirect to news list
      } else {
        setError(response.message || 'Failed to create news article');
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred during news article creation.');
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Add New News Article</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <NewsForm onSubmit={handleSubmit} loading={loading} />
    </div>
  );
  }
