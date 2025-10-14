import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@/store/authStore';
import { removeFromCartApi } from '../api';
import { toast } from 'sonner';
import { useCartStore } from '@/store/cartStore';

export function useRemoveFromCart() {
  const { token } = useAuthStore();
  const queryClient = useQueryClient();
  const { loadCartFromServer } = useCartStore();

  return useMutation({
    mutationFn: (cartItemId: string) => removeFromCartApi(cartItemId, token!),
    onSuccess: async () => {
      // Invalidate server state first
      await queryClient.invalidateQueries({ queryKey: ['cart'] });
      // Then force a reload of the client state from the server
      await loadCartFromServer();
      toast.success('Đã xóa khỏi giỏ hàng');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}