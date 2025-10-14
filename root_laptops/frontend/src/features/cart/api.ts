import { Cart, AddToCartPayload, UpdateCartPayload } from './types';

const API_BASE_URL = 'http://localhost:5000/api/v1';

// ✅ Lấy giỏ hàng hiện tại
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

  return {
    items: cartData.items,
    total: cartData.total_amount,
    itemCount: cartData.item_count,
  };
};

// ✅ Thêm sản phẩm vào giỏ
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

// ✅ Cập nhật số lượng
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

// ✅ Xóa item khỏi giỏ
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

// ✅ Xóa toàn bộ giỏ hàng
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
