import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@/store/authStore';
import { addToCartApi } from '../api';
import { AddToCartPayload } from '../types';
import { toast } from 'sonner';

export function useAddToCart() {
  const { token } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: AddToCartPayload) => addToCartApi(payload, token!),
    onSuccess: () => {
      
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast.success('Đã thêm vào giỏ hàng');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}