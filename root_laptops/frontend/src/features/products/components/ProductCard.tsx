import { Star, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";

import { Product } from "@/features/products/types";

interface ProductCardProps {
    product: Product;
    layout?: 'grid' | 'list';
}

const ProductCard = ({ product, layout = 'grid' }: ProductCardProps) => {


    if (layout === 'list') {
        return (
            <Card className="w-full flex flex-row overflow-hidden transition-shadow hover:shadow-md">
                <div className="w-1/4 flex-shrink-0 relative">
                    <Image 
                        src={product.images.mainImg.url} 
                        alt={product.images.mainImg.alt_text} 
                        fill 
                        className="object-cover" 
                    />
                </div>
                <div className="w-3/4 p-4 flex flex-col">
                    <CardHeader className="p-0 mb-2">
                        <h3 className="font-semibold text-lg leading-tight hover:text-primary cursor-pointer">
                            {product.title}
                        </h3>
                    </CardHeader>
                    <CardContent className="p-0 flex-grow">
                        {product.description && product.description.length > 0 && (
                            <p 
                                className="text-sm text-muted-foreground line-clamp-3"
                                dangerouslySetInnerHTML={{ __html: product.description[0].description }}
                            />
                        )}
                    </CardContent>
                    <CardFooter className="p-0 flex items-end justify-between">
                        <div>
                            <p className={`text-sm text-muted-foreground font-bold text-lg`}>
                                {product.price.toLocaleString('vi-VN')}đ
                            </p>
                        </div>
                        <Button size="sm" onClick={() => useCartStore.getState().addToCart(product, 1)}>
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            Thêm vào giỏ
                        </Button>
                    </CardFooter>
                </div>
            </Card>
        );
    }

    // Chế độ Grid (mặc định)
    return (
        <Card className="w-full max-w-xs flex flex-col overflow-hidden transition-shadow hover:shadow-md">
            <CardHeader className="p-0 border-b">
                <div className="relative w-full h-48">
                    <Image 
                        src={product.images.mainImg.url} 
                        alt={product.images.mainImg.alt_text} 
                        fill 
                        className="object-cover" 
                    />
                </div>
            </CardHeader>
            <CardContent className="p-4 flex-grow">
                <h3 className="font-semibold text-sm leading-tight h-10 overflow-hidden hover:text-primary cursor-pointer">
                    {product.title}
                </h3>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex flex-col items-start">
                <div className="mb-3">
                    <p className={`text-xs text-muted-foreground font-semibold text-base`}>
                        {product.price.toLocaleString('vi-VN')}đ
                    </p>
                </div>
                <Button className="w-full" size="sm" onClick={() => useCartStore.getState().addToCart(product, 1)}>
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Thêm vào giỏ hàng
                </Button>
            </CardFooter>
        </Card>
    );
};

export default ProductCard;