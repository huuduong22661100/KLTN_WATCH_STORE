
import { getProducts } from "@/features/products/api/products";
import { ProductCategory } from "@/features/products/types";
import ProductCard from "./ProductCard";
import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";


function ProductSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 animate-pulse">
      <div className="h-48 bg-gray-200 rounded mb-4"></div>
      <div className="h-4 bg-gray-200 rounded mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
    </div>
  );
}

function ProductsGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
      {[1, 2, 3, 4].map((i) => (
        <ProductSkeleton key={i} />
      ))}
    </div>
  );
}


async function CategoryProducts({ categoryId }: { categoryId: string }) {
  try {
    const productsData = await getProducts({
      category: categoryId,
      limit: 4,
      page: 1,
    });

    const products = productsData?.data || [];

    if (products.length === 0) {
      return (
        <div className="text-center text-gray-500 py-12 bg-gray-50 rounded-lg">
          <p className="text-lg">Chưa có sản phẩm trong danh mục này</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        {products.map((product: any) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    );
  } catch (error) {
    console.error("Error fetching products:", error);
    return (
      <div className="text-center text-red-500 py-12 bg-red-50 rounded-lg">
        <p className="text-lg">Không thể tải sản phẩm. Vui lòng thử lại sau.</p>
      </div>
    );
  }
}


const categoryBannerMap: Record<string, string> = {
  "Casio G-SHOCK": "/assets/image/banner-G-shock.jpg",
  "Sản Phẩm Mới": "/assets/image/banner-Sản Phẩm Mới.jpg",
  "Casio BABY-G": "/assets/image/banner-Casio BABY-G.jpg",
  "Limited Edition": "/assets/image/banner-Limited Edition.jpg",
  "Casio EDIFICE": "/assets/image/banner-Casio EDIFICE.jpg",
  "Casio PRO-TREK": "/assets/image/banner-Casio PRO-TREK.jpg",
  "CASIO SHEEN": "/assets/image/banner-CASIO SHEEN.jpg",
  "Casio Lịch Lãm": "/assets/image/banner-Casio Lịch Lãm.jpg",
  "Casio Trẻ Trung": "/assets/image/banner-Casio Trẻ Trung.jpg",
};


export default function CategoryBannerSection({
  category,
}: {
  category: ProductCategory;
}) {
  const bannerImage = categoryBannerMap[category.category] || "/assets/image/banner-Sản Phẩm Mới.jpg";

  return (
    <section className="mb-12">
      {}
      <div className="relative w-full h-[200px] md:h-[250px] lg:h-[300px] rounded-2xl overflow-hidden shadow-lg mb-6">
        <Image
          src={bannerImage}
          alt={category.category}
          fill
          className="object-cover"
          sizes="100vw"
          priority={false}
        />
        {}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
        
        {}
        <div className="absolute inset-0 flex items-center justify-between px-8 md:px-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white drop-shadow-2xl">
            {category.category}
          </h2>
          <Link
            href={`/products?category=${category._id}`}
            className="bg-white text-gray-900 hover:bg-gray-100 px-6 py-3 rounded-full font-semibold transition-all hover:scale-105 shadow-xl"
          >
            Xem tất cả
          </Link>
        </div>
      </div>

      {}
      <div className="container mx-auto px-4">
        <Suspense fallback={<ProductsGridSkeleton />}>
          <CategoryProducts categoryId={category._id} />
        </Suspense>
      </div>
    </section>
  );
}
