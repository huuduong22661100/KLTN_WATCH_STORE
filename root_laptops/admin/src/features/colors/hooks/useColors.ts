import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getColors, getColorById, createColor, updateColor, deleteColor } from '../api';
import { ColorFormData, QueryParams } from '@/shared/types';
import { toast } from 'sonner';
import { useAuthStore } from '@/store/authStore';

export const useColors = (params?: QueryParams) => {
  const { token } = useAuthStore();
  return useQuery({
    queryKey: ['colors', params],
    queryFn: () => getColors(params),
    enabled: !!token,
  });
};

export const useColor = (id: string) => {
  const { token } = useAuthStore();
  return useQuery({
    queryKey: ['colors', id],
    queryFn: () => getColorById(id),
    enabled: !!id && !!token,
  });
};

export const useCreateColor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ColorFormData) => createColor(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['colors'] });
      toast.success('Tạo màu sắc thành công');
    },
    onError: () => {
      toast.error('Tạo màu sắc thất bại');
    },
  });
};

export const useUpdateColor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<ColorFormData> }) =>
      updateColor(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['colors'] });
      toast.success('Cập nhật màu sắc thành công');
    },
    onError: () => {
      toast.error('Cập nhật màu sắc thất bại');
    },
  });
};

export const useDeleteColor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteColor(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['colors'] });
      toast.success('Xóa màu sắc thành công');
    },
    onError: () => {
      toast.error('Xóa màu sắc thất bại');
    },
  });
};
