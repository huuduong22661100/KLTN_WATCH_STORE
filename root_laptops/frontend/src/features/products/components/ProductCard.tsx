"use client";

import { Star, ShoppingCart, Heart } from 'lucide-react';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/features/wishlist/store/wishlistStore";
import { useState, useEffect } from "react";
import { Product } from "@/features/products/types";
import styles from './ProductCard.module.css';

interface ProductCardProps {
    product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
    const addToWishlist = useWishlistStore((state) => state.addToWishlist);
    const removeFromWishlist = useWishlistStore((state) => state.removeFromWishlist);
    const isInWishlist = useWishlistStore((state) => state.isInWishlist);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        setIsFavorite(isInWishlist(product._id));
    }, [product._id, isInWishlist]);

    const handleWishlistToggle = () => {
        if (isFavorite) {
            removeFromWishlist(product._id);
        } else {
            addToWishlist(product);
        }
        setIsFavorite(!isFavorite);
    };

    return (
        <Card className={styles.card}>
            <Button
                variant="ghost"
                size="icon"
                className={styles.wishlistButton}
                onClick={handleWishlistToggle}
            >
                <Heart 
                    className={`${styles.heartIcon} ${isFavorite ? styles.heartIconFavorite : styles.heartIconDefault}`} 
                />
            </Button>

            <CardHeader className={styles.cardHeader}>
                <a href={`/products/${product._id}`}>
                    <div className={styles.imageWrapper}>
                        <Image 
                            src={product.images.mainImg.url} 
                            alt={product.images.mainImg.alt_text} 
                            fill 
                            className={styles.image} 
                        />
                    </div>
                </a>
            </CardHeader>
            
            <CardContent className={styles.cardContent}>
                <a href={`/products/${product._id}`}>
                    <h3 className={styles.title}>
                        {product.title}
                    </h3>
                </a>
                <div className={styles.priceWrapper}>
                    {product.sale_price ? (
                        <>
                            <p className={styles.salePrice}>
                                {product.sale_price.toLocaleString('vi-VN')}đ
                            </p>
                            <p className={styles.originalPrice}>
                                {product.price.toLocaleString('vi-VN')}đ
                            </p>
                            <span className={styles.discountBadge}>
                                -{Math.round((1 - product.sale_price / product.price) * 100)}%
                            </span>
                        </>
                    ) : (
                        <p className={styles.regularPrice}>
                            {product.price.toLocaleString('vi-VN')}đ
                        </p>
                    )}
                </div>
            </CardContent>
            
            <CardFooter className={styles.cardFooter}>
                <Button 
                    className={styles.addToCartButton} 
                    size="default" 
                    onClick={() => useCartStore.getState().addToCart(product, 1)}
                >
                    <ShoppingCart className={styles.cartIcon} />
                    Thêm vào giỏ
                </Button>
            </CardFooter>
        </Card>
    );
};

export default ProductCard;