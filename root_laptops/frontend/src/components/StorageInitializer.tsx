"use client";

import { useEffect } from 'react';
import { cleanupStorage } from '@/lib/storage';
import { useAuthStore } from '@/store/authStore';
import { useCartStore } from '@/store/cartStore';


export default function StorageInitializer() {
  useEffect(() => {
    
    cleanupStorage();

    
    const { isAuthenticated } = useAuthStore.getState();
    if (isAuthenticated) {
      useCartStore.getState().loadCartFromServer();
    } else {
      
      useCartStore.getState().clearCart();
    }
  }, []);

  
  return null;
}
