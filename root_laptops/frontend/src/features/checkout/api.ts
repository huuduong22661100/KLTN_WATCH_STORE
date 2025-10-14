import { SHIPPING_ENDPOINTS } from '@/constants/api-url';

export const calculateShippingFeeApi = async (
  city: string,
  district: string
): Promise<number> => {
  try {
    const res = await fetch(SHIPPING_ENDPOINTS.CALCULATE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ city, district }),
    });
    
    if (!res.ok) {
      return 0; // Miễn phí nếu không tính được
    }
    
    const result = await res.json();
    return result.data.shipping_fee || 0;
  } catch (error) {
    console.error('Calculate shipping fee error:', error);
    return 0;
  }
};