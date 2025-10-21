'use client';

import { useRouter } from 'next/navigation';
import { useCart, CartItem, CartSummary, EmptyCart } from '@/features/cart';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/shared/components/ui/button';
import styles from './page.module.css';

export default function CartPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const { data: cart, isLoading, error } = useCart();

  if (!isAuthenticated) {
    return (
      <div className={styles.container}>
        <div className={styles.notAuthContainer}>
          <h2 className={styles.notAuthTitle}>Bạn cần đăng nhập để xem giỏ hàng</h2>
          <p className={styles.notAuthText}>Vui lòng đăng nhập để tiếp tục mua sắm.</p>
          <Button onClick={() => router.push('/auth/login')}>
            Đăng nhập
          </Button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingContainer}>Đang tải giỏ hàng...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.errorContainer}>
          Có lỗi xảy ra khi tải giỏ hàng
        </div>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className={styles.container}>
        <EmptyCart />
      </div>
    );
  }

  const handleCheckout = () => {
    router.push('/checkout');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Giỏ hàng của bạn</h1>

      <div className={styles.grid}>
        <div className={styles.cartItems}>
          {cart.items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        <div className={styles.summaryColumn}>
          <CartSummary cart={cart} onCheckout={handleCheckout} />
        </div>
      </div>
    </div>
  );
}
