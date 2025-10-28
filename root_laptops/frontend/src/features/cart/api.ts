import { Cart, AddToCartPayload, UpdateCartPayload } from './types';

const API_BASE_URL = 'http://localhost:5000/api/v1';


export const getCartApi = async (token: string): Promise<Cart> => {
  const res = await fetch(`${API_BASE_URL}/cart`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error('Không thể tải giỏ hàng');
  }

  const response = await res.json();
  const cartData = response.data;

  interface CartItemResponse {
    _id: string;
    watch_id: {
      _id: string;
      title: string;
      images?: { mainImg?: { url?: string } };
      sale_price?: number;
      price: number;
      stock?: number;
    };
    quantity: number;
  }

  return {
    items: cartData.items.map((item: CartItemResponse) => ({
      id: item._id,
      product_id: item.watch_id._id,
      product_name: item.watch_id.title,
      product_image: item.watch_id.images?.mainImg?.url || '',
      price: item.watch_id.sale_price || item.watch_id.price,
      quantity: item.quantity,
      stock: item.watch_id.stock || 0,
    })),
    total: cartData.total_amount,
    itemCount: cartData.item_count,
  };
};


export const addToCartApi = async (
  payload: AddToCartPayload,
  token: string
): Promise<Cart> => {
  const res = await fetch(`${API_BASE_URL}/cart/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Thêm vào giỏ thất bại' }));
    throw new Error(error.message);
  }

  return res.json();
};


export const updateCartApi = async (
  payload: UpdateCartPayload,
  token: string
): Promise<Cart> => {
  const { cart_item_id, quantity } = payload;
  const res = await fetch(`${API_BASE_URL}/cart/items/${cart_item_id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ quantity }),
  });

  if (!res.ok) {
    throw new Error('Cập nhật giỏ hàng thất bại');
  }

  return res.json();
};


export const removeFromCartApi = async (
  cartItemId: string,
  token: string
): Promise<Cart> => {
  const res = await fetch(`${API_BASE_URL}/cart/items/${cartItemId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error('Xóa sản phẩm thất bại');
  }

  return res.json();
};


export const clearCartApi = async (token: string): Promise<void> => {
  const res = await fetch(`${API_BASE_URL}/cart/clear`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error('Xóa giỏ hàng thất bại');
  }
};
