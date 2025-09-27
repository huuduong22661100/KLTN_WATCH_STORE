import { Product, ProductPayload, PaginatedApiResponse, ApiResponse } from './types';
import { useAuthStore } from '@/store/authStore';

const API_BASE_URL = 'http://localhost:5000/api/v1/products';

const getAuthHeaders = () => {
  const token = useAuthStore.getState().token;
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
};

// Fetch all products
export const fetchProducts = async (): Promise<PaginatedApiResponse<Product[]>> => {
  const res = await fetch(API_BASE_URL, {
    headers: getAuthHeaders(),
  });
  const data: PaginatedApiResponse<Product[]> = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Failed to fetch products');
  }
  return data;
};

// Fetch product by ID
export const fetchProductById = async (id: string): Promise<ApiResponse<Product>> => {
  const res = await fetch(`${API_BASE_URL}/${id}`, {
    headers: getAuthHeaders(),
  });
  const data: ApiResponse<Product> = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Failed to fetch product');
  }
  return data;
};

// Create a new product
export const createProduct = async (payload: ProductPayload): Promise<ApiResponse<Product>> => {
  const res = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });
  const data: ApiResponse<Product> = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Failed to create product');
  }
  return data;
};

// Update an existing product
export const updateProduct = async (id: string, payload: ProductPayload): Promise<ApiResponse<Product>> => {
  const res = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });
  const data: ApiResponse<Product> = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Failed to update product');
  }
  return data;
};

// Delete a product
export const deleteProduct = async (id: string): Promise<ApiResponse<null>> => {
  const res = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  const data: ApiResponse<null> = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Failed to delete product');
  }
  return data;
};
