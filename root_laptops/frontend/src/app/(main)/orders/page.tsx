'use client';

import { useState } from 'react';
import { useAuthGuard } from '@/hooks/useAuthGuard';
import { useOrders, OrderItemCard } from '@/features/orders';
import type { Order } from '@/features/orders';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import styles from './page.module.css';

export default function OrdersPage() {
  const router = useRouter();
  const { isHydrated, isAuthenticated } = useAuthGuard();
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useOrders(page, 10);

  const handleViewDetail = (orderId: string) => {
    router.push(`/orders/${orderId}`);
  };

  
  if (!isHydrated) {
    return (
      <div className={styles.loadingContainer}>
        <Loader2 className={styles.spinner} />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.centerContent}>
          <Loader2 className={styles.spinner} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.centerContent}>
          <p className={styles.errorTitle}>Lỗi tải đơn hàng</p>
          <p className={styles.errorMessage}>{(error as Error).message}</p>
          <button 
            onClick={() => window.location.reload()} 
            className={styles.retryButton}
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  if (!data || data.data.orders.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.centerContent}>
          <p className={styles.emptyTitle}>Chưa có đơn hàng nào</p>
          <a href="/products" className={styles.emptyLink}>
            Bắt đầu mua sắm
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Đơn hàng của bạn</h1>

      <div className={styles.ordersList}>
        {data.data.orders.map((order: Order) => (
          <OrderItemCard 
            key={order._id || order.id} 
            order={order}
            onViewDetail={handleViewDetail}
          />
        ))}
      </div>

      {data.data.totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className={styles.paginationButton}
          >
            Trước
          </button>
          
          <span className={styles.paginationInfo}>
            Trang {page} / {data.data.totalPages}
          </span>
          
          <button
            onClick={() => setPage(p => Math.min(data.data.totalPages, p + 1))}
            disabled={page === data.data.totalPages}
            className={styles.paginationButton}
          >
            Sau
          </button>
        </div>
      )}
    </div>
  );
}