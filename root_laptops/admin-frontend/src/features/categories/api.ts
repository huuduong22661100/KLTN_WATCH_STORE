import { Category, CategoryPayload, PaginatedApiResponse, ApiResponse } from './types';
import { useAuthStore } from '@/store/authStore';

const API_BASE_URL = 'http://localhost:5000/api/v1/categories';

const getAuthHeaders = () => {
  const token = useAuthStore.getState().token;
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
};

// Fetch all categories
export const fetchCategories = async (): Promise<PaginatedApiResponse<Category[]>> => {
  const res = await fetch(API_BASE_URL, {
    headers: getAuthHeaders(),
  });
  const data: PaginatedApiResponse<Category[]> = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Failed to fetch categories');
  }
  return data;
};

// Fetch category by ID
export const fetchCategoryById = async (id: string): Promise<ApiResponse<Category>> => {
  const res = await fetch(`${API_BASE_URL}/${id}`, {
    headers: getAuthHeaders(),
  });
  const data: ApiResponse<Category> = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Failed to fetch category');
  }
  return data;
};

// Create a new category
export const createCategory = async (payload: CategoryPayload): Promise<ApiResponse<Category>> => {
  const res = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });
  const data: ApiResponse<Category> = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Failed to create category');
  }
  return data;
};

// Update an existing category
export const updateCategory = async (id: string, payload: CategoryPayload): Promise<ApiResponse<Category>> => {
  const res = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });
  const data: ApiResponse<Category> = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Failed to update category');
  }
  return data;
};

// Delete a category
export const deleteCategory = async (id: string): Promise<ApiResponse<null>> => {
  const res = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  const data: ApiResponse<null> = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Failed to delete category');
  }
  return data;
};
