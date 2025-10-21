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
import styles from './page.module.css';

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

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>Quản lý sản phẩm</h1>
          <p className={styles.description}>
            Quản lý danh sách sản phẩm trong cửa hàng
          </p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className={styles.buttonIcon} /> Thêm sản phẩm
        </Button>
      </div>

      <div className={styles.filtersContainer}>
        <div className={styles.searchContainer}>
          <Search className={styles.searchIcon} />
          <Input
            placeholder="Tìm kiếm sản phẩm..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className={styles.searchInput}
          />
        </div>
        <Button onClick={handleSearch}>Tìm kiếm</Button>

        <Select value={categoryFilter} onValueChange={(value) => setCategoryFilter(value)}>
          <SelectTrigger className={styles.filterSelect}>
            <SelectValue placeholder="Lọc theo danh mục" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả danh mục</SelectItem>
            {categories?.map((category) => (
              <SelectItem key={category._id} value={category._id}>
                {category.category}
              </SelectItem>
            )) || null}
          </SelectContent>
        </Select>

        <Select value={colorFilter} onValueChange={(value) => setColorFilter(value)}>
          <SelectTrigger className={styles.filterSelect}>
            <SelectValue placeholder="Lọc theo màu sắc" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả màu sắc</SelectItem>
            {colors?.map((color) => (
              <SelectItem key={color._id} value={color._id}>
                {color.color}
              </SelectItem>
            )) || null}
          </SelectContent>
        </Select>

        <Input
          type="number"
          placeholder="Giá từ..."
          value={minPriceFilter}
          onChange={(e) => setMinPriceFilter(e.target.value)}
          className={styles.priceInput}
        />
        <Input
          type="number"
          placeholder="Giá đến..."
          value={maxPriceFilter}
          onChange={(e) => setMaxPriceFilter(e.target.value)}
          className={styles.priceInput}
        />

        <Select value={sortFilter} onValueChange={setSortFilter}>
          <SelectTrigger className={styles.filterSelect}>
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
        <div className={styles.loadingContainer}>
          <div className={styles.loadingText}>Đang tải...</div>
        </div>
      )}
      
      {isError && (
        <div className={styles.errorContainer}>
          <div className={styles.errorText}>Lỗi khi tải dữ liệu sản phẩm</div>
        </div>
      )}
      
      {data && (
        <>
          <ProductTable 
            products={data.data}
          />
          <Pagination
            currentPage={page}
            totalPages={data.totalPages}
            onPageChange={setPage}
          />
        </>
      )}

      <CreateProductDialog 
        open={isCreateDialogOpen} 
        onOpenChange={setIsCreateDialogOpen} 
      />
    </div>
  );
}
