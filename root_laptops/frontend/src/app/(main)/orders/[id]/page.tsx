'use client';

import { use } from 'react';
import Link from 'next/link';
import { useOrderDetail, useCancelOrder, OrderStatusComponent, OrderSummary } from '@/features/orders';
import type { OrderItem } from '@/features/orders';
import { toast } from 'sonner';
import styles from './page.module.css';

export default function OrderDetailPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = use(params);
  const { data: order, isLoading } = useOrderDetail(id);
  const { mutate: cancelOrder, isPending } = useCancelOrder();

  const handleCancel = () => {
    if (!confirm('Bạn có chắc muốn hủy đơn hàng này?')) return;

    cancelOrder(id, {
      onSuccess: () => {
        toast.success('Hủy đơn hàng thành công');
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingContainer}>Đang tải...</div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className={styles.container}>
        <div className={styles.errorContainer}>
          Không tìm thấy đơn hàng
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link href="/orders" className={styles.backLink}>
          ← Quay lại danh sách đơn hàng
        </Link>
        <h1 className={styles.title}>Chi tiết đơn hàng</h1>
        <p className={styles.orderNumber}>Mã đơn hàng: {order.order_number}</p>
      </div>

      <div className={styles.grid}>
        <div className={styles.mainColumn}>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Trạng thái đơn hàng</h3>
            
            <div className={styles.statusList}>
              <div className={styles.statusRow}>
                <span className={styles.statusLabel}>💰 Thanh toán:</span>
                <span className={`${styles.statusBadge} ${
                  order.payment_status === 'paid' ? styles.statusBadgeGreen :
                  order.payment_status === 'refunded' ? styles.statusBadgeGray :
                  styles.statusBadgeYellow
                }`}>
                  {order.payment_status === 'paid' ? 'Đã thanh toán' :
                   order.payment_status === 'refunded' ? 'Đã hoàn tiền' :
                   'Chưa thanh toán'}
                </span>
              </div>

              <div className={styles.statusRow}>
                <span className={styles.statusLabel}>📋 Đơn hàng:</span>
                <span className={`${styles.statusBadge} ${
                  order.order_status === 'completed' ? styles.statusBadgeGreen :
                  order.order_status === 'cancelled' ? styles.statusBadgeRed :
                  order.order_status === 'processing' ? styles.statusBadgePurple :
                  order.order_status === 'confirmed' ? styles.statusBadgeBlue :
                  styles.statusBadgeYellow
                }`}>
                  {order.order_status === 'pending' ? 'Chờ xác nhận' :
                   order.order_status === 'confirmed' ? 'Đã xác nhận' :
                   order.order_status === 'processing' ? 'Đang chuẩn bị' :
                   order.order_status === 'ready_to_ship' ? 'Sẵn sàng giao' :
                   order.order_status === 'completed' ? 'Hoàn thành' :
                   order.order_status === 'cancelled' ? 'Đã hủy' : order.order_status}
                </span>
              </div>

              <div className={styles.statusRow}>
                <span className={styles.statusLabel}>🚚 Giao hàng:</span>
                <span className={`${styles.statusBadge} ${
                  order.shipping_status === 'delivered' ? styles.statusBadgeGreen :
                  order.shipping_status === 'out_for_delivery' ? styles.statusBadgeIndigo :
                  order.shipping_status === 'in_transit' ? styles.statusBadgeBlue :
                  order.shipping_status === 'failed_delivery' ? styles.statusBadgeRed :
                  styles.statusBadgeGray
                }`}>
                  {order.shipping_status === 'not_shipped' ? 'Chưa giao' :
                   order.shipping_status === 'picking' ? 'Đang lấy hàng' :
                   order.shipping_status === 'in_transit' ? 'Đang vận chuyển' :
                   order.shipping_status === 'out_for_delivery' ? 'Đang giao' :
                   order.shipping_status === 'delivered' ? 'Đã giao hàng' :
                   order.shipping_status === 'failed_delivery' ? 'Giao thất bại' : order.shipping_status}
                </span>
              </div>
            </div>
          </div>

          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Thông tin giao hàng</h3>
            <div className={styles.shippingInfo}>
              <p><strong>Người nhận:</strong> {order.shipping_name}</p>
              <p><strong>Số điện thoại:</strong> {order.shipping_phone}</p>
              <p><strong>Địa chỉ:</strong> {order.shipping_address}</p>
              <p><strong>Quận/Huyện:</strong> {order.shipping_district}</p>
              <p><strong>Tỉnh/Thành phố:</strong> {order.shipping_city}</p>
            </div>
          </div>

          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Sản phẩm</h3>
            <div className={styles.productList}>
              {order.items?.map((item: OrderItem, index: number) => (
                <div key={item._id || item.id || index} className={styles.productItem}>
                  <img
                    src={item.product_image}
                    alt={item.product_name}
                    className={styles.productImage}
                  />
                  <div className={styles.productInfo}>
                    <p className={styles.productName}>{item.product_name}</p>
                    <p className={styles.productQuantity}>x{item.quantity}</p>
                  </div>
                  <p className={styles.productPrice}>
                    {item.subtotal.toLocaleString('vi-VN')} đ
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.sideColumn}>
          <OrderSummary order={order} />

          {(order.order_status === 'pending' || order.order_status === 'confirmed') && (
            <button
              onClick={handleCancel}
              disabled={isPending}
              className={styles.cancelButton}
            >
              {isPending ? 'Đang hủy...' : 'Hủy đơn hàng'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}