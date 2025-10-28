'use client';

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { CheckCircle, Package, Home, FileText } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { useCartStore } from '@/store/cartStore';
import styles from './page.module.css';

export default function OrderSuccessPage() {
  const router = useRouter();
  const params = useParams();
  const orderId = params.orderId as string;
  const clearCart = useCartStore(state => state.clearCart);

  useEffect(() => {
    
    clearCart();
  }, [clearCart]);

  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        <div className={styles.successHeader}>
          <div className={styles.successIconWrapper}>
            <CheckCircle className={styles.successIcon} />
          </div>
          <h1 className={styles.successTitle}>
            Đặt hàng thành công!
          </h1>
          <p className={styles.successMessage}>
            Cảm ơn bạn đã đặt hàng. Chúng tôi đã nhận được đơn hàng của bạn.
          </p>
        </div>

        <div className={styles.orderDetailsCard}>
          <div className={styles.orderIdHeader}>
            <div>
              <p className={styles.orderIdLabel}>Mã đơn hàng</p>
              <p className={styles.orderIdValue}>{orderId}</p>
            </div>
            <Package className={styles.packageIcon} />
          </div>

          <div className={styles.orderInfoSection}>
            <h3 className={styles.orderInfoTitle}>Thông tin đơn hàng:</h3>
            <ul className={styles.orderInfoList}>
              <li className={styles.orderInfoListItem}>
                <span className={styles.bullet}>•</span>
                <span>Đơn hàng của bạn đang được xử lý</span>
              </li>
              <li className={styles.orderInfoListItem}>
                <span className={styles.bullet}>•</span>
                <span>Chúng tôi sẽ gửi email xác nhận đến bạn trong giây lát</span>
              </li>
              <li className={styles.orderInfoListItem}>
                <span className={styles.bullet}>•</span>
                <span>Thời gian giao hàng dự kiến: 2-3 ngày làm việc</span>
              </li>
              <li className={styles.orderInfoListItem}>
                <span className={styles.bullet}>•</span>
                <span>Bạn có thể theo dõi đơn hàng trong mục &quot;Đơn hàng của tôi&quot;</span>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.actionButtonsGrid}>
          <Button
            onClick={() => router.push('/orders')}
            className={styles.viewOrderButton}
            size="lg"
          >
            <FileText className={styles.buttonIcon} />
            Xem đơn hàng
          </Button>
          
          <Button
            onClick={() => router.push('/')}
            variant="outline"
            className={styles.homeButton}
            size="lg"
          >
            <Home className={styles.buttonIcon} />
            Về trang chủ
          </Button>
        </div>

        <div className={styles.helpSection}>
          <p className={styles.helpText}>
            Cần hỗ trợ?{' '}
            <a href="/contact" className={styles.contactLink}>
              Liên hệ với chúng tôi
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
