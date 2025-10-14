import { PRODUCT_ENDPOINTS } from '@/constants/api-url';
import { Product } from './types';

export const getProducts = async (): Promise<Product[]> => {
  const res = await fetch(PRODUCT_ENDPOINTS.LIST);

  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }

  const data = await res.json();
  return data.data.products;
};
