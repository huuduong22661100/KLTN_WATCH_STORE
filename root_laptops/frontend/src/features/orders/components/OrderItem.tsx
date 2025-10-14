import React from 'react';
import { Order } from '../types';

interface OrderItemCardProps {
  order: Order;
  onViewDetail: (orderId: string) => void;
}

// ✅ ĐỔI TÊN: OrderItem → OrderItemCard
export function OrderItemCard({ order, onViewDetail }: OrderItemCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-purple-100 text-purple-800';
      case 'shipping':
        return 'bg-indigo-100 text-indigo-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Chờ xác nhận';
      case 'confirmed':
        return 'Đã xác nhận';
      case 'processing':
        return 'Đang xử lý';
      case 'shipping':
        return 'Đang giao hàng';
      case 'delivered':
        return 'Đã giao hàng';
      case 'cancelled':
        return 'Đã hủy';
      default:
        return status;
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="font-semibold text-lg">#{order.order_number}</p>
          <p className="text-sm text-gray-500">
            {new Date(order.created_at).toLocaleDateString('vi-VN')}
          </p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
          {getStatusText(order.status)}
        </span>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Người nhận:</span>
          <span className="font-medium">{order.shipping_name}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Số điện thoại:</span>
          <span className="font-medium">{order.shipping_phone}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Tổng tiền:</span>
          <span className="font-bold text-blue-600">
            {order.total.toLocaleString('vi-VN')} đ
          </span>
        </div>
      </div>

      <button
        onClick={() => onViewDetail(order.id)}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Xem chi tiết
      </button>
    </div>
  );
}