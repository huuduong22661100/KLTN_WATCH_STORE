import { getAllNews } from "@/features/news/api";
import NewsCard from "@/features/news/components/NewsCard";
import { News } from "@/features/news/types";
import { Newspaper } from "lucide-react";

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
    <div className="container mx-auto px-4 py-8">
      {}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Newspaper className="w-8 h-8 text-primary" />
          <h1 className="text-4xl font-bold">Tin Tức</h1>
        </div>
        <p className="text-muted-foreground text-lg">
          Cập nhật tin tức mới nhất về đồng hồ và xu hướng thời trang
        </p>
      </div>

      {}
      {error && (
        <div className="text-center py-12">
          <p className="text-red-500 text-lg">{error}</p>
        </div>
      )}

      {}
      {!error && newsData.length === 0 && (
        <div className="text-center py-12">
          <Newspaper className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Chưa có tin tức</h2>
          <p className="text-muted-foreground">
            Hiện tại chưa có bài viết nào. Vui lòng quay lại sau!
          </p>
        </div>
      )}

      {}
      {!error && newsData.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsData.map((news) => (
            <NewsCard key={news._id} news={news} />
          ))}
        </div>
      )}
    </div>
  );
}
