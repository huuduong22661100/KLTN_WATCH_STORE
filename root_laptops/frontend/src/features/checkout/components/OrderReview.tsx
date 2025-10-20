import { useCart } from '@/features/cart';
import { CheckoutSummary } from '../types';

interface OrderReviewProps {
  summary: CheckoutSummary;
  isCalculatingFee: boolean;
  isSubmitting?: boolean;
  onSubmit?: () => void;
}

export function OrderReview({ 
  summary, 
  isCalculatingFee,
  isSubmitting = false,
  onSubmit
}: OrderReviewProps) {
  const { data: cart } = useCart();

  return (
    <div className="bg-white p-6 rounded-lg shadow sticky top-4">
      <h3 className="text-lg font-semibold mb-4">Đơn hàng của bạn</h3>

      {}
      <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
        {cart?.items.map((item: any) => {
          const product = item.watch_id;
          const displayPrice = product.sale_price || product.price;
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
              <div className="text-right">
                {product.sale_price ? (
                  <>
                    <p className="font-semibold text-red-600">
                      {(product.sale_price * item.quantity).toLocaleString('vi-VN')} đ
                    </p>
                    <p className="text-xs text-gray-400 line-through">
                      {(product.price * item.quantity).toLocaleString('vi-VN')} đ
                    </p>
                  </>
                ) : (
                  <p className="font-semibold">
                    {(product.price * item.quantity).toLocaleString('vi-VN')} đ
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {}
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

      {}
      {onSubmit && (
        <>
          <button
            type="button"
            onClick={onSubmit}
            disabled={isSubmitting}
            className="w-full mt-4 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Đang xử lý...
              </span>
            ) : (
              `Đặt hàng (${summary.total.toLocaleString('vi-VN')} đ)`
            )}
          </button>

          <p className="text-xs text-gray-500 text-center mt-4">
            Bằng việc đặt hàng, bạn đồng ý với{' '}
            <a href="/terms" className="text-blue-600 hover:underline">
              Điều khoản dịch vụ
            </a>
          </p>
        </>
      )}
    </div>
  );
}
