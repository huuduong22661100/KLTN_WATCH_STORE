import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/store/authStore';
import { getCartApi } from '../api';

export function useCart() {
  const { token } = useAuthStore();

  return useQuery({
    queryKey: ['cart', token],
    queryFn: () => getCartApi(token!),
    enabled: !!token, 
  });
}