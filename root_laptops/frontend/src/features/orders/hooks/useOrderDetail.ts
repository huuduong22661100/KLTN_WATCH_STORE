import { useQuery } from '@tanstack/react-query';
import { getOrderDetailApi } from '../api';
import { useAuthStore } from '@/store/authStore';

export function useOrderDetail(orderId: string) {
  const token = useAuthStore((state) => state.token);

  return useQuery({
    queryKey: ['order', orderId],
    queryFn: () => {
      if (!token) throw new Error('Vui lòng đăng nhập');
      return getOrderDetailApi(orderId, token);
    },
    enabled: !!token && !!orderId,
  });
}