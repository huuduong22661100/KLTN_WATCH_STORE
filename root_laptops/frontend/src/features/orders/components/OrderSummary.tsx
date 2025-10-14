import React from 'react';
import { Order } from '../types';

interface OrderSummaryProps {
  order: Order;
}

export function OrderSummary({ order }: OrderSummaryProps) {
  const getPaymentMethodText = (method: string) => {
    switch (method) {
      case 'cod':
        return 'Thanh toán khi nhận hàng (COD)';
      case 'bank_transfer':
        return 'Chuyển khoản ngân hàng';
      case 'momo':
        return 'Ví MoMo';
      case 'vnpay':
        return 'VNPay';
      default:
        return method;
    }
  };

  // ✅ Tính subtotal từ items nếu không có
  const subtotal = order.subtotal || order.total - order.shipping_fee;

  return (
    <div className="bg-white p-6 rounded-lg shadow sticky top-4">
      <h3 className="text-lg font-semibold mb-4">Thông tin đơn hàng</h3>

      <div className="space-y-3 mb-4 pb-4 border-b">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Mã đơn hàng:</span>
          <span className="font-semibold">{order.order_number}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Ngày đặt:</span>
          <span className="font-medium">
            {new Date(order.created_at).toLocaleDateString('vi-VN')}
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Phương thức thanh toán:</span>
          <span className="font-medium">
            {getPaymentMethodText(order.payment_method)}
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Tạm tính:</span>
          <span>{subtotal.toLocaleString('vi-VN')} đ</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Phí vận chuyển:</span>
          <span>
            {order.shipping_fee === 0 ? (
              <span className="text-green-600">Miễn phí</span>
            ) : (
              `${order.shipping_fee.toLocaleString('vi-VN')} đ`
            )}
          </span>
        </div>

        <div className="flex justify-between font-bold text-lg pt-2 border-t">
          <span>Tổng cộng:</span>
          <span className="text-blue-600">
            {order.total.toLocaleString('vi-VN')} đ
          </span>
        </div>
      </div>

      {order.payment_method === 'bank_transfer' && (
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-xs text-yellow-800">
            <strong>Lưu ý:</strong> Vui lòng chuyển khoản với nội dung:{' '}
            <span className="font-semibold">{order.order_number} {order.shipping_phone}</span>
          </p>
        </div>
      )}
    </div>
  );
}