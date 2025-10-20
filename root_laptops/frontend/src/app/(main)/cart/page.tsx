'use client';

import { useRouter } from 'next/navigation';
import { useCart, CartItem, CartSummary, EmptyCart } from '@/features/cart';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/shared/components/ui/button';

export default function CartPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const { data: cart, isLoading, error } = useCart();

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto py-8 text-center">
        <h2 className="text-2xl font-semibold mb-4">Bạn cần đăng nhập để xem giỏ hàng</h2>
        <p className="mb-6">Vui lòng đăng nhập để tiếp tục mua sắm.</p>
        <Button onClick={() => router.push('/auth/login')}>
          Đăng nhập
        </Button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">Đang tải giỏ hàng...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center text-red-600">
          Có lỗi xảy ra khi tải giỏ hàng
        </div>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="container mx-auto py-8">
        <EmptyCart />
      </div>
    );
  }

  const handleCheckout = () => {
    router.push('/checkout');
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Giỏ hàng của bạn</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {}
        <div className="lg:col-span-2 space-y-4">
          {cart.items.map((item) => (
            <CartItem key={item._id} item={item} />
          ))}
        </div>

        {}
        <div className="lg:col-span-1">
          <CartSummary cart={cart} onCheckout={handleCheckout} />
        </div>
      </div>
    </div>
  );
}
