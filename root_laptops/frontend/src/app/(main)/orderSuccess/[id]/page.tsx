'use client';

import { use } from 'react';
import { useOrderDetail } from '@/features/orders';

export default function OrderSuccessPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = use(params);
  const { data: order, isLoading } = useOrderDetail(id);

  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">Đang tải...</div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center text-red-600">
          Không tìm thấy đơn hàng
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-2xl mx-auto text-center">
        {/* Success Icon */}
        <div className="mb-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Đặt hàng thành công!
          </h1>
          <p className="text-gray-600">
            Cảm ơn bạn đã đặt hàng tại Watch Store
          </p>
        </div>

        {/* Order Info */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <div className="grid grid-cols-2 gap-4 text-left">
            <div>
              <p className="text-sm text-gray-500">Mã đơn hàng</p>
              <p className="font-semibold">{order.order_number}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Tổng tiền</p>
              <p className="font-semibold text-blue-600">
                {order.total.toLocaleString('vi-VN')} đ
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Phương thức thanh toán</p>
              <p className="font-semibold">
                {order.payment_method === 'cod' && 'COD'}
                {order.payment_method === 'bank_transfer' && 'Chuyển khoản'}
                {order.payment_method === 'momo' && 'MoMo'}
                {order.payment_method === 'vnpay' && 'VNPay'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Trạng thái</p>
              <p className="font-semibold text-yellow-600">Chờ xác nhận</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 justify-center">
          <a
            href={`/orders/${order.id}`}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Xem chi tiết đơn hàng
          </a>
          <a
            href="/products"
            className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            Tiếp tục mua sắm
          </a>
        </div>

        {/* Note */}
        {order.payment_method === 'bank_transfer' && (
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-left">
            <p className="font-semibold text-yellow-800 mb-2">
              ⚠️ Lưu ý thanh toán
            </p>
            <p className="text-sm text-yellow-700">
              Vui lòng chuyển khoản với nội dung:{' '}
              <strong>{order.order_number} {order.shipping_phone}</strong>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}