'use client';
import React from 'react';
import Link from 'next/link';
import { Product } from '@/features/products/types';
import { Button } from '@/shared/components/ui/button';
import { ChevronUp, ChevronDown, Heart, Share2, ShoppingCart, CreditCard } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { Badge } from '@/ui/badge';

interface ProductDetailsProps {
  product: Product;
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
}

export function ProductDetails({ product, quantity, setQuantity }: ProductDetailsProps) {
  const { title, price, sale_price, sku, brand, color_id, category_id, tags, gender, origin } = product;
  const addToCart = useCartStore((state) => state.addToCart);

  const hasDiscount = sale_price && sale_price < price;
  const discountPercent = hasDiscount ? Math.round(((price - sale_price) / price) * 100) : 0;
  const finalPrice = hasDiscount ? sale_price : price;
  const totalPrice = finalPrice * quantity;

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="flex flex-col space-y-6">
      {}
      <nav className="text-sm text-muted-foreground">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/products" className="hover:text-primary transition-colors">Products</Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{title}</span>
      </nav>

      {}
      <div>
        <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">{title}</h1>
        <div className="flex items-center gap-3 flex-wrap">
          <Badge variant="secondary" className="text-xs">{brand}</Badge>
          {category_id && category_id.length > 0 && (
            <Badge variant="outline" className="text-xs">{category_id[0].category}</Badge>
          )}
          <Link href="#reviews" className="text-sm text-primary hover:underline">
            ⭐ Be the first to review
          </Link>
        </div>
      </div>

      {}
      <div className="bg-muted/30 rounded-lg p-4 border">
        <div className="flex items-baseline gap-3 flex-wrap">
          <span className="text-3xl font-bold text-primary">
            {finalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
          </span>
          {hasDiscount && (
            <>
              <span className="text-xl text-muted-foreground line-through">
                {price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
              </span>
              <Badge variant="destructive" className="text-sm">-{discountPercent}%</Badge>
            </>
          )}
        </div>
      </div>

      {}
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="flex flex-col space-y-1">
          <span className="text-muted-foreground">SKU:</span>
          <span className="font-medium">{sku}</span>
        </div>
        {origin && (
          <div className="flex flex-col space-y-1">
            <span className="text-muted-foreground">Origin:</span>
            <span className="font-medium">{origin}</span>
          </div>
        )}
        {gender && (
          <div className="flex flex-col space-y-1">
            <span className="text-muted-foreground">Gender:</span>
            <span className="font-medium capitalize">{gender}</span>
          </div>
        )}
        {color_id && color_id.length > 0 && (
          <div className="flex flex-col space-y-1">
            <span className="text-muted-foreground">Colors:</span>
            <div className="flex gap-2 flex-wrap">
              {color_id.map((color) => (
                <Badge key={color._id} variant="outline" className="text-xs">
                  {color.color}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>

      {}
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      )}

      <div className="border-t pt-6">
        {}
        <div className="flex items-center gap-4 mb-4">
          <span className="text-sm font-medium">Quantity:</span>
          <div className="flex items-center border rounded-lg">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setQuantity(q => (q > 1 ? q - 1 : 1))}
              className="h-10 w-10"
            >
              <ChevronDown className="h-4 w-4" />
            </Button>
            <span className="px-6 font-semibold text-lg min-w-[60px] text-center">{quantity}</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setQuantity(q => q + 1)}
              className="h-10 w-10"
            >
              <ChevronUp className="h-4 w-4" />
            </Button>
          </div>
          <div className="ml-auto text-right">
            <span className="text-sm text-muted-foreground block">Total:</span>
            <span className="text-xl font-bold text-primary">
              {totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
            </span>
          </div>
        </div>

        {}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button 
            onClick={handleAddToCart}
            className="flex-1 h-12 text-base"
            size="lg"
          >
            <ShoppingCart className="mr-2 h-5 w-5" />
            Add to Cart
          </Button>
          <Button 
            variant="default"
            className="flex-1 h-12 text-base bg-gradient-to-r from-primary to-primary/80"
            size="lg"
          >
            <CreditCard className="mr-2 h-5 w-5" />
            Buy Now
          </Button>
        </div>

        {}
        <div className="flex gap-3 mt-4">
          <Button variant="outline" className="flex-1" size="lg">
            <Heart className="mr-2 h-5 w-5" />
            Add to Wishlist
          </Button>
          <Button variant="outline" size="lg">
            <Share2 className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {}
      <div className="bg-muted/20 rounded-lg p-4 space-y-2 text-sm">
        <div className="flex items-center gap-2">
          <span className="text-green-600">✓</span>
          <span>Free shipping for orders over 500,000₫</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-green-600">✓</span>
          <span>30-day return policy</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-green-600">✓</span>
          <span>Genuine product warranty</span>
        </div>
      </div>
    </div>
  );
}
