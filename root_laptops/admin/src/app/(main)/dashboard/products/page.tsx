'use client';

import React from 'react';
import { useProducts } from '@/features/products/hooks/useProducts';
import ProductTable from '@/features/products/components/ProductTable';
import { Button } from '@/shared/components/ui/button';

export default function ProductsPage() {
  const { data: products, isLoading, isError } = useProducts();

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Product Management</h1>
        <Button>Add Product</Button>
      </div>
      {isLoading && <p>Loading products...</p>}
      {isError && <p>Error fetching products.</p>}
      {products && <ProductTable products={products} />}
    </div>
  );
}
