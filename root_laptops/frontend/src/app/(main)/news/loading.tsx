import { Loader2 } from "lucide-react";
import styles from './loading.module.css';

export default function Loading() {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingContent}>
        <Loader2 className={styles.spinner} />
        <p className={styles.loadingText}>Đang tải tin tức...</p>
      </div>
    </div>
  );
}
