'use client';

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { SlidersHorizontal } from "lucide-react";
import ProductCard from "@/features/products/components/ProductCard";
import ProductFilters from "@/features/products/components/ProductFilters";
import ProductSort from "@/features/products/components/ProductSort";
import { useProducts } from "@/features/products/hook/useProducts";
import { DOTS, usePagination } from "@/hook/usePagination";
import styles from './page.module.css';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/shared/components/ui/pagination";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { Product } from "@/features/products/types";

function ProductPageContent() {
  const searchParams = useSearchParams();
  
  const [filters, setFilters] = useState({
    page: 1,
    limit: 20,
    category: "",
    color: "",
    minPrice: undefined as number | undefined,
    maxPrice: undefined as number | undefined,
    search: "",
    sort: "",
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const categoryFromUrl = searchParams.get('category') || '';
    const colorFromUrl = searchParams.get('color') || '';
    const searchFromUrl = searchParams.get('search') || '';
    const sortFromUrl = searchParams.get('sort') || '';
    const minPriceFromUrl = searchParams.get('minPrice');
    const maxPriceFromUrl = searchParams.get('maxPrice');
    
    if (categoryFromUrl || colorFromUrl || searchFromUrl || sortFromUrl || minPriceFromUrl || maxPriceFromUrl) {
      setFilters(prev => ({
        ...prev,
        category: categoryFromUrl,
        color: colorFromUrl,
        search: searchFromUrl,
        sort: sortFromUrl,
        minPrice: minPriceFromUrl ? Number(minPriceFromUrl) : undefined,
        maxPrice: maxPriceFromUrl ? Number(maxPriceFromUrl) : undefined,
      }));
    }
  }, [searchParams]);

  const { data, isLoading, error } = useProducts(filters);

  const handleFilterChange = (
    filterName: string,
    value: string | number | number[]
  ) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      page: 1, // Reset to first page on filter change
      [filterName]: value,
    }));
  };

  const handlePageChange = (newPage: number) => {
    if (typeof newPage !== "number") return;
    setFilters((prevFilters) => ({ ...prevFilters, page: newPage }));
  };

  const currentPage = data?.page || 1;
  const totalCount = data?.total || 0;
  const pageSize = data?.limit || 20;
  const totalPages = data?.totalPages || 1;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount: 1,
    pageSize,
  });

  const products: Product[] = data?.data || [];

  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.breadcrumbWrapper}>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/">Trang chủ</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage style={{ fontWeight: 600 }}>Sản phẩm</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <h1 className={styles.title}>Danh sách sản phẩm</h1>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.layout}>
          <aside className={styles.sidebar}>
            <div className={styles.sidebarCard}>
              <div className={styles.sidebarHeader}>
                <h2 className={styles.sidebarTitle}>Bộ lọc</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setFilters({
                    page: 1,
                    limit: 20,
                    category: "",
                    color: "",
                    minPrice: undefined,
                    maxPrice: undefined,
                    search: "",
                    sort: "",
                  })}
                  style={{ fontSize: '0.75rem' }}
                >
                  Xóa tất cả
                </Button>
              </div>
              <ProductFilters 
                onFilterChange={handleFilterChange}
                initialCategory={filters.category}
                initialColor={filters.color}
                initialMinPrice={filters.minPrice?.toString()}
                initialMaxPrice={filters.maxPrice?.toString()}
              />
            </div>
          </aside>

          <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <SheetTrigger asChild className={styles.fixedFilterButton}>
              <Button size="lg" style={{ borderRadius: '9999px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}>
                <SlidersHorizontal style={{ width: '1.25rem', height: '1.25rem', marginRight: '0.5rem' }} />
                Bộ lọc
              </Button>
            </SheetTrigger>
            <SheetContent side="left" style={{ width: '20rem', overflowY: 'auto' }}>
              <SheetHeader>
                <SheetTitle>Bộ lọc sản phẩm</SheetTitle>
              </SheetHeader>
              <div style={{ marginTop: '1.5rem' }}>
                <ProductFilters 
                  onFilterChange={handleFilterChange}
                  initialCategory={filters.category}
                  initialColor={filters.color}
                  initialMinPrice={filters.minPrice?.toString()}
                  initialMaxPrice={filters.maxPrice?.toString()}
                />
              </div>
            </SheetContent>
          </Sheet>

          <section className={styles.mainContent}>
            <div className={styles.toolbar}>
              <div className={styles.toolbarContent}>
                <div className={styles.toolbarLeft}>
                  <p className={styles.productCount}>
                    <span className={styles.productCountBold}>{totalCount}</span> sản phẩm
                  </p>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    className={styles.fixedFilterButton}
                    onClick={() => setIsFilterOpen(true)}
                  >
                    <SlidersHorizontal style={{ width: '1rem', height: '1rem', marginRight: '0.5rem' }} />
                    Lọc
                  </Button>
                </div>

                <div className={styles.toolbarRight}>
                  <ProductSort onSortChange={handleFilterChange} />
                </div>
              </div>
            </div>

            {isLoading ? (
              <div className={styles.loadingContainer}>
                <div className={styles.spinner}></div>
                <p className={styles.loadingText}>Đang tải sản phẩm...</p>
              </div>
            ) : error ? (
              <div className={styles.errorContainer}>
                <div className={styles.errorIcon}>⚠️</div>
                <p className={styles.errorTitle}>Có lỗi xảy ra</p>
                <p className={styles.errorMessage}>{(error as Error).message}</p>
              </div>
            ) : products.length === 0 ? (
              <div className={styles.emptyContainer}>
                <div className={styles.emptyIcon}>🔍</div>
                <p className={styles.emptyTitle}>Không tìm thấy sản phẩm</p>
                <p className={styles.emptyMessage}>Thử điều chỉnh bộ lọc của bạn</p>
                <Button
                  variant="outline"
                  onClick={() => setFilters({
                    page: 1,
                    limit: 20,
                    category: "",
                    color: "",
                    minPrice: undefined,
                    maxPrice: undefined,
                    search: "",
                    sort: "",
                  })}
                >
                  Xóa bộ lọc
                </Button>
              </div>
            ) : (
              <>
                <div className={styles.productsGrid}>
                  {products.map((product) => (
                    <ProductCard
                      key={product._id}
                      product={product}
                    />
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className={styles.paginationWrapper}>
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious
                            onClick={() => handlePageChange(currentPage - 1)}
                            style={{
                              pointerEvents: currentPage <= 1 ? 'none' : 'auto',
                              opacity: currentPage <= 1 ? 0.5 : 1,
                              cursor: currentPage <= 1 ? 'default' : 'pointer'
                            }}
                          />
                        </PaginationItem>
                        {paginationRange?.map(
                          (pageNumber: number | string, index: number) => {
                            if (pageNumber === DOTS) {
                              return (
                                <PaginationItem key={index}>
                                  <PaginationEllipsis />
                                </PaginationItem>
                              );
                            }
                            return (
                              <PaginationItem key={index}>
                                <PaginationLink
                                  onClick={() =>
                                    handlePageChange(pageNumber as number)
                                  }
                                  isActive={pageNumber === currentPage}
                                  style={{ cursor: 'pointer' }}
                                >
                                  {pageNumber}
                                </PaginationLink>
                              </PaginationItem>
                            );
                          }
                        )}
                        <PaginationItem>
                          <PaginationNext
                            onClick={() => handlePageChange(currentPage + 1)}
                            style={{
                              pointerEvents: currentPage >= totalPages ? 'none' : 'auto',
                              opacity: currentPage >= totalPages ? 0.5 : 1,
                              cursor: currentPage >= totalPages ? 'default' : 'pointer'
                            }}
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                )}
              </>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}

export default function ProductPage() {
  return (
    <Suspense fallback={
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <div style={{ textAlign: 'center' }}>
          <div className="spinner" style={{ margin: '0 auto 1rem' }}></div>
          <p>Đang tải...</p>
        </div>
      </div>
    }>
      <ProductPageContent />
    </Suspense>
  );
}
