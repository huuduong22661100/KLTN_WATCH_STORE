import { Product } from "@/features/products/types";

export interface WishlistItem {
  _id: string;
  product: Product;
  addedAt: Date;
}

export interface WishlistState {
  items: WishlistItem[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
  getTotalItems: () => number;
}
