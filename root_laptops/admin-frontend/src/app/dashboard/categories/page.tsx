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
import { fetchCategories, deleteCategory } from '@/features/categories/api';
import { Category } from '@/features/categories/types';
import { useRouter } from 'next/navigation';

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const loadCategories = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchCategories();
      if (response.success && response.data) {
        setCategories(response.data);
      } else {
        setError(response.message || 'Failed to fetch categories');
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred while fetching categories.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  const handleAddCategory = () => {
    router.push('/dashboard/categories/new');
  };

  const handleEditCategory = (id: string) => {
    router.push(`/dashboard/categories/${id}/edit`);
  };

  const handleDeleteCategory = async (id: string) => {
    if (confirm(`Are you sure you want to delete category ${id}?`)) {
      try {
        const response = await deleteCategory(id);
        if (response.success) {
          alert('Category deleted successfully!');
          loadCategories();
        } else {
          setError(response.message || 'Failed to delete category');
        }
      } catch (err: any) {
        setError(err.message || 'An unexpected error occurred during deletion.');
      }
    }
  };

  if (loading) return <p>Loading categories...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Category Management</h1>
        <Button onClick={handleAddCategory}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Category
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Parent Category</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center">No categories found.</TableCell>
            </TableRow>
          ) : (
            categories.map((category) => (
              <TableRow key={category._id}>
                <TableCell className="font-medium">{category._id}</TableCell>
                <TableCell>{category.name}</TableCell>
                <TableCell>
                  {typeof category.parent_id === 'object' && category.parent_id !== null
                    ? category.parent_id.name
                    : 'N/A'}
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm" className="mr-2" onClick={() => handleEditCategory(category._id)}>
                    Edit
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDeleteCategory(category._id)}>
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
