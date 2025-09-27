'use client';

import React, { useEffect, useState, useCallback } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/ui/table';
import { Button } from '@/shared/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { fetchNews, deleteNews } from '@/features/news/api';
import { NewsArticle } from '@/features/news/types';
import { useRouter } from 'next/navigation';

export default function NewsPage() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const loadNews = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchNews();
      if (response.success && response.data) {
        setNews(response.data);
      } else {
        setError(response.message || 'Failed to fetch news articles');
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred while fetching news articles.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadNews();
  }, [loadNews]);

  const handleAddNews = () => {
    router.push('/dashboard/news/new');
  };

  const handleEditNews = (id: string) => {
    router.push(`/dashboard/news/${id}/edit`);
  };

  const handleDeleteNews = async (id: string) => {
    if (confirm(`Are you sure you want to delete news article ${id}?`)) {
      try {
        const response = await deleteNews(id);
        if (response.success) {
          alert('News article deleted successfully!');
          loadNews();
        } else {
          setError(response.message || 'Failed to delete news article');
        }
      } catch (err: any) {
        setError(err.message || 'An unexpected error occurred during deletion.');
      }
    }
  };

  if (loading) return <p>Loading news articles...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">News Management</h1>
        <Button onClick={handleAddNews}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add News Article
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead>Author</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {news.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center">No news articles found.</TableCell>
            </TableRow>
          ) : (
            news.map((article) => (
              <TableRow key={article._id}>
                <TableCell className="font-medium">{article._id}</TableCell>
                <TableCell>{article.title}</TableCell>
                <TableCell>{article.slug}</TableCell>
                <TableCell>{article.author_id}</TableCell> {/* TODO: Populate author name */}
                <TableCell className="text-right">
                  <Button variant="outline" size="sm" className="mr-2" onClick={() => handleEditNews(article._id)}>
                    Edit
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDeleteNews(article._id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
