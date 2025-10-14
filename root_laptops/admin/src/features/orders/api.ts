import { ORDER_ENDPOINTS } from '@/constants/api-url';
import { Order, PaginatedResponse, QueryParams } from '@/shared/types';

export const getOrders = async (params?: QueryParams): Promise<PaginatedResponse<Order>> => {
  const queryString = params ? '?' + new URLSearchParams(params as any).toString() : '';
  const res = await fetch(ORDER_ENDPOINTS.LIST + queryString);

  if (!res.ok) {
    throw new Error('Failed to fetch orders');
  }

  return await res.json();
};

export const getOrderById = async (id: string): Promise<Order> => {
  const res = await fetch(ORDER_ENDPOINTS.DETAIL(id));

  if (!res.ok) {
    throw new Error('Failed to fetch order');
  }

  const data = await res.json();
  return data.data;
};

export const updateOrderStatus = async (
  id: string,
  status: Order['status']
): Promise<Order> => {
  const res = await fetch(ORDER_ENDPOINTS.UPDATE_STATUS(id), {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status }),
  });

  if (!res.ok) {
    throw new Error('Failed to update order status');
  }

  const data = await res.json();
  return data.data;
};
