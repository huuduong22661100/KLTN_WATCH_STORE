"use client";
import { useState } from "react";
import { useProducts } from "../hook/useProducts";
import ProductCard from "./ProductCard";

const ProductList = () => {
    const [layout, setLayout] = useState<"grid" | "list">("grid");

    const {
        data: products,
        isLoading,
        error,
    } = useProducts({ page: 1, limit: 12 }); // Truyền object thay vì 2 tham số

    if (isLoading) {
        return <div>Đang tải sản phẩm...</div>;
    }

    if (error) {
        return <div>Có lỗi xảy ra</div>;
    }

    const containerClasses =
        layout === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            : "flex flex-col gap-6";

    return (
        <section>
            <div className={containerClasses}>
                {products?.data?.products?.map((product: any) => (
                    <ProductCard key={product.id} product={product} layout={layout} />
                ))}
            </div>
        </section>
    );
};

export default ProductList;