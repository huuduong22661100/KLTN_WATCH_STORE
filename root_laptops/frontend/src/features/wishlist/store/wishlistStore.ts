import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product } from '@/features/products/types';
import { WishlistState, WishlistItem } from '../types';
import { toast } from 'sonner';
import { useAuthStore } from '@/store/authStore';

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],

      addToWishlist: (product: Product) => {
        const state = get();
        const existingItem = state.items.find(item => item.product._id === product._id);

        if (existingItem) {
          toast.info('Sản phẩm đã có trong danh sách yêu thích');
          return;
        }

        const newItem: WishlistItem = {
          _id: `wishlist-${product._id}-${Date.now()}`,
          product,
          addedAt: new Date(),
        };

        set({ items: [...state.items, newItem] });
        toast.success('Đã thêm vào danh sách yêu thích');
      },

      removeFromWishlist: (productId: string) => {
        const state = get();
        const updatedItems = state.items.filter(item => item.product._id !== productId);
        set({ items: updatedItems });
        toast.success('Đã xóa khỏi danh sách yêu thích');
      },

      isInWishlist: (productId: string) => {
        const state = get();
        return state.items.some(item => item.product._id === productId);
      },

      clearWishlist: () => {
        set({ items: [] });
        
        
        if (typeof window !== 'undefined') {
          localStorage.removeItem('wishlist-storage');
        }
      },

      getTotalItems: () => {
        return get().items.length;
      },
    }),
    {
      name: 'wishlist-storage',
      storage: createJSONStorage(() => localStorage),
      
      partialize: (state) => {
        const isAuthenticated = useAuthStore.getState().isAuthenticated;
        if (!isAuthenticated) {
          return { items: [] };
        }
        return state;
      },
    }
  )
);
