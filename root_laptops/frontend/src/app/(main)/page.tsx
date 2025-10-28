
import HomeBanner from "@/features/products/components/HomeBanner";
import CategoryBannerSection from "@/features/products/components/CategoryBannerSection";
import { getCategories } from "@/features/products/api/categories";
import { ProductCategory } from "@/features/products/types";
import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from 'next';
import styles from './page.module.css';


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
    <section className={styles.skeletonSection}>
      <div className={styles.skeletonHeader}>
        <div className={styles.skeletonTitle}></div>
        <div className={styles.skeletonLink}></div>
      </div>
      <div className={styles.skeletonGrid}>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className={styles.skeletonCard}>
            <div className={styles.skeletonImage}></div>
            <div className={styles.skeletonText}></div>
            <div className={styles.skeletonTextShort}></div>
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
      <section className={styles.categoriesSection}>
        <div className={styles.container}>
          <div className={styles.categoriesWrapper}>
            <h2 className={styles.categoriesTitle}>Khám phá danh mục</h2>
            <div className={styles.categoriesGrid}>
              <div className={styles.categoryCard}>
                <div className={styles.categoryImageWrapper}>
                  <Image 
                    src="/assets/image/Casio_gaming.jpg" 
                    alt="Watch Gaming" 
                    fill
                    className={styles.categoryImage}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                </div>
                <h3 className={styles.categoryTitle}>Watch Gaming</h3>
                <p className={styles.categoryDescription}>
                  Dòng đồng hồ thể thao với độ bền vượt trội, phù hợp cho mọi hoạt động ngoài trời
                </p>
                <Link href="/products?category=68d576258eeaf6e58e8aaa3d" className={styles.categoryLink}>
                  Xem ngay
                </Link>
              </div>
              
              <div className={styles.categoryCard}>
                <div className={styles.categoryImageWrapper}>
                  <Image 
                    src="/assets/image/banner-Casio Trẻ Trung.jpg" 
                    alt="Watch Văn phòng" 
                    fill
                    className={styles.categoryImage}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                </div>
                <h3 className={styles.categoryTitle}>Watch Văn phòng</h3>
                <p className={styles.categoryDescription}>
                  Sang trọng, lịch lãm phù hợp cho môi trường công sở và các sự kiện quan trọng
                </p>
                <Link href="/products?category=68d576258eeaf6e58e8aaa3a" className={styles.categoryLink}>
                  Xem ngay
                </Link>
              </div>
              
              <div className={styles.categoryCard}>
                <div className={styles.categoryImageWrapper}>
                  <Image 
                    src="/assets/image/Sinh-vien.jpg" 
                    alt="Watch cho Sinh viên" 
                    fill
                    className={styles.categoryImage}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                </div>
                <h3 className={styles.categoryTitle}>Watch cho Sinh viên</h3>
                <p className={styles.categoryDescription}>
                  Thiết kế trẻ trung, năng động với mức giá phù hợp cho sinh viên
                </p>
                <Link href="/products?category=68d576258eeaf6e58e8aaa42" className={styles.categoryLink}>
                  Xem ngay
                </Link>
              </div>
              
              <div className={styles.categoryCard}>
                <div className={styles.categoryImageWrapper}>
                  <Image 
                    src="/assets/image/đồ hạo.jpg" 
                    alt="Watch Đồ họa" 
                    fill
                    className={styles.categoryImage}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                </div>
                <h3 className={styles.categoryTitle}>Watch Đồ họa</h3>
                <p className={styles.categoryDescription}>
                  Tinh tế, thanh lịch dành cho những ai yêu thích sự sáng tạo và nghệ thuật
                </p>
                <Link href="/products?category=68d576258eeaf6e58e8aaa3a" className={styles.categoryLink}>
                  Xem ngay
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {}
      <div className={styles.productSectionsWrapper}>
        <div className={`${styles.container} ${styles.productSections}`}>
          {categories.map((category: ProductCategory) => (
            <Suspense key={category._id} fallback={<CategorySectionSkeleton />}>
              <CategoryBannerSection category={category} />
            </Suspense>
          ))}
        </div>
      </div>

      {}
      <section className={styles.brandsSection}>
        <div className={styles.container}>
          <h2 className={styles.brandsTitle}>Thương hiệu nổi bật</h2>
          <div className={styles.brandsGrid}>
            <div className={styles.brandLogoWrapper}>
              <Image src="/assets/image/brand-dell.png" alt="Dell" fill className={styles.brandLogo} sizes="(max-width: 768px) 50vw, 16vw" />
            </div>
            <div className={styles.brandLogoWrapper}>
              <Image src="/assets/image/brand-hp.png" alt="HP" fill className={styles.brandLogo} sizes="(max-width: 768px) 50vw, 16vw" />
            </div>
            <div className={styles.brandLogoWrapper}>
              <Image src="/assets/image/brand-lenovo.png" alt="Lenovo" fill className={styles.brandLogo} sizes="(max-width: 768px) 50vw, 16vw" />
            </div>
            <div className={styles.brandLogoWrapper}>
              <Image src="/assets/image/brand-asus.png" alt="Asus" fill className={styles.brandLogo} sizes="(max-width: 768px) 50vw, 16vw" />
            </div>
            <div className={styles.brandLogoWrapper}>
              <Image src="/assets/image/brand-apple.png" alt="Apple" fill className={styles.brandLogo} sizes="(max-width: 768px) 50vw, 16vw" />
            </div>
            <div className={styles.brandLogoWrapper}>
              <Image src="/assets/image/brand-acer.png" alt="Acer" fill className={styles.brandLogo} sizes="(max-width: 768px) 50vw, 16vw" />
            </div>
          </div>
        </div>
      </section>

      {}
      <section className={styles.promoSection}>
        <div className={styles.container}>
          <div className={styles.promoCard}>
            <h2 className={styles.promoTitle}>Ưu đãi đặc biệt!</h2>
            <p className={styles.promoText}>Giảm giá lên đến 20% cho tất cả Watch gaming.</p>
            <Link href="/products?category=Gaming" className={styles.promoButton}>
              Mua ngay
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}