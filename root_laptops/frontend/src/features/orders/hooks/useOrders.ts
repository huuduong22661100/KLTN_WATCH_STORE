import { useQuery } from '@tanstack/react-query';
import { getOrdersApi } from '../api';
import { useAuthStore } from '@/store/authStore';

export function useOrders(page: number = 1, limit: number = 10) {
  const token = useAuthStore((state) => state.token);

  return useQuery({
    queryKey: ['orders', page, limit],
    queryFn: () => {
      if (!token) throw new Error('Vui lòng đăng nhập');
      return getOrdersApi(token, page, limit);
    },
    enabled: !!token,
  });
}