'use client';

import React, { useEffect, useState } from 'react';
import { NewsForm } from '@/features/news/components/NewsForm';
import { fetchNewsById, updateNews } from '@/features/news/api';
import { NewsArticle, NewsPayload } from '@/features/news/types';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';

export default function EditNewsPage() {
  const [newsArticle, setNewsArticle] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const params = useParams();
  const newsId = params.id as string;

  useEffect(() => {
    const loadNewsArticle = async () => {
      if (!newsId) return;
      setLoading(true);
      setError(null);
      try {
        const response = await fetchNewsById(newsId);
        if (response.success && response.data) {
          setNewsArticle(response.data);
        } else {
          setError(response.message || 'Failed to fetch news article details.');
        }
      } catch (err: any) {
        setError(err.message || 'An unexpected error occurred while fetching news article.');
      }
    };

    loadNewsArticle();
  }, [newsId]);

  const handleSubmit = async (payload: NewsPayload) => {
    if (!newsId) return;
    setSubmitting(true);
    setError(null);
    try {
      const response = await updateNews(newsId, payload);
      if (response.success) {
        alert('News article updated successfully!');
        router.push('/dashboard/news'); // Redirect to news list
      } else {
        setError(response.message || 'Failed to update news article');
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred during news article update.');
    }
  };

  if (loading) return <p>Loading news article details...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!newsArticle) return <p>News article not found.</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Edit News Article</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <NewsForm initialData={newsArticle} onSubmit={handleSubmit} loading={submitting} />
    </div>
  );
}
