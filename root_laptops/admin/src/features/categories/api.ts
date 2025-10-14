import { CATEGORY_ENDPOINTS } from '@/constants/api-url';
import { Category, CategoryFormData } from '@/shared/types';

export const getCategories = async (): Promise<Category[]> => {
  const res = await fetch(CATEGORY_ENDPOINTS.LIST);

  if (!res.ok) {
    throw new Error('Failed to fetch categories');
  }

  const data = await res.json();
  return data.data;
};

export const getCategoryById = async (id: string): Promise<Category> => {
  const res = await fetch(CATEGORY_ENDPOINTS.DETAIL(id));

  if (!res.ok) {
    throw new Error('Failed to fetch category');
  }

  const data = await res.json();
  return data.data;
};

export const createCategory = async (categoryData: CategoryFormData): Promise<Category> => {
  const res = await fetch(CATEGORY_ENDPOINTS.CREATE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(categoryData),
  });

  if (!res.ok) {
    throw new Error('Failed to create category');
  }

  const data = await res.json();
  return data.data;
};

export const updateCategory = async (id: string, categoryData: Partial<CategoryFormData>): Promise<Category> => {
  const res = await fetch(CATEGORY_ENDPOINTS.UPDATE(id), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(categoryData),
  });

  if (!res.ok) {
    throw new Error('Failed to update category');
  }

  const data = await res.json();
  return data.data;
};

export const deleteCategory = async (id: string): Promise<void> => {
  const res = await fetch(CATEGORY_ENDPOINTS.DELETE(id), {
    method: 'DELETE',
  });

  if (!res.ok) {
    throw new Error('Failed to delete category');
  }
};
