import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getNewsById, getAllNews } from "@/features/news";
import type { News } from "@/features/news";

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
    <div className="py-8">
      <article className="max-w-6xl mx-auto">
        {}
        {newsArticle.thumbnail_img && (
          <div className="relative w-full h-[350px] md:h-[450px] mb-8">
            <Image
              src={newsArticle.thumbnail_img}
              alt={newsArticle.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {}
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            {newsArticle.title}
          </h1>

          <div className="flex items-center gap-3 text-sm text-gray-600 mb-8 pb-6 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4"
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
              <span className="font-medium">
                {typeof newsArticle.author_id === "object"
                  ? newsArticle.author_id.name
                  : "Admin"}
              </span>
            </div>
            <span className="text-gray-400">•</span>
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4"
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
            className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-blue-600 prose-strong:text-gray-900 prose-img:rounded-lg"
            dangerouslySetInnerHTML={{ __html: newsArticle.content }}
          />
        </div>
      </article>
    </div>
  );
}
