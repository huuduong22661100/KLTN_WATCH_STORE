import React from 'react';
import { Order } from '../types';

interface OrderItemCardProps {
  order: Order;
  onViewDetail: (orderId: string) => void;
}


export function OrderItemCard({ order, onViewDetail }: OrderItemCardProps) {
  
  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'unpaid': return 'bg-yellow-100 text-yellow-800';
      case 'paid': return 'bg-green-100 text-green-800';
      case 'refunded': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusText = (status: string) => {
    switch (status) {
      case 'unpaid': return 'Chưa thanh toán';
      case 'paid': return 'Đã thanh toán';
      case 'refunded': return 'Đã hoàn tiền';
      default: return status;
    }
  };

  
  const getOrderStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'processing': return 'bg-purple-100 text-purple-800';
      case 'ready_to_ship': return 'bg-indigo-100 text-indigo-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getOrderStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Chờ xác nhận';
      case 'confirmed': return 'Đã xác nhận';
      case 'processing': return 'Đang chuẩn bị';
      case 'ready_to_ship': return 'Sẵn sàng giao';
      case 'completed': return 'Hoàn thành';
      case 'cancelled': return 'Đã hủy';
      default: return status;
    }
  };

  
  const getShippingStatusColor = (status: string) => {
    switch (status) {
      case 'not_shipped': return 'bg-gray-100 text-gray-800';
      case 'picking': return 'bg-yellow-100 text-yellow-800';
      case 'in_transit': return 'bg-blue-100 text-blue-800';
      case 'out_for_delivery': return 'bg-indigo-100 text-indigo-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'failed_delivery': return 'bg-red-100 text-red-800';
      case 'returning': return 'bg-orange-100 text-orange-800';
      case 'returned': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getShippingStatusText = (status: string) => {
    switch (status) {
      case 'not_shipped': return 'Chưa giao';
      case 'picking': return 'Đang lấy hàng';
      case 'in_transit': return 'Đang vận chuyển';
      case 'out_for_delivery': return 'Đang giao';
      case 'delivered': return 'Đã giao hàng';
      case 'failed_delivery': return 'Giao thất bại';
      case 'returning': return 'Đang hoàn trả';
      case 'returned': return 'Đã hoàn trả';
      default: return status;
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="font-semibold text-lg">#{order.order_number}</p>
          <p className="text-sm text-gray-500">
            {new Date(order.created_at || order.createdAt || new Date()).toLocaleDateString('vi-VN')}
          </p>
        </div>
        <div className="flex flex-col gap-1 items-end">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getOrderStatusColor(order.order_status)}`}>
            {getOrderStatusText(order.order_status)}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getShippingStatusColor(order.shipping_status)}`}>
            {getShippingStatusText(order.shipping_status)}
          </span>
        </div>
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
          <span className="text-gray-600">Thanh toán:</span>
          <span className={`px-2 py-0.5 rounded text-xs font-medium ${getPaymentStatusColor(order.payment_status)}`}>
            {getPaymentStatusText(order.payment_status)}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Tổng tiền:</span>
          <span className="font-bold text-blue-600">
            {order.total.toLocaleString('vi-VN')} đ
          </span>
        </div>
      </div>

      <button
        onClick={() => onViewDetail(order._id || order.id || '')}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Xem chi tiết
      </button>
    </div>
  );
}