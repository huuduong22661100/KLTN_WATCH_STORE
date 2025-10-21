import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getNewsById, getAllNews } from "@/features/news";
import type { News } from "@/features/news";
import styles from './page.module.css';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  
  try {
    const newsArticle = await getNewsById(id);

    return {
      title: newsArticle.title,
      description: newsArticle.content.slice(0, 160),
      openGraph: {
        title: newsArticle.title,
        description: newsArticle.content.slice(0, 160),
        images: newsArticle.thumbnail_img ? [newsArticle.thumbnail_img] : [],
        type: "article",
        publishedTime: newsArticle.createdAt,
      },
    };
  } catch (error) {
    return {
      title: "News Article Not Found",
    };
  }
}

export async function generateStaticParams() {
  const response = await getAllNews();

  return response.data.map((article: News) => ({
    id: article._id,
  }));
}

export default async function NewsDetailPage({ params }: Props) {
  const { id } = await params;
  
  let newsArticle: News;

  try {
    newsArticle = await getNewsById(id);
  } catch (error) {
    notFound();
  }

  return (
    <div className={styles.container}>
      <article className={styles.article}>
        {}
        {newsArticle.thumbnail_img && (
          <div className={styles.thumbnailWrapper}>
            <Image
              src={newsArticle.thumbnail_img}
              alt={newsArticle.title}
              fill
              className={styles.thumbnail}
              priority
            />
          </div>
        )}

        <div className={styles.content}>
          <h1 className={styles.title}>
            {newsArticle.title}
          </h1>

          <div className={styles.meta}>
            <div className={styles.metaItem}>
              <svg
                className={styles.metaIcon}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span className={styles.metaAuthor}>
                {typeof newsArticle.author_id === "object"
                  ? newsArticle.author_id.name
                  : "Admin"}
              </span>
            </div>
            <span className={styles.metaDivider}>•</span>
            <div className={styles.metaItem}>
              <svg
                className={styles.metaIcon}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <time>
                {new Date(newsArticle.createdAt).toLocaleDateString("vi-VN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>
          </div>

          <div
            className={styles.articleContent}
            dangerouslySetInnerHTML={{ __html: newsArticle.content }}
          />
        </div>
      </article>
    </div>
  );
}
