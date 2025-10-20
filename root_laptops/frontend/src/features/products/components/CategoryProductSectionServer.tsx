
import { getProducts } from "@/features/products/api/products";
import { ProductCategory } from "@/features/products/types";
import ProductCard from "./ProductCard";
import Link from "next/link";
import { Suspense } from "react";


function ProductSkeleton() {
  return (
    <div className="bg-muted rounded-lg p-4 animate-pulse">
      <div className="h-48 bg-gray-300 rounded mb-4"></div>
      <div className="h-4 bg-gray-300 rounded mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
    </div>
  );
}

function ProductsGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
        <div className="text-center text-muted-foreground py-8">
          Chưa có sản phẩm trong danh mục này
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product: any) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    );
  } catch (error) {
    console.error("Error fetching products:", error);
    return (
      <div className="text-center text-red-500 py-8">
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
    <section className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">{category.category}</h2>
        <Link
          href={`/products?category=${category._id}`}
          className="text-primary hover:underline text-lg"
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
