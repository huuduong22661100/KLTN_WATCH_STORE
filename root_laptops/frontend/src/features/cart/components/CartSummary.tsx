import Link from 'next/link';
import { Cart } from '../types';
import { Button } from '@/shared/components/ui/button';

interface CartSummaryProps {
  cart: Cart;
  onCheckout: () => void;
}

export function CartSummary({ cart, onCheckout }: CartSummaryProps) {
  
  const calculatedTotal = cart.items.reduce((total: number, item: any) => {
    const product = item.watch_id;
    const price = product.sale_price || product.price;
    return total + (price * item.quantity);
  }, 0);

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Tổng đơn hàng</h2>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between">
          <span>Tạm tính ({cart.itemCount} sản phẩm):</span>
          <span>{calculatedTotal.toLocaleString('vi-VN')} đ</span>
        </div>
        <div className="flex justify-between">
          <span>Phí vận chuyển:</span>
          <span className="text-green-600">Miễn phí</span>
        </div>
        <div className="border-t pt-2 flex justify-between font-bold text-lg">
          <span>Tổng cộng:</span>
          <span className="text-blue-600">
            {calculatedTotal.toLocaleString('vi-VN')} đ
          </span>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <Button
          onClick={onCheckout}
          className="w-full bg-blue-600 text-white hover:bg-blue-700"
        >
          Tiến hành đặt hàng
        </Button>
        <Link href="/products" passHref>
          <Button variant="outline" className="w-full">
            Tiếp tục mua sắm
          </Button>
        </Link>
      </div>
    </div>
  );
}
