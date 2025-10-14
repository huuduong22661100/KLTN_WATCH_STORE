import { PRODUCT_ENDPOINTS } from '@/constants/api-url';
import { Product, ProductsResponse } from './types';

export const getProductsApi = async (
  page: number = 1,
  limit: number = 12,
  filters?: {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    search?: string;
  }
): Promise<ProductsResponse> => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  if (filters?.category) params.append('category', filters.category);
  if (filters?.minPrice) params.append('minPrice', filters.minPrice.toString());
  if (filters?.maxPrice) params.append('maxPrice', filters.maxPrice.toString());
  if (filters?.search) params.append('search', filters.search);

  const res = await fetch(`${PRODUCT_ENDPOINTS.LIST}?${params}`);

  if (!res.ok) {
    throw new Error('Không thể tải danh sách sản phẩm');
  }

  return res.json();
};

export const getProductDetailApi = async (id: string): Promise<Product> => {
  const res = await fetch(PRODUCT_ENDPOINTS.DETAIL(id));

  if (!res.ok) {
    throw new Error('Không thể tải chi tiết sản phẩm');
  }

  const result = await res.json();
  return result.data.product;
};

export const searchProductsApi = async (query: string): Promise<Product[]> => {
  const res = await fetch(`${PRODUCT_ENDPOINTS.SEARCH}?q=${encodeURIComponent(query)}`);

  if (!res.ok) {
    throw new Error('Tìm kiếm thất bại');
  }

  const result = await res.json();
  return result.data.products;
};