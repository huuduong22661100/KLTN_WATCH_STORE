
import { getProducts } from "@/features/products/api/products";
import { ProductCategory, Product } from "@/features/products/types";
import ProductCard from "./ProductCard";
import Link from "next/link";
import { Suspense } from "react";
import styles from './CategoryProductSectionServer.module.css';


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
    <div className={styles.productsGrid}>
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

    const products = productsData?.data?.products || [];

    if (products.length === 0) {
      return (
        <div className={styles.emptyProductsMessage}>
          Chưa có sản phẩm trong danh mục này
        </div>
      );
    }

    return (
      <div className={styles.productsGrid}>
        {products.map((product: Product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    );
  } catch (error) {
    console.error("Error fetching products:", error);
    return (
      <div className={styles.errorProductsMessage}>
        Không thể tải sản phẩm. Vui lòng thử lại sau.
      </div>
    );
  }
}


export default function CategoryProductSection({
  category,
}: {
  category: ProductCategory;
}) {
  return (
    <section className={styles.sectionWrapper}>
      <div className={styles.header}>
        <h2 className={styles.title}>{category.category}</h2>
        <Link
          href={`/products?category=${category._id}`}
          className={styles.viewAllLink}
        >
          Xem tất cả
        </Link>
      </div>
      <Suspense fallback={<ProductsGridSkeleton />}>
        <CategoryProducts categoryId={category._id} />
      </Suspense>
    </section>
  );
}
