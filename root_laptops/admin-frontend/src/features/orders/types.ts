import { ApiResponse, PaginatedApiResponse } from '@/features/products/types'; // Reusing common API response types
import { Product } from '@/features/products/types'; // For OrderItem product details

export type OrderStatus = 'pending' | 'confirmed' | 'shipping' | 'delivered' | 'cancelled';

export interface OrderItem {
  _id: string;
  laptop_id: Product; // Populated product details
  quantity: number;
  price: number;
}

export interface Order {
  _id: string;
  user_id: {
    _id: string;
    name: string;
    email: string;
  }; // Populated user details
  total_amount: number;
  status: OrderStatus;
  shipping_address: string;
  payment_method: string;
  created_at: string;
  updated_at: string;
  items?: OrderItem[]; // Populated order items
}

export interface UpdateOrderStatusPayload {
  status: OrderStatus;
}

// Re-export for convenience
export { ApiResponse, PaginatedApiResponse };
