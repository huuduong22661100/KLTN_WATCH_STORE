"use client";

import { useAuthGuard } from "@/hooks/useAuthGuard";
import { useWishlistStore } from "@/features/wishlist/store/wishlistStore";
import WishlistCard from "@/features/wishlist/components/WishlistCard";
import { Button } from "@/shared/components/ui/button";
import { Heart, ShoppingBag, Loader2 } from "lucide-react";
import Link from "next/link";

export default function WishlistPage() {
  const { isHydrated, isAuthenticated } = useAuthGuard("/login");
  const { items, clearWishlist, getTotalItems } = useWishlistStore();

  
  if (!isHydrated) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const totalItems = getTotalItems();

  return (
    <div className="container mx-auto py-8 px-4">
      {}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Heart className="w-8 h-8 text-red-500" />
            Sản phẩm yêu thích
          </h1>
          <p className="text-muted-foreground mt-2">
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

      {}
      {items.length === 0 ? (
        <div className="text-center py-16">
          <div className="inline-block p-8 bg-muted rounded-full mb-6">
            <Heart className="w-16 h-16 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-semibold mb-4">
            Danh sách yêu thích trống
          </h2>
          <p className="text-muted-foreground mb-8">
            Bạn chưa có sản phẩm yêu thích nào. Hãy thêm những sản phẩm bạn thích!
          </p>
          <Link href="/products">
            <Button size="lg">
              <ShoppingBag className="w-5 h-5 mr-2" />
              Khám phá sản phẩm
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {items.map((item) => (
            <WishlistCard key={item._id} item={item} />
          ))}
        </div>
      )}

      {}
      {items.length > 0 && (
        <div className="mt-8 text-center">
          <Link href="/products">
            <Button variant="outline" size="lg">
              <ShoppingBag className="w-5 h-5 mr-2" />
              Tiếp tục mua sắm
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
