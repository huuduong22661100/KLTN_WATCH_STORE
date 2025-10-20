
export type PaymentStatus = 
  | 'unpaid'      
  | 'paid'        
  | 'refunded';   


export type OrderStatus = 
  | 'pending'        
  | 'confirmed'      
  | 'processing'     
  | 'ready_to_ship'  
  | 'completed'      
  | 'cancelled';     


export type ShippingStatus = 
  | 'not_shipped'      
  | 'picking'          
  | 'in_transit'       
  | 'out_for_delivery' 
  | 'delivered'        
  | 'failed_delivery'  
  | 'returning'        
  | 'returned';        

export interface OrderItem {
  _id?: string;
  id?: string;
  order_id: string;
  product_id: string;
  product_name: string;
  product_image: string;
  quantity: number;
  price: number;
  subtotal: number;
}

export interface Order {
  _id?: string;
  id?: string;
  order_number: string;
  user_id: string;
  
  
  payment_status: PaymentStatus;
  order_status: OrderStatus;
  shipping_status: ShippingStatus;
  
  
  status?: OrderStatus;
  
  
  total: number;
  subtotal?: number;
  shipping_fee: number;
  
  
  shipping_name: string;
  shipping_phone: string;
  shipping_address: string;
  shipping_district: string;
  shipping_city: string;
  shipping_ward?: string;
  
  
  payment_method: 'cod' | 'bank_transfer' | 'momo' | 'vnpay';
  
  
  note?: string;
  items?: OrderItem[];
  
  
  status_history?: StatusHistory[];
  
  
  shipping_info?: ShippingInfo;
  
  
  created_at?: string;
  updated_at?: string;
  createdAt?: string;
  updatedAt?: string;
}


export interface StatusHistory {
  status_type: 'payment_status' | 'order_status' | 'shipping_status';
  old_value: string | null;
  new_value: string;
  changed_by: string;
  changed_at: string;
  note?: string;
}


export interface ShippingInfo {
  shipper_name?: string;
  shipper_phone?: string;
  tracking_number?: string;
  estimated_delivery?: string;
  actual_delivery?: string;
}


export interface CreateOrderPayload {
  
  shipping_name: string;
  shipping_phone: string;
  shipping_email?: string;
  shipping_address: string;
  shipping_city: string;
  shipping_district: string;
  shipping_ward?: string;
  
  
  payment_method: 'cod' | 'bank_transfer' | 'momo' | 'vnpay';
  
  
  note?: string;
}


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


export interface OrderDetailResponse {
  success: boolean;
  data: {
    order: Order;
  };
}


export interface CreateOrderResponse {
  success: boolean;
  data: {
    order: Order;
  };
  message?: string;
}


export interface CancelOrderResponse {
  success: boolean;
  data: {
    order: Order;
  };
  message?: string;
}