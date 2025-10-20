import { useMutation, useQueryClient } from '@tanstack/react-query';
import { cancelOrderApi } from '../api';
import { useAuthStore } from '@/store/authStore';

export function useCancelOrder() {
  const queryClient = useQueryClient();
  const token = useAuthStore((state) => state.token);

  return useMutation({
    mutationFn: (orderId: string) => {
      if (!token) throw new Error('Vui lòng đăng nhập');
      return cancelOrderApi(orderId, token);
    },
    onSuccess: (_, orderId) => {
      
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['order', orderId] });
    },
  });
}