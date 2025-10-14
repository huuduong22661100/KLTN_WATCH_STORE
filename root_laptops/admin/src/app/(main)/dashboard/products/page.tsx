'use client';

import React, { useState } from 'react';
import { useProducts } from '@/features/products/hooks/useProducts';
import ProductTable from '@/features/products/components/ProductTable';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Plus, Search } from 'lucide-react';
import { Pagination } from '@/shared/components/ui/pagination';
import { Product } from '@/shared/types';

export default function ProductsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  
  const { data, isLoading, isError } = useProducts({ 
    page, 
    limit: 10,
    search: searchQuery 
  });

  const handleSearch = () => {
    setSearchQuery(search);
    setPage(1);
  };

  const handleEdit = (product: Product) => {
    // TODO: Open edit dialog
    console.log('Edit product:', product);
  };

  const handleView = (product: Product) => {
    // TODO: Navigate to detail page
    console.log('View product:', product);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Quản lý sản phẩm</h1>
          <p className="text-muted-foreground">
            Quản lý danh sách sản phẩm trong cửa hàng
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Thêm sản phẩm
        </Button>
      </div>

      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm sản phẩm..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="pl-8"
          />
        </div>
        <Button onClick={handleSearch}>Tìm kiếm</Button>
      </div>

      {isLoading && (
        <div className="flex justify-center py-8">
          <div className="text-muted-foreground">Đang tải...</div>
        </div>
      )}
      
      {isError && (
        <div className="flex justify-center py-8">
          <div className="text-red-500">Lỗi khi tải dữ liệu sản phẩm</div>
        </div>
      )}
      
      {data && (
        <>
          <ProductTable 
            products={data.data} 
            onEdit={handleEdit}
            onView={handleView}
          />
          <Pagination
            currentPage={page}
            totalPages={data.totalPages}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
}
