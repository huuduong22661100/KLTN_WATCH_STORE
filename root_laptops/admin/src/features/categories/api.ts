import { CATEGORY_ENDPOINTS } from '@/constants/api-url';
import { Category, CategoryFormData, QueryParams } from '@/shared/types';
import { fetchWithAuth } from '@/lib/apiClient';

export const getCategories = async (params?: QueryParams): Promise<Category[]> => {
  const queryString = params ? '?' + new URLSearchParams(params as any).toString() : '';
  const res = await fetchWithAuth(CATEGORY_ENDPOINTS.LIST + queryString);

  if (!res.ok) {
    throw new Error('Failed to fetch categories');
  }

  const data = await res.json();
  return data.data;
};

export const getCategoryById = async (id: string): Promise<Category> => {
  const res = await fetchWithAuth(CATEGORY_ENDPOINTS.DETAIL(id));

  if (!res.ok) {
    throw new Error('Failed to fetch category');
  }

  const data = await res.json();
  return data.data;
};

export const createCategory = async (categoryData: CategoryFormData): Promise<Category> => {
  const res = await fetchWithAuth(CATEGORY_ENDPOINTS.CREATE, {
    method: 'POST',
    body: JSON.stringify(categoryData),
  });

  if (!res.ok) {
    throw new Error('Failed to create category');
  }

  const data = await res.json();
  return data.data;
};

export const updateCategory = async (id: string, categoryData: Partial<CategoryFormData>): Promise<Category> => {
  const res = await fetchWithAuth(CATEGORY_ENDPOINTS.UPDATE(id), {
    method: 'PUT',
    body: JSON.stringify(categoryData),
  });

  if (!res.ok) {
    throw new Error('Failed to update category');
  }

  const data = await res.json();
  return data.data;
};

export const deleteCategory = async (id: string): Promise<void> => {
  const res = await fetchWithAuth(CATEGORY_ENDPOINTS.DELETE(id), {
    method: 'DELETE',
  });

  if (!res.ok) {
    throw new Error('Failed to delete category');
  }
};
