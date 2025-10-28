
import { getProducts } from "@/features/products/api/products";
import { ProductCategory, Product } from "@/features/products/types";
import ProductCard from "./ProductCard";
import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import styles from './CategoryBannerSection.module.css';


function ProductSkeleton() {
  return (
    <div className={styles.skeletonProductCard}>
      <div className={styles.skeletonImage}></div>
      <div className={styles.skeletonLine1}></div>
      <div className={styles.skeletonLine2}></div>
    </div>
  );
}

function ProductsGridSkeleton() {
  return (
    <div className={styles.skeletonGrid}>
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
        <div className={styles.emptyProductsWrapper}>
          <p className={styles.emptyProductsText}>Chưa có sản phẩm trong danh mục này</p>
        </div>
      );
    }

    return (
      <div className={styles.skeletonGrid}>
        {products.map((product: Product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    );
  } catch (error) {
    console.error("Error fetching products:", error);
    return (
      <div className={styles.errorProductsWrapper}>
        <p className={styles.emptyProductsText}>Không thể tải sản phẩm. Vui lòng thử lại sau.</p>
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
    <section className={styles.sectionWrapper}>
      <div className={styles.bannerWrapper}>
        <Image
          src={bannerImage}
          alt={category.category}
          fill
          className={styles.bannerImage}
          sizes="100vw"
          priority={false}
        />
        <div className={styles.bannerOverlay}></div>
        
        <div className={styles.bannerContent}>
          <h2 className={styles.bannerTitle}>
            {category.category}
          </h2>
          <Link
            href={`/products?category=${category._id}`}
            className={styles.viewAllButton}
          >
            Xem tất cả
          </Link>
        </div>
      </div>

      <div className={styles.productsContainer}>
        <Suspense fallback={<ProductsGridSkeleton />}>
          <CategoryProducts categoryId={category._id} />
        </Suspense>
      </div>
    </section>
  );
}
