'use client';

import { use } from 'react';
import Link from 'next/link';
import { useOrderDetail } from '@/features/orders';
import styles from './page.module.css';

export default function OrderSuccessPage({
  params 
}: {
  params: Promise<{ id: string }> 
}) {
  const { id } = use(params);
  const { data: order, isLoading } = useOrderDetail(id);

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingText}>Đang tải...</div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className={styles.container}>
        <div className={styles.errorMessage}>
          Không tìm thấy đơn hàng
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        <div className={styles.successIconContainer}>
          <div className={styles.successIconWrapper}>
            <svg className={styles.successIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className={styles.title}>
            Đặt hàng thành công!
          </h1>
          <p className={styles.subtitle}>
            Cảm ơn bạn đã đặt hàng tại Watch Store
          </p>
        </div>

        <div className={styles.orderDetailsCard}>
          <div className={styles.orderDetailsGrid}>
            <div>
              <p className={styles.detailLabel}>Mã đơn hàng</p>
              <p className={styles.detailValue}>{order.order_number}</p>
            </div>
            <div>
              <p className={styles.detailLabel}>Tổng tiền</p>
              <p className={styles.totalPrice}>
                {order.total.toLocaleString('vi-VN')} đ
              </p>
            </div>
            <div>
              <p className={styles.detailLabel}>Phương thức thanh toán</p>
              <p className={styles.detailValue}>
                {order.payment_method === 'cod' && 'COD'}
                {order.payment_method === 'bank_transfer' && 'Chuyển khoản'}
                {order.payment_method === 'momo' && 'MoMo'}
                {order.payment_method === 'vnpay' && 'VNPay'}
              </p>
            </div>
            <div>
              <p className={styles.detailLabel}>Trạng thái</p>
              <p className={styles.statusValue}>Chờ xác nhận</p>
            </div>
          </div>
        </div>

        <div className={styles.actionButtons}>
          <Link
            href={`/orders/${order.id}`}
            className={styles.viewOrderButton}
          >
            Xem chi tiết đơn hàng
          </Link>
          <Link
            href="/products"
            className={styles.continueShoppingButton}
          >
            Tiếp tục mua sắm
          </Link>
        </div>

        {order.payment_method === 'bank_transfer' && (
          <div className={styles.bankTransferNote}>
            <p className={styles.noteTitle}>
              ⚠️ Lưu ý thanh toán
            </p>
            <p className={styles.noteText}>
              Vui lòng chuyển khoản với nội dung:{' '}
              <strong>{order.order_number} {order.shipping_phone}</strong>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}