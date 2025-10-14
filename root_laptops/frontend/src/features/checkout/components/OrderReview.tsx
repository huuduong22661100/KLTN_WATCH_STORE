import { useCart } from '@/features/cart';
import { CheckoutSummary } from '../types';

interface OrderReviewProps {
  summary: CheckoutSummary;
  isCalculatingFee: boolean;
}

export function OrderReview({ summary, isCalculatingFee }: OrderReviewProps) {
  const { data: cart } = useCart();

  return (
    <div className="bg-white p-6 rounded-lg shadow sticky top-4">
      <h3 className="text-lg font-semibold mb-4">Đơn hàng của bạn</h3>

      {/* Products */}
      <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
        {cart?.items.map((item: any) => {
          const product = item.watch_id;
          const price = parseFloat(item.price.$numberDecimal);
          return (
            <div key={item._id} className="flex items-center gap-3 text-sm">
              <img
                src={product.images.mainImg.url}
                alt={product.title}
                className="w-12 h-12 object-cover rounded"
              />
              <div className="flex-1">
                <p className="font-medium line-clamp-1">{product.title}</p>
                <p className="text-gray-500">x{item.quantity}</p>
              </div>
              <p className="font-semibold">
                {(price * item.quantity).toLocaleString('vi-VN')} đ
              </p>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="border-t pt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">
            Tạm tính ({summary.itemCount} sản phẩm):
          </span>
          <span>{summary.subtotal.toLocaleString('vi-VN')} đ</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Phí vận chuyển:</span>
          <span>
            {isCalculatingFee ? (
              <span className="text-gray-400">Đang tính...</span>
            ) : summary.shipping_fee === 0 ? (
              <span className="text-green-600">Miễn phí</span>
            ) : (
              `${summary.shipping_fee.toLocaleString('vi-VN')} đ`
            )}
          </span>
        </div>

        {summary.discount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Giảm giá:</span>
            <span className="text-green-600">
              -{summary.discount.toLocaleString('vi-VN')} đ
            </span>
          </div>
        )}

        <div className="flex justify-between font-bold text-lg pt-2 border-t">
          <span>Tổng cộng:</span>
          <span className="text-blue-600">
            {summary.total.toLocaleString('vi-VN')} đ
          </span>
        </div>
      </div>
    </div>
  );
}
