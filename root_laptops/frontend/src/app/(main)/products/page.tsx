'use client';

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { SlidersHorizontal } from "lucide-react";
import ProductCard from "@/features/products/components/ProductCard";
import ProductFilters from "@/features/products/components/ProductFilters";
import ProductSort from "@/features/products/components/ProductSort";
import { useProducts } from "@/features/products/hook/useProducts";
import { DOTS, usePagination } from "@/hook/usePagination";
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
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import type { Product } from "@/features/products/types";

export default function ProductPage() {
  const searchParams = useSearchParams();
  
  const [filters, setFilters] = useState({
    page: 1,
    limit: 20,
    category: "",
    color: "",
    minPrice: "",
    maxPrice: "",
    search: "",
    sort: "",
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Load filters from URL params on mount
  useEffect(() => {
    const categoryFromUrl = searchParams.get('category') || '';
    const colorFromUrl = searchParams.get('color') || '';
    const searchFromUrl = searchParams.get('search') || '';
    const sortFromUrl = searchParams.get('sort') || '';
    const minPriceFromUrl = searchParams.get('minPrice') || '';
    const maxPriceFromUrl = searchParams.get('maxPrice') || '';
    
    if (categoryFromUrl || colorFromUrl || searchFromUrl || sortFromUrl || minPriceFromUrl || maxPriceFromUrl) {
      setFilters(prev => ({
        ...prev,
        category: categoryFromUrl,
        color: colorFromUrl,
        search: searchFromUrl,
        sort: sortFromUrl,
        minPrice: minPriceFromUrl,
        maxPrice: maxPriceFromUrl,
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
    <main className="min-h-screen bg-gray-50">
      {}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Trang chủ</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="font-semibold">Sản phẩm</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="text-3xl font-bold">Danh sách sản phẩm</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold">Bộ lọc</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setFilters({
                    page: 1,
                    limit: 20,
                    category: "",
                    color: "",
                    minPrice: "",
                    maxPrice: "",
                    search: "",
                    sort: "",
                  })}
                  className="text-xs"
                >
                  Xóa tất cả
                </Button>
              </div>
              <ProductFilters 
                onFilterChange={handleFilterChange}
                initialCategory={filters.category}
                initialColor={filters.color}
                initialMinPrice={filters.minPrice}
                initialMaxPrice={filters.maxPrice}
              />
            </div>
          </aside>

          {}
          <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <SheetTrigger asChild className="lg:hidden fixed bottom-4 right-4 z-50">
              <Button size="lg" className="rounded-full shadow-lg">
                <SlidersHorizontal className="w-5 h-5 mr-2" />
                Bộ lọc
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Bộ lọc sản phẩm</SheetTitle>
              </SheetHeader>
              <div className="mt-6">
                <ProductFilters 
                  onFilterChange={handleFilterChange}
                  initialCategory={filters.category}
                  initialColor={filters.color}
                  initialMinPrice={filters.minPrice}
                  initialMaxPrice={filters.maxPrice}
                />
              </div>
            </SheetContent>
          </Sheet>

          {}
          <section className="flex-1">
            {}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-4">
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">{totalCount}</span> sản phẩm
                  </p>
                  
                  {}
                  <Button
                    variant="outline"
                    size="sm"
                    className="lg:hidden"
                    onClick={() => setIsFilterOpen(true)}
                  >
                    <SlidersHorizontal className="w-4 h-4 mr-2" />
                    Lọc
                  </Button>
                </div>

                <div className="flex items-center gap-3">
                  {}
                  <ProductSort onSortChange={handleFilterChange} />
                </div>
              </div>
            </div>

            {}
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mb-4"></div>
                <p className="text-gray-600">Đang tải sản phẩm...</p>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="text-red-500 text-5xl mb-4">⚠️</div>
                <p className="text-gray-900 font-semibold mb-2">Có lỗi xảy ra</p>
                <p className="text-gray-600">{(error as Error).message}</p>
              </div>
            ) : products.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="text-gray-400 text-6xl mb-4">🔍</div>
                <p className="text-gray-900 font-semibold mb-2">Không tìm thấy sản phẩm</p>
                <p className="text-gray-600 mb-4">Thử điều chỉnh bộ lọc của bạn</p>
                <Button
                  variant="outline"
                  onClick={() => setFilters({
                    page: 1,
                    limit: 20,
                    category: "",
                    color: "",
                    minPrice: "",
                    maxPrice: "",
                    search: "",
                    sort: "",
                  })}
                >
                  Xóa bộ lọc
                </Button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {products.map((product) => (
                    <ProductCard
                      key={product._id}
                      product={product}
                    />
                  ))}
                </div>

                {}
                {totalPages > 1 && (
                  <div className="mt-8 flex justify-center">
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious
                            onClick={() => handlePageChange(currentPage - 1)}
                            className={
                              currentPage <= 1
                                ? "pointer-events-none opacity-50"
                                : "cursor-pointer"
                            }
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
                                  className="cursor-pointer"
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
                            className={
                              currentPage >= totalPages
                                ? "pointer-events-none opacity-50"
                                : "cursor-pointer"
                            }
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
