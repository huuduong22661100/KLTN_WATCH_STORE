'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';
import { 
  CheckoutForm, 
  PaymentMethod, 
  OrderReview,
  useCheckoutForm 
} from '@/features/checkout';
import { useCreateOrder } from '@/features/orders';
import { useCart } from '@/features/cart';
import styles from './page.module.css';

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
      <div className={styles.container}>
        <div className={styles.loadingContainer}>Đang tải...</div>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.emptyContainer}>
          <p className={styles.emptyText}>Giỏ hàng trống</p>
          <Link href="/products" className={styles.emptyLink}>
            Tiếp tục mua sắm
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Thanh toán</h1>

      <form onSubmit={handleSubmit}>
        <div className={styles.grid}>
          <div className={styles.formColumn}>
            <CheckoutForm
              formData={formData}
              onFieldChange={updateField}
            />

            <PaymentMethod
              selected={formData.payment_method}
              onChange={(method) => updateField('payment_method', method)}
            />
          </div>

          <div className={styles.reviewColumn}>
            <OrderReview
              summary={summary}
              isCalculatingFee={isCalculatingFee}
              isSubmitting={isSubmitting || isPending}
              onSubmit={() => {
                const fakeEvent = {
                  preventDefault: () => {},
                  stopPropagation: () => {},
                } as React.FormEvent<HTMLFormElement>;
                handleSubmit(fakeEvent);
              }}
            />
          </div>
        </div>
      </form>
    </div>
  );
}