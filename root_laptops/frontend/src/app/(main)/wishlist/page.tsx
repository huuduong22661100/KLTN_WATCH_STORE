"use client";

import { useAuthGuard } from "@/hooks/useAuthGuard";
import { useWishlistStore } from "@/features/wishlist/store/wishlistStore";
import WishlistCard from "@/features/wishlist/components/WishlistCard";
import { Button } from "@/shared/components/ui/button";
import { Heart, ShoppingBag, Loader2 } from "lucide-react";
import Link from "next/link";
import styles from './page.module.css';

export default function WishlistPage() {
  const { isHydrated, isAuthenticated } = useAuthGuard("/login");
  const { items, clearWishlist, getTotalItems } = useWishlistStore();

  
  if (!isHydrated) {
    return (
      <div className={styles.loadingContainer}>
        <Loader2 className={styles.spinner} />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const totalItems = getTotalItems();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleWrapper}>
          <h1 className={styles.title}>
            <Heart className={styles.heartIcon} />
            Sản phẩm yêu thích
          </h1>
          <p className={styles.subtitle}>
            {totalItems} sản phẩm trong danh sách
          </p>
        </div>

        {items.length > 0 && (
          <Button
            variant="outline"
            onClick={() => {
              if (confirm("Bạn có chắc muốn xóa tất cả sản phẩm yêu thích?")) {
                clearWishlist();
              }
            }}
          >
            Xóa tất cả
          </Button>
        )}
      </div>

      {items.length === 0 ? (
        <div className={styles.emptyContainer}>
          <div className={styles.emptyIconWrapper}>
            <Heart className={styles.emptyIcon} />
          </div>
          <h2 className={styles.emptyTitle}>
            Danh sách yêu thích trống
          </h2>
          <p className={styles.emptyText}>
            Bạn chưa có sản phẩm yêu thích nào. Hãy thêm những sản phẩm bạn thích!
          </p>
          <Link href="/products">
            <Button size="lg">
              <ShoppingBag className={styles.buttonIcon} />
              Khám phá sản phẩm
            </Button>
          </Link>
        </div>
      ) : (
        <div className={styles.wishlistGrid}>
          {items.map((item) => (
            <WishlistCard key={item._id} item={item} />
          ))}
        </div>
      )}

      {items.length > 0 && (
        <div className={styles.continueShoppingWrapper}>
          <Link href="/products">
            <Button variant="outline" size="lg">
              <ShoppingBag className={styles.buttonIcon} />
              Tiếp tục mua sắm
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
