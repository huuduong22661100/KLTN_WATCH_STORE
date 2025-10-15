import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCategories, getCategoryById, createCategory, updateCategory, deleteCategory } from '../api';
import { CategoryFormData, QueryParams } from '@/shared/types';
import { toast } from 'sonner';
import { useAuthStore } from '@/store/authStore';

export const useCategories = (params?: QueryParams) => {
  const { token } = useAuthStore();
  return useQuery({
    queryKey: ['categories', params],
    queryFn: () => getCategories(params),
    enabled: !!token,
  });
};

export const useCategory = (id: string) => {
  const { token } = useAuthStore();
  return useQuery({
    queryKey: ['categories', id],
    queryFn: () => getCategoryById(id),
    enabled: !!id && !!token,
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CategoryFormData) => createCategory(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success('Tạo danh mục thành công');
    },
    onError: () => {
      toast.error('Tạo danh mục thất bại');
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CategoryFormData> }) =>
      updateCategory(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success('Cập nhật danh mục thành công');
    },
    onError: () => {
      toast.error('Cập nhật danh mục thất bại');
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success('Xóa danh mục thành công');
    },
    onError: () => {
      toast.error('Xóa danh mục thất bại');
    },
  });
};
