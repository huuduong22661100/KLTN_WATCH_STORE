import { useState, useEffect } from 'react';
import { CheckoutFormData, CheckoutSummary } from '../types';
import { useCart } from '@/features/cart';
import { calculateShippingFeeApi } from '../api';

export function useCheckoutForm() {
  const { data: cart } = useCart();
  
  const [formData, setFormData] = useState<CheckoutFormData>({
    shipping_name: '',
    shipping_phone: '',
    shipping_email: '',
    shipping_address: '',
    shipping_city: '',
    shipping_district: '',
    shipping_ward: '',
    payment_method: 'cod',
    note: '',
  });

  const [shippingFee, setShippingFee] = useState(0);
  const [isCalculatingFee, setIsCalculatingFee] = useState(false);

  // Tính phí vận chuyển khi thay đổi địa chỉ
  useEffect(() => {
    if (formData.shipping_city && formData.shipping_district) {
      setIsCalculatingFee(true);
      calculateShippingFeeApi(formData.shipping_city, formData.shipping_district)
        .then(fee => setShippingFee(fee))
        .catch(() => setShippingFee(0))
        .finally(() => setIsCalculatingFee(false));
    }
  }, [formData.shipping_city, formData.shipping_district]);

  // Tính tổng
  const summary: CheckoutSummary = {
    subtotal: cart?.total || 0,
    shipping_fee: shippingFee,
    discount: 0,
    total: (cart?.total || 0) + shippingFee,
    itemCount: cart?.itemCount || 0,
  };

  const updateField = (field: keyof CheckoutFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = (): boolean => {
    if (!formData.shipping_name.trim()) {
      return false;
    }
    if (!formData.shipping_phone.trim()) {
      return false;
    }
    if (!formData.shipping_address.trim()) {
      return false;
    }
    if (!formData.shipping_city) {
      return false;
    }
    if (!formData.shipping_district) {
      return false;
    }
    return true;
  };

  return {
    formData,
    summary,
    isCalculatingFee,
    updateField,
    validateForm,
    setFormData,
  };
}