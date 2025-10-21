import { getAllNews } from "@/features/news/api";
import NewsCard from "@/features/news/components/NewsCard";
import { News } from "@/features/news/types";
import { Newspaper } from "lucide-react";
import styles from './page.module.css';

export const metadata = {
  title: "Tin Tức - Watch Store",
  description: "Tin tức mới nhất về đồng hồ và thời trang",
};

export default async function NewsPage() {
  let newsData: News[] = [];
  let error = null;

  try {
    const response = await getAllNews();
    newsData = response.data;
  } catch (err) {
    error = err instanceof Error ? err.message : "Không thể tải tin tức";
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleWrapper}>
          <Newspaper className={styles.icon} />
          <h1 className={styles.title}>Tin Tức</h1>
        </div>
        <p className={styles.subtitle}>
          Cập nhật tin tức mới nhất về đồng hồ và xu hướng thời trang
        </p>
      </div>

      {error && (
        <div className={styles.errorContainer}>
          <p className={styles.errorText}>{error}</p>
        </div>
      )}

      {!error && newsData.length === 0 && (
        <div className={styles.emptyContainer}>
          <Newspaper className={styles.emptyIcon} />
          <h2 className={styles.emptyTitle}>Chưa có tin tức</h2>
          <p className={styles.emptyText}>
            Hiện tại chưa có bài viết nào. Vui lòng quay lại sau!
          </p>
        </div>
      )}

      {!error && newsData.length > 0 && (
        <div className={styles.newsGrid}>
          {newsData.map((news) => (
            <NewsCard key={news._id} news={news} />
          ))}
        </div>
      )}
    </div>
  );
}
