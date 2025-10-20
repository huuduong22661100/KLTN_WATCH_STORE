
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';


export const AUTH_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/users/login`,
  REGISTER: `${API_BASE_URL}/users/register`,
  LOGOUT: `${API_BASE_URL}/auth/logout`,
  REFRESH: `${API_BASE_URL}/auth/refresh`,
  ME: `${API_BASE_URL}/users/profile`,
} as const;


export const PRODUCT_ENDPOINTS = {
  LIST: `${API_BASE_URL}/products`,
  DETAIL: (id: string) => `${API_BASE_URL}/products/${id}`,
  CATEGORIES: `${API_BASE_URL}/products/categories`,
  SEARCH: `${API_BASE_URL}/products/search`,
} as const;


export const CART_ENDPOINTS = {
  GET: `${API_BASE_URL}/cart`,
  ADD: `${API_BASE_URL}/cart/add`,
  UPDATE: `${API_BASE_URL}/cart/update`,
  REMOVE: (id: string) => `${API_BASE_URL}/cart/remove/${id}`,
  CLEAR: `${API_BASE_URL}/cart/clear`,
} as const;


export const ORDER_ENDPOINTS = {
  LIST: `${API_BASE_URL}/orders`,
  CREATE: `${API_BASE_URL}/orders`,
  DETAIL: (id: string) => `${API_BASE_URL}/orders/${id}`,
  CANCEL: (id: string) => `${API_BASE_URL}/orders/${id}/cancel`,
} as const;


export const SHIPPING_ENDPOINTS = {
  CALCULATE: `${API_BASE_URL}/shipping/calculate`,
} as const;


export const LOCATION_ENDPOINTS = {
  PROVINCES: `${API_BASE_URL}/locations/provinces`,
  DISTRICTS: (provinceId: string) => `${API_BASE_URL}/locations/districts/${provinceId}`,
  WARDS: (districtId: string) => `${API_BASE_URL}/locations/wards/${districtId}`,
} as const;