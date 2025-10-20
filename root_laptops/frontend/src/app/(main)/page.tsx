

import HomeBanner from "@/features/products/components/HomeBanner";
import CategoryBannerSection from "@/features/products/components/CategoryBannerSection";
import { getCategories } from "@/features/products/api/categories";
import { ProductCategory } from "@/features/products/types";
import { Suspense } from "react";
import Image from "next/image";
import type { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'Trang chủ - Cửa hàng đồng hồ Casio',
  description: 'Khám phá bộ sưu tập đồng hồ Casio chính hãng: G-SHOCK, BABY-G, EDIFICE, SHEEN. Giá tốt, giao hàng toàn quốc.',
  keywords: 'đồng hồ casio, g-shock, baby-g, edifice, casio việt nam',
  openGraph: {
    title: 'Trang chủ - Cửa hàng đồng hồ Casio',
    description: 'Khám phá bộ sưu tập đồng hồ Casio chính hãng',
    type: 'website',
  },
};


export const revalidate = 300;


function CategorySectionSkeleton() {
  return (
    <section className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div className="h-8 bg-gray-300 rounded w-48 animate-pulse"></div>
        <div className="h-6 bg-gray-300 rounded w-24 animate-pulse"></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-muted rounded-lg p-4 animate-pulse">
            <div className="h-48 bg-gray-300 rounded mb-4"></div>
            <div className="h-4 bg-gray-300 rounded mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default async function HomePage() {
  
  const categoriesData = await getCategories();
  const categories: ProductCategory[] = categoriesData?.data || [];

  return (
    <main>
      {}
      <HomeBanner name="Home" />

      {}
      <section className="container mx-auto px-4 py-12">
        <div className="bg-gray-50 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-12">Khám phá danh mục</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="relative h-40 mb-4">
                <Image 
                  src="/assets/image/Casio_gaming.jpg" 
                  alt="Watch Gaming" 
                  fill
                  className="object-cover rounded"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">Watch Gaming</h3>
              <p className="text-gray-600 text-sm mb-3">
                Dòng đồng hồ thể thao với độ bền vượt trội, phù hợp cho mọi hoạt động ngoài trời
              </p>
              <a href="/products?category=68d576258eeaf6e58e8aaa3d" className="text-primary hover:underline font-medium">
                Xem ngay
              </a>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="relative h-40 mb-4">
                <Image 
                  src="/assets/image/banner-Casio Trẻ Trung.jpg" 
                  alt="Watch Văn phòng" 
                  fill
                  className="object-cover rounded"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">Watch Văn phòng</h3>
              <p className="text-gray-600 text-sm mb-3">
                Sang trọng, lịch lãm phù hợp cho môi trường công sở và các sự kiện quan trọng
              </p>
              <a href="/products?category=68d576258eeaf6e58e8aaa3a" className="text-primary hover:underline font-medium">
                Xem ngay
              </a>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="relative h-40 mb-4">
                <Image 
                  src="/assets/image/Sinh-vien.jpg" 
                  alt="Watch cho Sinh viên" 
                  fill
                  className="object-cover rounded"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">Watch cho Sinh viên</h3>
              <p className="text-gray-600 text-sm mb-3">
                Thiết kế trẻ trung, năng động với mức giá phù hợp cho sinh viên
              </p>
              <a href="/products?category=68d576258eeaf6e58e8aaa42" className="text-primary hover:underline font-medium">
                Xem ngay
              </a>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="relative h-40 mb-4">
                <Image 
                  src="/assets/image/đồ hạo.jpg" 
                  alt="Watch Đồ họa" 
                  fill
                  className="object-cover rounded"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">Watch Đồ họa</h3>
              <p className="text-gray-600 text-sm mb-3">
                Tinh tế, thanh lịch dành cho những ai yêu thích sự sáng tạo và nghệ thuật
              </p>
              <a href="/products?category=68d576258eeaf6e58e8aaa3a" className="text-primary hover:underline font-medium">
                Xem ngay
              </a>
            </div>
          </div>
        </div>
      </section>

      {}
      <div className="container mx-auto px-4 py-8 space-y-12">
        {categories.map((category: ProductCategory) => (
          <Suspense key={category._id} fallback={<CategorySectionSkeleton />}>
            <CategoryBannerSection category={category} />
          </Suspense>
        ))}
      </div>

      {}
      <section className="bg-muted py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Thương hiệu nổi bật</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-center">
          {}
          <div className="relative h-16 w-full opacity-75 hover:opacity-100 transition-opacity">
            <Image src="/assets/image/brand-dell.png" alt="Dell" fill className="object-contain" sizes="(max-width: 768px) 50vw, 16vw" />
          </div>
          <div className="relative h-16 w-full opacity-75 hover:opacity-100 transition-opacity">
            <Image src="/assets/image/brand-hp.png" alt="HP" fill className="object-contain" sizes="(max-width: 768px) 50vw, 16vw" />
          </div>
          <div className="relative h-16 w-full opacity-75 hover:opacity-100 transition-opacity">
            <Image src="/assets/image/brand-lenovo.png" alt="Lenovo" fill className="object-contain" sizes="(max-width: 768px) 50vw, 16vw" />
          </div>
          <div className="relative h-16 w-full opacity-75 hover:opacity-100 transition-opacity">
            <Image src="/assets/image/brand-asus.png" alt="Asus" fill className="object-contain" sizes="(max-width: 768px) 50vw, 16vw" />
          </div>
          <div className="relative h-16 w-full opacity-75 hover:opacity-100 transition-opacity">
            <Image src="/assets/image/brand-apple.png" alt="Apple" fill className="object-contain" sizes="(max-width: 768px) 50vw, 16vw" />
          </div>
          <div className="relative h-16 w-full opacity-75 hover:opacity-100 transition-opacity">
            <Image src="/assets/image/brand-acer.png" alt="Acer" fill className="object-contain" sizes="(max-width: 768px) 50vw, 16vw" />
          </div>
        </div>
        </div>
      </section>

      {}
      <section className="container mx-auto px-4 py-12">
        <div className="relative bg-primary text-primary-foreground p-12 rounded-lg text-center">
          <h2 className="text-4xl font-bold mb-4">Ưu đãi đặc biệt!</h2>
          <p className="text-xl mb-6">Giảm giá lên đến 20% cho tất cả Watch gaming.</p>
          <a href="/products?category=Gaming" className="bg-primary-foreground text-primary font-semibold px-8 py-3 rounded-full hover:bg-muted transition-colors">
            Mua ngay
          </a>
        </div>
      </section>
    </main>
  );
}