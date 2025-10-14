import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getColors, getColorById, createColor, updateColor, deleteColor } from '../api';
import { ColorFormData } from '@/shared/types';
import { toast } from 'sonner';

export const useColors = () => {
  return useQuery({
    queryKey: ['colors'],
    queryFn: getColors,
  });
};

export const useColor = (id: string) => {
  return useQuery({
    queryKey: ['colors', id],
    queryFn: () => getColorById(id),
    enabled: !!id,
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
