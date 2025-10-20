import { useState, useEffect } from 'react';
import { CheckoutFormData, CheckoutSummary } from '../types';
import { useCart } from '@/features/cart';
import { calculateShippingFeeApi } from '../api';
import { useAuthStore } from '@/store/authStore';

export function useCheckoutForm() {
  const { data: cart } = useCart();
  const { user } = useAuthStore();
  
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

  // Auto-fill user information
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        shipping_name: user.name || '',
        shipping_phone: user.phone || '',
        shipping_email: user.email || '',
        shipping_address: user.address || '',
      }));
    }
  }, [user]);

  const [shippingFee, setShippingFee] = useState(0);
  const [isCalculatingFee, setIsCalculatingFee] = useState(false);

  
  useEffect(() => {
    
    setShippingFee(0); 
  }, []);

  
  const calculatedSubtotal = cart?.items.reduce((total: number, item: any) => {
    const product = item.watch_id;
    const price = product.sale_price || product.price;
    return total + (price * item.quantity);
  }, 0) || 0;

  
  const summary: CheckoutSummary = {
    subtotal: calculatedSubtotal,
    shipping_fee: shippingFee,
    discount: 0,
    total: calculatedSubtotal + shippingFee,
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
    if (!formData.shipping_city.trim()) {
      return false;
    }
    if (!formData.shipping_district.trim()) {
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