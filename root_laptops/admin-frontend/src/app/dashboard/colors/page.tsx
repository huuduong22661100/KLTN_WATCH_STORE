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
import { fetchColors, deleteColor } from '@/features/colors/api';
import { Color } from '@/features/colors/types';
import { useRouter } from 'next/navigation';

export default function ColorsPage() {
  const [colors, setColors] = useState<Color[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const loadColors = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchColors();
      if (response.success && response.data) {
        setColors(response.data);
      } else {
        setError(response.message || 'Failed to fetch colors');
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred while fetching colors.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadColors();
  }, [loadColors]);

  const handleAddColor = () => {
    router.push('/dashboard/colors/new');
  };

  const handleEditColor = (id: string) => {
    router.push(`/dashboard/colors/${id}/edit`);
  };

  const handleDeleteColor = async (id: string) => {
    if (confirm(`Are you sure you want to delete color ${id}?`)) {
      try {
        const response = await deleteColor(id);
        if (response.success) {
          alert('Color deleted successfully!');
          loadColors();
        } else {
          setError(response.message || 'Failed to delete color');
        }
      } catch (err: any) {
        setError(err.message || 'An unexpected error occurred during deletion.');
      }
    }
  };

  if (loading) return <p>Loading colors...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Color Management</h1>
        <Button onClick={handleAddColor}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Color
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Hex</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {colors.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center">No colors found.</TableCell>
            </TableRow>
          ) : (
            colors.map((color) => (
              <TableRow key={color._id}>
                <TableCell className="font-medium">{color._id}</TableCell>
                <TableCell>{color.name}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span
                      className="w-4 h-4 rounded-full border"
                      style={{ backgroundColor: color.hex }}
                    ></span>
                    {color.hex}
                  </div>
                </TableCell>
                <TableCell>{color.slug}</TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm" className="mr-2" onClick={() => handleEditColor(color._id)}>
                    Edit
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDeleteColor(color._id)}>
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
