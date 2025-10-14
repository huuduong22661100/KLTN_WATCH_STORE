'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { 
  CheckoutForm, 
  PaymentMethod, 
  OrderReview,
  useCheckoutForm 
} from '@/features/checkout';
import { useCreateOrder } from '@/features/orders';
import { useCart } from '@/features/cart';

export default function CheckoutPage() {
  const router = useRouter();
  const { data: cart, isLoading: isLoadingCart } = useCart();
  const { mutate: createOrder, isPending } = useCreateOrder();
  
  const {
    formData,
    summary,
    isCalculatingFee,
    updateField,
    validateForm,
  } = useCheckoutForm();

  const [isSubmitting, setIsSubmitting] = useState(false);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!validateForm()) {
    toast.error('Vui lòng điền đầy đủ thông tin');
    return;
  }

  if (!cart || cart.items.length === 0) {
    toast.error('Giỏ hàng trống');
    return;
  }

  setIsSubmitting(true);

  createOrder(formData, {
    onSuccess: (order) => {
      toast.success('Đặt hàng thành công!');
      router.push(`/order-success/${order.id}`); // ✅ ĐÚNG URL
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSettled: () => {
      setIsSubmitting(false);
    },
  });
};

  if (isLoadingCart) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">Đang tải...</div>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">
          <p className="text-xl mb-4">Giỏ hàng trống</p>
          <a href="/products" className="text-blue-600 hover:underline">
            Tiếp tục mua sắm
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Thanh toán</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2 space-y-6">
            <CheckoutForm
              formData={formData}
              onFieldChange={updateField}
            />

            <PaymentMethod
              selected={formData.payment_method}
              onChange={(method) => updateField('payment_method', method)}
            />
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <OrderReview
              summary={summary}
              isCalculatingFee={isCalculatingFee}
            />

            <button
              type="submit"
              disabled={isSubmitting || isPending}
              className="w-full mt-4 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold"
            >
              {isSubmitting || isPending ? (
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
          </div>
        </div>
      </form>
    </div>
  );
}