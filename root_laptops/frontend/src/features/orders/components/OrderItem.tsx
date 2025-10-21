import React from 'react';
import { Order } from '../types';
import styles from './OrderItem.module.css';

interface OrderItemCardProps {
  order: Order;
  onViewDetail: (orderId: string) => void;
}

export function OrderItemCard({ order, onViewDetail }: OrderItemCardProps) {
  
  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'unpaid': return styles.statusYellow;
      case 'paid': return styles.statusGreen;
      case 'refunded': return styles.statusGray;
      default: return styles.statusGray;
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
      case 'pending': return styles.statusYellow;
      case 'confirmed': return styles.statusBlue;
      case 'processing': return styles.statusPurple;
      case 'ready_to_ship': return styles.statusIndigo;
      case 'completed': return styles.statusGreen;
      case 'cancelled': return styles.statusRed;
      default: return styles.statusGray;
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
      case 'not_shipped': return styles.statusGray;
      case 'picking': return styles.statusYellow;
      case 'in_transit': return styles.statusBlue;
      case 'out_for_delivery': return styles.statusIndigo;
      case 'delivered': return styles.statusGreen;
      case 'failed_delivery': return styles.statusRed;
      case 'returning': return styles.statusOrange;
      case 'returned': return styles.statusGray;
      default: return styles.statusGray;
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
    <div className={styles.card}>
      <div className={styles.header}>
        <div>
          <p className={styles.orderNumber}>#{order.order_number}</p>
          <p className={styles.orderDate}>
            {new Date(order.created_at || order.createdAt || new Date()).toLocaleDateString('vi-VN')}
          </p>
        </div>
        <div className={styles.statusWrapper}>
          <span className={`${styles.statusBadge} ${getOrderStatusColor(order.order_status)}`}>
            {getOrderStatusText(order.order_status)}
          </span>
          <span className={`${styles.statusBadge} ${getShippingStatusColor(order.shipping_status)}`}>
            {getShippingStatusText(order.shipping_status)}
          </span>
        </div>
      </div>

      <div className={styles.details}>
        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>Người nhận:</span>
          <span className={styles.detailValue}>{order.shipping_name}</span>
        </div>
        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>Số điện thoại:</span>
          <span className={styles.detailValue}>{order.shipping_phone}</span>
        </div>
        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>Thanh toán:</span>
          <span className={`${styles.paymentStatusBadge} ${getPaymentStatusColor(order.payment_status)}`}>
            {getPaymentStatusText(order.payment_status)}
          </span>
        </div>
        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>Tổng tiền:</span>
          <span className={styles.totalPrice}>
            {order.total.toLocaleString('vi-VN')} đ
          </span>
        </div>
      </div>

      <button
        onClick={() => onViewDetail(order._id || order.id || '')}
        className={styles.detailsButton}
      >
        Xem chi tiết
      </button>
    </div>
  );
}