"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "@/shared/components/ui/card";
import { Calendar, User } from "lucide-react";
import { News } from "../types";
import styles from './NewsCard.module.css';

interface NewsCardProps {
  news: News;
}

export default function NewsCard({ news }: NewsCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  
  const getExcerpt = (content: string, maxLength: number = 150) => {
    const plainText = content.replace(/<[^>]*>/g, "");
    return plainText.length > maxLength
      ? plainText.substring(0, maxLength) + "..."
      : plainText;
  };

  return (
    <Link href={`/news/${news._id}`}>
      <Card className={styles.card}>
        <CardHeader className={styles.cardHeader}>
          <div className={styles.imageWrapper}>
            <Image
              src={news.thumbnail_img}
              alt={news.title}
              fill
              className={styles.image}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </CardHeader>
        
        <CardContent className={styles.cardContent}>
          <h3 className={styles.title}>
            {news.title}
          </h3>
          
          <p className={styles.excerpt}>
            {getExcerpt(news.content)}
          </p>
        </CardContent>

        <CardFooter className={styles.cardFooter}>
          <div className={styles.metaItem}>
            <User className={styles.metaIcon} />
            <span>{news.author_id?.name || "Admin"}</span>
          </div>
          
          <div className={styles.metaItem}>
            <Calendar className={styles.metaIcon} />
            <span>{formatDate(news.createdAt)}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
