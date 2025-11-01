import { getAllNews } from "@/features/news/api";
import NewsCard from "@/features/news/components/NewsCard";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import styles from './LatestNews.module.css';

export default async function LatestNews() {
  try {
    const response = await getAllNews();
    
    // Lấy 3 tin tức mới nhất
    const latestNews = response.data.slice(0, 3);

    if (!latestNews || latestNews.length === 0) {
      return null;
    }

    return (
      <section className={styles.newsSection}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h2 className={styles.title}>Tin tức mới nhất</h2>
            <Link href="/news" className={styles.viewAllLink}>
              Xem tất cả
              <ChevronRight className={styles.chevronIcon} />
            </Link>
          </div>
          
          <div className={styles.newsGrid}>
            {latestNews.map((news) => (
              <NewsCard key={news._id} news={news} />
            ))}
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error("Failed to fetch news:", error);
    return null;
  }
}
