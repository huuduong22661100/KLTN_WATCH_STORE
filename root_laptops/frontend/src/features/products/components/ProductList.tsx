"use client";
import { useState } from "react";
import { useProducts } from "../hook/useProducts";
import ProductCard from "./ProductCard";
import { Product } from "@/features/products/types";

interface ProductListProps {
    filters?: {
        category?: string;
        page?: number;
        limit?: number;
        color?: string;
        minPrice?: number;
        maxPrice?: number;
        search?: string;
        sort?: string;
    };
}

const ProductList = ({ filters = {} }: ProductListProps) => {
    const [layout, setLayout] = useState<"grid" | "list">("grid");

    const defaultFilters = {
        page: 1,
        limit: 12,
        ...filters,
    };

    const {
        data: products,
        isLoading,
        error,
    } = useProducts(defaultFilters);

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
                {products?.data?.products?.map((product: Product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </section>
    );
};

export default ProductList;