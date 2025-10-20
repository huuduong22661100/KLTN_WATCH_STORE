"use client";

import { Star, ShoppingCart, Heart } from 'lucide-react';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/features/wishlist/store/wishlistStore";
import { useState, useEffect } from "react";

import { Product } from "@/features/products/types";

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
        <Card className="w-full flex flex-col overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1 relative group bg-white">
            {}
            <Button
                variant="ghost"
                size="icon"
                className="absolute top-3 right-3 z-10 bg-white/90 hover:bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={handleWishlistToggle}
            >
                <Heart 
                    className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
                />
            </Button>

            <CardHeader className="p-0">
                <a href={`/products/${product._id}`}>
                    <div className="relative w-full h-64 bg-gray-100 overflow-hidden">
                        <Image 
                            src={product.images.mainImg.url} 
                            alt={product.images.mainImg.alt_text} 
                            fill 
                            className="object-cover group-hover:scale-110 transition-transform duration-500" 
                        />
                    </div>
                </a>
            </CardHeader>
            
            <CardContent className="p-4 flex-grow">
                <a href={`/products/${product._id}`}>
                    <h3 className="font-semibold text-sm leading-relaxed mb-3 line-clamp-2 min-h-[2.5rem] hover:text-blue-600 cursor-pointer transition-colors">
                        {product.title}
                    </h3>
                </a>
                <div className="flex items-baseline gap-2">
                    {product.sale_price ? (
                        <>
                            <p className="text-lg font-bold text-red-600">
                                {product.sale_price.toLocaleString('vi-VN')}đ
                            </p>
                            <p className="text-sm text-gray-500 line-through">
                                {product.price.toLocaleString('vi-VN')}đ
                            </p>
                            <span className="text-xs font-semibold text-red-600 bg-red-50 px-2 py-1 rounded">
                                -{Math.round((1 - product.sale_price / product.price) * 100)}%
                            </span>
                        </>
                    ) : (
                        <p className="text-lg font-bold text-blue-600">
                            {product.price.toLocaleString('vi-VN')}đ
                        </p>
                    )}
                </div>
            </CardContent>
            
            <CardFooter className="p-4 pt-0">
                <Button 
                    className="w-full bg-black hover:bg-gray-800 transition-colors" 
                    size="default" 
                    onClick={() => useCartStore.getState().addToCart(product, 1)}
                >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Thêm vào giỏ
                </Button>
            </CardFooter>
        </Card>
    );
};

export default ProductCard;