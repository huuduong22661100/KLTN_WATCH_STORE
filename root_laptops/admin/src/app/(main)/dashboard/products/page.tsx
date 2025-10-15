'use client';

import React, { useState } from 'react';
import { useProducts } from '@/features/products/hooks/useProducts';
import ProductTable from '@/features/products/components/ProductTable';
import { CreateProductDialog } from '@/features/products/components/CreateProductDialog';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Plus, Search } from 'lucide-react';
import { Pagination } from '@/shared/components/ui/pagination';
import { Product } from '@/shared/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import { useCategories } from '@/features/categories/hooks/useCategories';
import { useColors } from '@/features/colors/hooks/useColors';

export default function ProductsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string | 'all'>('all');
  const [colorFilter, setColorFilter] = useState<string | 'all'>('all');
  const [minPriceFilter, setMinPriceFilter] = useState('');
  const [maxPriceFilter, setMaxPriceFilter] = useState('');
  const [sortFilter, setSortFilter] = useState<string | 'newest'>('newest');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  
  const { data, isLoading, isError } = useProducts({
    page,
    limit: 10,
    search: searchQuery,
    ...(categoryFilter !== 'all' && { category: categoryFilter }),
    ...(colorFilter !== 'all' && { color: colorFilter }),
    ...(minPriceFilter && { minPrice: parseFloat(minPriceFilter) }),
    ...(maxPriceFilter && { maxPrice: parseFloat(maxPriceFilter) }),
    sort: sortFilter,
  });

  const { data: categories } = useCategories();
  const { data: colors } = useColors();

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
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Thêm sản phẩm
        </Button>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
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

        <Select value={categoryFilter} onValueChange={(value) => setCategoryFilter(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Lọc theo danh mục" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả danh mục</SelectItem>
            {categories?.map((category) => (
              <SelectItem key={category._id} value={category._id}>
                {category.category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={colorFilter} onValueChange={(value) => setColorFilter(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Lọc theo màu sắc" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả màu sắc</SelectItem>
            {colors?.map((color) => (
              <SelectItem key={color._id} value={color._id}>
                {color.color}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input
          type="number"
          placeholder="Giá từ..."
          value={minPriceFilter}
          onChange={(e) => setMinPriceFilter(e.target.value)}
          className="w-[120px]"
        />
        <Input
          type="number"
          placeholder="Giá đến..."
          value={maxPriceFilter}
          onChange={(e) => setMaxPriceFilter(e.target.value)}
          className="w-[120px]"
        />

        <Select value={sortFilter} onValueChange={setSortFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sắp xếp theo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Mới nhất</SelectItem>
            <SelectItem value="oldest">Cũ nhất</SelectItem>
            <SelectItem value="price_asc">Giá tăng dần</SelectItem>
            <SelectItem value="price_desc">Giá giảm dần</SelectItem>
            <SelectItem value="name_asc">Tên A-Z</SelectItem>
            <SelectItem value="name_desc">Tên Z-A</SelectItem>
          </SelectContent>
        </Select>
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

      {/* Create Product Dialog */}
      <CreateProductDialog 
        open={isCreateDialogOpen} 
        onOpenChange={setIsCreateDialogOpen} 
      />
    </div>
  );
}
