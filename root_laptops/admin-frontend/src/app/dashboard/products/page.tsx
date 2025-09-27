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
import { fetchProducts, deleteProduct } from '@/features/products/api';
import { Product } from '@/features/products/types';
import { useRouter } from 'next/navigation';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchProducts();
      if (response.success && response.data) {
        setProducts(response.data);
      } else {
        setError(response.message || 'Failed to fetch products');
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred while fetching products.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const handleAddProduct = () => {
    router.push('/dashboard/products/new'); // Navigate to a product creation form
  };

  const handleEditProduct = (id: string) => {
    router.push(`/dashboard/products/${id}/edit`); // Navigate to a product edit form
  };

  const handleDeleteProduct = async (id: string) => {
    if (confirm(`Are you sure you want to delete product ${id}?`)) {
      try {
        const response = await deleteProduct(id);
        if (response.success) {
          alert('Product deleted successfully!');
          loadProducts(); // Reload products after deletion
        } else {
          setError(response.message || 'Failed to delete product');
        }
      } catch (err: any) {
        setError(err.message || 'An unexpected error occurred during deletion.');
      }
    }
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Product Management</h1>
        <Button onClick={handleAddProduct}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Product
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Brand</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center">No products found.</TableCell>
            </TableRow>
          ) : (
            products.map((product) => (
              <TableRow key={product._id}>
                <TableCell className="font-medium">{product._id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>{/* TODO: Populate category name */}</TableCell>
                <TableCell>{/* TODO: Populate brand name */}</TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm" className="mr-2" onClick={() => handleEditProduct(product._id)}>
                    Edit
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDeleteProduct(product._id)}>
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
