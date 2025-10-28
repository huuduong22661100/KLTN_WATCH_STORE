import Link from 'next/link';
import { Cart } from '../types';
import { Button } from '@/shared/components/ui/button';
import styles from './CartSummary.module.css';

interface CartSummaryProps {
  cart: Cart;
  onCheckout: () => void;
}

export function CartSummary({ cart, onCheckout }: CartSummaryProps) {
  
  const calculatedTotal = cart.items.reduce((total: number, item) => {
    return total + (item.price * item.quantity);
  }, 0);

  return (
    <div className={styles.summaryCard}>
      <h2 className={styles.title}>Tổng đơn hàng</h2>

      <div className={styles.details}>
        <div className={styles.detailRow}>
          <span>Tạm tính ({cart.itemCount} sản phẩm):</span>
          <span>{calculatedTotal.toLocaleString('vi-VN')} đ</span>
        </div>
        <div className={styles.detailRow}>
          <span>Phí vận chuyển:</span>
          <span className={styles.shippingFee}>Miễn phí</span>
        </div>
        <div className={styles.totalRow}>
          <span>Tổng cộng:</span>
          <span className={styles.totalPrice}>
            {calculatedTotal.toLocaleString('vi-VN')} đ
          </span>
        </div>
      </div>

      <div className={styles.actions}>
        <Button
          onClick={onCheckout}
          className={styles.checkoutButton}
        >
          Tiến hành đặt hàng
        </Button>
        <Link href="/products" passHref>
          <Button variant="outline" className={styles.continueButton}>
            Tiếp tục mua sắm
          </Button>
        </Link>
      </div>
    </div>
  );
}
