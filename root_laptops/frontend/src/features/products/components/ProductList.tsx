"use client";
import { useState } from "react";
import { useProducts } from "../hook/useProducts";
import ProductCard from "./ProductCard";
import { Product } from "@/features/products/types";
import styles from './ProductList.module.css';

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
        return <div className={styles.loadingMessage}>Đang tải sản phẩm...</div>;
    }

    if (error) {
        return <div className={styles.errorMessage}>Có lỗi xảy ra</div>;
    }

    const containerClasses =
        layout === "grid"
            ? styles.gridContainer
            : styles.listContainer;

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