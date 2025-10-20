import { ORDER_ENDPOINTS } from '@/constants/api-url';
import { Order, PaginatedResponse, QueryParams } from '@/shared/types';
import { fetchWithAuth } from '@/lib/apiClient';

export const getOrders = async (params?: QueryParams): Promise<PaginatedResponse<Order>> => {
  const queryString = params ? '?' + new URLSearchParams(params as any).toString() : '';
  const res = await fetchWithAuth(ORDER_ENDPOINTS.LIST + queryString);

  if (!res.ok) {
    throw new Error('Failed to fetch orders');
  }

  const data = await res.json();
  
  
  
  return {
    success: true,
    data: data.data, 
    total: data.total,
    page: data.page,
    totalPages: data.totalPages
  };
};

export const getOrderById = async (id: string): Promise<Order> => {
  const res = await fetchWithAuth(ORDER_ENDPOINTS.DETAIL(id));

  if (!res.ok) {
    throw new Error('Failed to fetch order');
  }

  const data = await res.json();
  return data.data.order; 
};

export const updateOrderStatus = async (
  id: string,
  order_status: Order['order_status']
): Promise<Order> => {
  const res = await fetchWithAuth(ORDER_ENDPOINTS.UPDATE_ORDER_STATUS(id), {
    method: 'PUT',
    body: JSON.stringify({ order_status }),
  });

  if (!res.ok) {
    throw new Error('Failed to update order status');
  }

  const data = await res.json();
  return data.data.order;
};


export const updatePaymentStatus = async (
  id: string,
  payment_status: Order['payment_status'],
  note?: string
): Promise<Order> => {
  const res = await fetchWithAuth(ORDER_ENDPOINTS.UPDATE_PAYMENT_STATUS(id), {
    method: 'PUT',
    body: JSON.stringify({ payment_status, note }),
  });

  if (!res.ok) {
    throw new Error('Failed to update payment status');
  }

  const data = await res.json();
  return data.data.order;
};


export const updateShippingStatus = async (
  id: string,
  shipping_status: Order['shipping_status'],
  shipping_info?: Order['shipping_info'],
  note?: string
): Promise<Order> => {
  const res = await fetchWithAuth(ORDER_ENDPOINTS.UPDATE_SHIPPING_STATUS(id), {
    method: 'PUT',
    body: JSON.stringify({ shipping_status, shipping_info, note }),
  });

  if (!res.ok) {
    throw new Error('Failed to update shipping status');
  }

  const data = await res.json();
  return data.data.order;
};
