export interface CheckoutFormData {
  // Thông tin người nhận
  shipping_name: string;
  shipping_phone: string;
  shipping_email?: string;
  
  // Địa chỉ giao hàng (TEXT INPUT)
  shipping_address: string;    // Số nhà, đường
  shipping_city: string;        // User tự nhập: "Hồ Chí Minh"
  shipping_district: string;    // User tự nhập: "Quận 1"
  shipping_ward?: string;       // User tự nhập: "Phường Bến Nghé" (optional)
  
  // Thanh toán
  payment_method: 'cod' | 'bank_transfer' | 'momo' | 'vnpay';
  
  // Ghi chú
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

// ❌ XÓA: Province, District, Ward interfaces