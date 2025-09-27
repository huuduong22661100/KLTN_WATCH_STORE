import { Order, UpdateOrderStatusPayload, PaginatedApiResponse, ApiResponse } from './types';
import { useAuthStore } from '@/store/authStore';

const API_BASE_URL = 'http://localhost:5000/api/v1/orders';

const getAuthHeaders = () => {
  const token = useAuthStore.getState().token;
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
};

// Fetch all orders (admin only)
export const fetchAllOrders = async (): Promise<PaginatedApiResponse<Order[]>> => {
  const res = await fetch(API_BASE_URL, {
    headers: getAuthHeaders(),
  });
  const data: PaginatedApiResponse<Order[]> = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Failed to fetch orders');
  }
  return data;
};

// Fetch order by ID (admin can fetch any order)
export const fetchOrderById = async (id: string): Promise<ApiResponse<Order>> => {
  const res = await fetch(`${API_BASE_URL}/${id}`, {
    headers: getAuthHeaders(),
  });
  const data: ApiResponse<Order> = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Failed to fetch order');
  }
  return data;
};

// Update order status (admin only)
export const updateOrderStatus = async (id: string, payload: UpdateOrderStatusPayload): Promise<ApiResponse<Order>> => {
  const res = await fetch(`${API_BASE_URL}/${id}/status`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });
  const data: ApiResponse<Order> = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Failed to update order status');
  }
  return data;
};

// Note: No create/delete order APIs for admin as these are user-initiated actions.
// Admin typically only views and updates status.
