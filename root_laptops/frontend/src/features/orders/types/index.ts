export type OrderStatus = 
  | 'pending' 
  | 'confirmed' 
  | 'processing' 
  | 'shipping' 
  | 'delivered' 
  | 'cancelled';

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  product_name: string;
  product_image: string;
  quantity: number;
  price: number;
  subtotal: number;
}

export interface Order {
  id: string;
  order_number: string;
  user_id: string;
  status: OrderStatus;
  
  // Pricing
  total: number;
  subtotal?: number;
  shipping_fee: number;
  
  // Shipping info
  shipping_name: string;
  shipping_phone: string;
  shipping_address: string;
  shipping_district: string;
  shipping_city: string;
  shipping_ward?: string;
  
  // Payment
  payment_method: 'cod' | 'bank_transfer' | 'momo' | 'vnpay';
  
  // Additional
  note?: string;
  items?: OrderItem[];
  
  // Timestamps
  created_at: string;
  updated_at: string;
}

// ✅ THÊM: Payload để tạo đơn hàng
export interface CreateOrderPayload {
  // Shipping info
  shipping_name: string;
  shipping_phone: string;
  shipping_email?: string;
  shipping_address: string;
  shipping_city: string;
  shipping_district: string;
  shipping_ward?: string;
  
  // Payment
  payment_method: 'cod' | 'bank_transfer' | 'momo' | 'vnpay';
  
  // Additional
  note?: string;
}

// ✅ THÊM: Response khi lấy danh sách đơn hàng
export interface OrdersResponse {
  success: boolean;
  data: {
    orders: Order[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

// ✅ THÊM: Response khi lấy chi tiết đơn hàng
export interface OrderDetailResponse {
  success: boolean;
  data: {
    order: Order;
  };
}

// ✅ THÊM: Response khi tạo đơn hàng
export interface CreateOrderResponse {
  success: boolean;
  data: {
    order: Order;
  };
  message?: string;
}

// ✅ THÊM: Response khi hủy đơn hàng
export interface CancelOrderResponse {
  success: boolean;
  data: {
    order: Order;
  };
  message?: string;
}