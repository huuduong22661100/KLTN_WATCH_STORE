import React from 'react';
import { Order } from '../types';
import styles from './OrderSummary.module.css';

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

  
  const subtotal = order.subtotal || order.total - order.shipping_fee;

  return (
    <div className={styles.summaryCard}>
      <h3 className={styles.title}>Thông tin đơn hàng</h3>

      <div className={styles.orderInfo}>
        <div className={styles.infoRow}>
          <span className={styles.label}>Mã đơn hàng:</span>
          <span className={styles.valueBold}>{order.order_number}</span>
        </div>
        
        <div className={styles.infoRow}>
          <span className={styles.label}>Ngày đặt:</span>
          <span className={styles.valueMedium}>
            {new Date(order.created_at).toLocaleDateString('vi-VN')}
          </span>
        </div>

        <div className={styles.infoRow}>
          <span className={styles.label}>Phương thức thanh toán:</span>
          <span className={styles.valueMedium}>
            {getPaymentMethodText(order.payment_method)}
          </span>
        </div>
      </div>

      <div className={styles.priceDetails}>
        <div className={styles.infoRow}>
          <span className={styles.label}>Tạm tính:</span>
          <span>{subtotal.toLocaleString('vi-VN')} đ</span>
        </div>

        <div className={styles.infoRow}>
          <span className={styles.label}>Phí vận chuyển:</span>
          <span>
            {order.shipping_fee === 0 ? (
              <span className={styles.freeShipping}>Miễn phí</span>
            ) : (
              `${order.shipping_fee.toLocaleString('vi-VN')} đ`
            )}
          </span>
        </div>

        <div className={styles.totalRow}>
          <span>Tổng cộng:</span>
          <span className={styles.totalPrice}>
            {order.total.toLocaleString('vi-VN')} đ
          </span>
        </div>
      </div>

      {order.payment_method === 'bank_transfer' && (
        <div className={styles.note}>
          <p className={styles.noteText}>
            <strong>Lưu ý:</strong> Vui lòng chuyển khoản với nội dung:{' '}
            <span className={styles.valueBold}>{order.order_number} {order.shipping_phone}</span>
          </p>
        </div>
      )}
    </div>
  );
}