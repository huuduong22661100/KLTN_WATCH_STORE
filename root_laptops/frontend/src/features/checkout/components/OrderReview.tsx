import { useCart } from '@/features/cart';
import { CheckoutSummary } from '../types';
import { CartItem } from '@/features/cart/types';
import styles from './OrderReview.module.css';

interface OrderReviewProps {
  summary: CheckoutSummary;
  isCalculatingFee: boolean;
  isSubmitting?: boolean;
  onSubmit?: () => void;
}

export function OrderReview({ 
  summary, 
  isCalculatingFee,
  isSubmitting = false,
  onSubmit
}: OrderReviewProps) {
  const { data: cart } = useCart();

  return (
    <div className={styles.reviewCard}>
      <h3 className={styles.title}>Đơn hàng của bạn</h3>

      <div className={styles.itemList}>
        {cart?.items.map((item: CartItem) => {
          return (
            <div key={item.id} className={styles.item}>
              <img
                src={item.product_image || '/assets/image/placeholder.png'}
                alt={item.product_name}
                className={styles.itemImage}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/assets/image/placeholder.png';
                }}
              />
              <div className={styles.itemInfo}>
                <p className={styles.itemTitle}>{item.product_name}</p>
                <p className={styles.itemQuantity}>x{item.quantity}</p>
              </div>
              <div className={styles.itemPriceWrapper}>
                <p className={styles.itemRegularPrice}>
                  {(item.price * item.quantity).toLocaleString('vi-VN')} đ
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.summaryDetails}>
        <div className={styles.summaryRow}>
          <span className={styles.summaryLabel}>
            Tạm tính ({summary.itemCount} sản phẩm):
          </span>
          <span>{summary.subtotal.toLocaleString('vi-VN')} đ</span>
        </div>

        <div className={styles.summaryRow}>
          <span className={styles.summaryLabel}>Phí vận chuyển:</span>
          <span>
            {isCalculatingFee ? (
              <span className={styles.calculating}>Đang tính...</span>
            ) : summary.shipping_fee === 0 ? (
              <span className={styles.highlightGreen}>Miễn phí</span>
            ) : (
              `${summary.shipping_fee.toLocaleString('vi-VN')} đ`
            )}
          </span>
        </div>

        {summary.discount > 0 && (
          <div className={styles.summaryRow}>
            <span className={styles.summaryLabel}>Giảm giá:</span>
            <span className={styles.highlightGreen}>
              -{summary.discount.toLocaleString('vi-VN')} đ
            </span>
          </div>
        )}

        <div className={styles.totalRow}>
          <span>Tổng cộng:</span>
          <span className={styles.totalPrice}>
            {summary.total.toLocaleString('vi-VN')} đ
          </span>
        </div>
      </div>

      {onSubmit && (
        <>
          <button
            type="button"
            onClick={onSubmit}
            disabled={isSubmitting}
            className={styles.submitButton}
          >
            {isSubmitting ? (
              <span className={styles.submitButtonContent}>
                <svg className={styles.spinner} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className={styles.spinnerCircle} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className={styles.spinnerPath} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Đang xử lý...
              </span>
            ) : (
              `Đặt hàng (${summary.total.toLocaleString('vi-VN')} đ)`
            )}
          </button>

          <p className={styles.terms}>
            Bằng việc đặt hàng, bạn đồng ý với{' '}
            <a href="/terms" className={styles.termsLink}>
              Điều khoản dịch vụ
            </a>
          </p>
        </>
      )}
    </div>
  );
}
