import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createOrderApi } from '../api';
import { useAuthStore } from '@/store/authStore';
import { CreateOrderPayload } from '../types';

export function useCreateOrder() {
  const queryClient = useQueryClient();
  const token = useAuthStore((state) => state.token);

  return useMutation({
    mutationFn: (payload: CreateOrderPayload) => {
      if (!token) throw new Error('Vui lòng đăng nhập');
      return createOrderApi(payload, token);
    },
    onSuccess: () => {
      // Invalidate orders & cart
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
}