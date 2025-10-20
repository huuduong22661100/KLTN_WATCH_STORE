import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/features/auth/types';
import { useCartStore } from './cartStore';
import { clearAllStorage } from '@/lib/storage';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  
  login: (user: User, token: string) => void;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      
      login: (user, token) => {
        
        if (user.role === 'admin') {
          throw new Error('Tài khoản Admin vui lòng đăng nhập tại trang quản trị');
        }
        set({ user, token, isAuthenticated: true });
      },
      
      logout: () => {
        
        set({ user: null, token: null, isAuthenticated: false });
        
        
        useCartStore.getState().clearCart();
        
        
        clearAllStorage();
      },
      
      updateProfile: (userData) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,
        }));
      },
    }),
    {
      name: 'user-auth-storage', 
    }
  )
);