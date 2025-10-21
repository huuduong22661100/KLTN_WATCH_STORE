import styles from './EmptyCart.module.css';

export function EmptyCart() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.icon}>🛒</div>
      <h2 className={styles.title}>
        Giỏ hàng trống
      </h2>
      <p className={styles.subtitle}>
        Bạn chưa có sản phẩm nào trong giỏ hàng
      </p>
      <a
        href="/products"
        className={styles.button}
      >
        Khám phá sản phẩm
      </a>
    </div>
  );
}