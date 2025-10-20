export interface CheckoutFormData {
  
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

export interface CheckoutSummary {
  subtotal: number;
  shipping_fee: number;
  discount: number;
  total: number;
  itemCount: number;
}

export const PAYMENT_METHODS = [
  {
    value: 'cod',
    label: 'Thanh toán khi nhận hàng (COD)',
    icon: '💵',
    description: 'Thanh toán bằng tiền mặt khi nhận hàng',
  },
  {
    value: 'bank_transfer',
    label: 'Chuyển khoản ngân hàng',
    icon: '🏦',
    description: 'Chuyển khoản trực tiếp qua ngân hàng',
  },
  {
    value: 'momo',
    label: 'Ví MoMo',
    icon: '📱',
    description: 'Thanh toán qua ví điện tử MoMo',
  },
  {
    value: 'vnpay',
    label: 'VNPay',
    icon: '💳',
    description: 'Thanh toán qua cổng VNPay',
  },
] as const;

