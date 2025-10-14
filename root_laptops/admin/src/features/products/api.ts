import { PRODUCT_ENDPOINTS } from '@/constants/api-url';
import { Product, ProductFormData, PaginatedResponse, QueryParams } from '@/shared/types';

export const getProducts = async (params?: QueryParams): Promise<PaginatedResponse<Product>> => {
  const queryString = params ? '?' + new URLSearchParams(params as any).toString() : '';
  const res = await fetch(PRODUCT_ENDPOINTS.LIST + queryString);

  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }

  return await res.json();
};

export const getProductById = async (id: string): Promise<Product> => {
  const res = await fetch(PRODUCT_ENDPOINTS.DETAIL(id));

  if (!res.ok) {
    throw new Error('Failed to fetch product');
  }

  const data = await res.json();
  return data.data;
};

export const createProduct = async (productData: ProductFormData): Promise<Product> => {
  const res = await fetch(PRODUCT_ENDPOINTS.CREATE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productData),
  });

  if (!res.ok) {
    throw new Error('Failed to create product');
  }

  const data = await res.json();
  return data.data;
};

export const updateProduct = async (id: string, productData: Partial<ProductFormData>): Promise<Product> => {
  const res = await fetch(PRODUCT_ENDPOINTS.UPDATE(id), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productData),
  });

  if (!res.ok) {
    throw new Error('Failed to update product');
  }

  const data = await res.json();
  return data.data;
};

export const deleteProduct = async (id: string): Promise<void> => {
  const res = await fetch(PRODUCT_ENDPOINTS.DELETE(id), {
    method: 'DELETE',
  });

  if (!res.ok) {
    throw new Error('Failed to delete product');
  }
};
