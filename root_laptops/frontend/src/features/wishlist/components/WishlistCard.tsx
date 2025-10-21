"use client";

import { WishlistItem } from "../types";
import { useWishlistStore } from "../store/wishlistStore";
import { useCartStore } from "@/store/cartStore";
import { Button } from "@/shared/components/ui/button";
import { Trash2, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import styles from './WishlistCard.module.css';

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
    <div className={styles.card}>
      <Link href={`/products/${item.product._id}`} className={styles.imageLink}>
        <div className={styles.imageWrapper}>
          <Image
            src={item.product.images.mainImg.url}
            alt={item.product.title}
            fill
            className={styles.productImage}
            sizes="128px"
          />
        </div>
      </Link>

      <div className={styles.details}>
        <Link href={`/products/${item.product._id}`}>
          <h3 className={styles.title}>
            {item.product.title}
          </h3>
        </Link>

        <p className={styles.brand}>
          Thương hiệu: {item.product.brand}
        </p>

        <div className={styles.priceSection}>
          <p className={styles.price}>
            {item.product.price.toLocaleString("vi-VN")} đ
          </p>
        </div>

        <p className={styles.addedAt}>
          Đã thêm: {new Date(item.addedAt).toLocaleDateString("vi-VN")}
        </p>
      </div>

      <div className={styles.actions}>
        <Button
          onClick={handleAddToCart}
          className={styles.addToCartButton}
          variant="default"
        >
          <ShoppingCart className={styles.cartIcon} />
          Thêm vào giỏ
        </Button>

        <Button
          onClick={() => removeFromWishlist(item.product._id)}
          variant="destructive"
          size="icon"
        >
          <Trash2 className={styles.removeIcon} />
        </Button>
      </div>
    </div>
  );
}
