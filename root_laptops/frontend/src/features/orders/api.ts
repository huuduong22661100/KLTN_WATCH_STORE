import { ORDER_ENDPOINTS } from '@/constants/api-url';
import { 
  Order, 
  CreateOrderPayload, 
  OrdersResponse, 
  OrderDetailResponse 
} from './types';

export const createOrderApi = async (
  payload: CreateOrderPayload,
  token: string
): Promise<Order> => {
  const res = await fetch(ORDER_ENDPOINTS.CREATE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ 
      message: 'Tạo đơn hàng thất bại' 
    }));
    throw new Error(error.message);
  }

  const result = await res.json();
  return result.data.order;
};

export const getOrdersApi = async (
  token: string,
  page: number = 1,
  limit: number = 10
): Promise<OrdersResponse> => {
  const res = await fetch(
    `${ORDER_ENDPOINTS.LIST}?page=${page}&limit=${limit}`,
    {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error('Không thể tải danh sách đơn hàng');
  }

  return res.json();
};

export const getOrderDetailApi = async (
  orderId: string,
  token: string
): Promise<Order> => {
  const res = await fetch(ORDER_ENDPOINTS.DETAIL(orderId), {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error('Không thể tải chi tiết đơn hàng');
  }

  const result: OrderDetailResponse = await res.json();
  return result.data.order;
};

export const cancelOrderApi = async (
  orderId: string,
  token: string
): Promise<Order> => {
  const res = await fetch(ORDER_ENDPOINTS.CANCEL(orderId), {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ 
      message: 'Hủy đơn hàng thất bại' 
    }));
    throw new Error(error.message);
  }

  const result = await res.json();
  return result.data.order;
};