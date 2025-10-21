import { SearchX } from "lucide-react";
import Link from "next/link";
import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <div className={styles.notFoundContainer}>
      <div className={styles.notFoundCard}>
        <div className={styles.iconWrapper}>
          <SearchX className={styles.icon} />
        </div>
        <h2 className={styles.title}>
          404 - Không tìm thấy trang
        </h2>
        <p className={styles.description}>
          Xin lỗi, trang bạn đang tìm kiếm không tồn tại.
        </p>
        <Link href="/" className={styles.homeButton}>
          <SearchX className={styles.buttonIcon} />
          Quay về trang chủ
        </Link>
      </div>
    </div>
  );
}
