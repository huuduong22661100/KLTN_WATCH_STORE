'use client';
import React from 'react';
import { Button } from '@/shared/components/ui/button';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { Product } from '@/features/products/types';

interface ProductTopBarProps {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  totalPrice: number;
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  product: Product;
}

export function ProductTopBar({
  activeIndex,
  setActiveIndex,
  totalPrice,
  quantity,
  setQuantity,
  product,
}: ProductTopBarProps) {
  return (
    <div className="border-b border-border sticky top-0 bg-background/95 backdrop-blur-sm z-10">
      <div className="container mx-auto flex justify-between items-center py-4">
        {/* Left side: Tab buttons */}
        <div className="flex gap-8 font-semibold">
          <button
            onClick={() => setActiveIndex(0)}
            className={`pb-2 transition-colors ${activeIndex === 0 ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground hover:text-foreground'}`}>
            About Product
          </button>
          <button
            onClick={() => setActiveIndex(1)}
            className={`pb-2 transition-colors ${activeIndex === 1 ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground hover:text-foreground'}`}>
            Details
          </button>
          <button
            onClick={() => setActiveIndex(2)}
            className={`pb-2 transition-colors ${activeIndex === 2 ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground hover:text-foreground'}`}>
            More Details
          </button>
        </div>

        {/* Right side: Bill section */}
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <span className="text-sm text-muted-foreground">Total</span>
                      <p className="font-bold text-lg">{totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                    </div>
                    <div className="flex items-center gap-2 rounded-full bg-muted p-2">
                      <span className="px-4 font-semibold text-lg">{quantity}</span>
                      <div className="flex flex-col">
                        <ChevronUp className="h-5 w-5 cursor-pointer text-muted-foreground hover:text-foreground" onClick={() => setQuantity(q => q + 1)} />
                        <ChevronDown className="h-5 w-5 cursor-pointer text-muted-foreground hover:text-foreground" onClick={() => setQuantity(q => (q > 1 ? q - 1 : 1))} />
                      </div>
                    </div>
                    <Button onClick={() => useCartStore.getState().addToCart(product, quantity)}>Add to Cart</Button>
                    <Button variant="outline">
                      <img src="/assets/icon/paypal.svg" alt="Paypal" className="h-6" />
                    </Button>
                  </div>      </div>
    </div>
  );
}