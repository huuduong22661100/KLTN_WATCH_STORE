import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@/store/authStore';
import { updateCartApi } from '../api';
import { UpdateCartPayload } from '../types';
import { toast } from 'sonner';
import { useCartStore } from '@/store/cartStore';

export function useUpdateCart() {
  const { token } = useAuthStore();
  const queryClient = useQueryClient();
  const { loadCartFromServer } = useCartStore();

  return useMutation({
    mutationFn: (payload: UpdateCartPayload) => updateCartApi(payload, token!),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['cart'] });
      await loadCartFromServer();
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}