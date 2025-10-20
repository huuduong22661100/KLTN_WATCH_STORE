"use client";

import { WishlistItem } from "../types";
import { useWishlistStore } from "../store/wishlistStore";
import { useCartStore } from "@/store/cartStore";
import { Button } from "@/shared/components/ui/button";
import { Trash2, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface WishlistCardProps {
  item: WishlistItem;
}

export default function WishlistCard({ item }: WishlistCardProps) {
  const removeFromWishlist = useWishlistStore((state) => state.removeFromWishlist);
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = async () => {
    await addToCart(item.product, 1);
    removeFromWishlist(item.product._id);
  };

  return (
    <div className="bg-white border rounded-lg p-4 flex flex-col sm:flex-row gap-4 hover:shadow-lg transition-shadow">
      {}
      <Link href={`/products/${item.product._id}`} className="flex-shrink-0">
        <div className="relative w-full sm:w-32 h-32">
          <Image
            src={item.product.images.mainImg.url}
            alt={item.product.title}
            fill
            className="object-cover rounded-md"
            sizes="128px"
          />
        </div>
      </Link>

      {}
      <div className="flex-grow">
        <Link href={`/products/${item.product._id}`}>
          <h3 className="font-semibold text-lg hover:text-primary transition-colors line-clamp-2">
            {item.product.title}
          </h3>
        </Link>

        <p className="text-sm text-muted-foreground mt-1">
          Thương hiệu: {item.product.brand}
        </p>

        <div className="mt-2">
          <p className="text-2xl font-bold text-primary">
            {item.product.price.toLocaleString("vi-VN")} đ
          </p>
        </div>

        <p className="text-xs text-muted-foreground mt-2">
          Đã thêm: {new Date(item.addedAt).toLocaleDateString("vi-VN")}
        </p>
      </div>

      {}
      <div className="flex sm:flex-col gap-2 justify-end">
        <Button
          onClick={handleAddToCart}
          className="flex-1 sm:flex-none"
          variant="default"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Thêm vào giỏ
        </Button>

        <Button
          onClick={() => removeFromWishlist(item.product._id)}
          variant="destructive"
          size="icon"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
