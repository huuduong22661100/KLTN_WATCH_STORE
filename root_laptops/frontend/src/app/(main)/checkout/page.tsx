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
      
      const orderId = order.order_number || order._id;
      router.push(`/order-success/${orderId}`);
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
          {}
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

          {}
          <div className="lg:col-span-1">
            <OrderReview
              summary={summary}
              isCalculatingFee={isCalculatingFee}
              isSubmitting={isSubmitting || isPending}
              onSubmit={() => {
                const fakeEvent = new Event('submit') as any;
                handleSubmit(fakeEvent);
              }}
            />
          </div>
        </div>
      </form>
    </div>
  );
}