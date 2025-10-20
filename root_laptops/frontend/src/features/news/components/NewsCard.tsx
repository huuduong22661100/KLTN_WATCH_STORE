"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "@/shared/components/ui/card";
import { Calendar, User } from "lucide-react";
import { News } from "../types";

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
      <Card className="h-full hover:shadow-lg transition-shadow duration-300 cursor-pointer overflow-hidden">
        <CardHeader className="p-0">
          <div className="relative w-full h-56 overflow-hidden">
            <Image
              src={news.thumbnail_img}
              alt={news.title}
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </CardHeader>
        
        <CardContent className="p-4 space-y-3">
          <h3 className="text-xl font-bold line-clamp-2 hover:text-primary transition-colors">
            {news.title}
          </h3>
          
          <p className="text-muted-foreground text-sm line-clamp-3">
            {getExcerpt(news.content)}
          </p>
        </CardContent>

        <CardFooter className="px-4 pb-4 pt-0 flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <User className="w-4 h-4" />
            <span>{news.author_id?.name || "Admin"}</span>
          </div>
          
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(news.createdAt)}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
