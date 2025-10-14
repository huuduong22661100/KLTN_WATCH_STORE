export interface CartItem {
  id: string;
  product_id: string;
  product_name: string;
  product_image: string;
  price: number;
  quantity: number;
  stock: number; // Số lượng tồn kho
}

export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
}

export interface AddToCartPayload {
  watch_id: string;
  quantity: number;
}

export interface UpdateCartPayload {
  cart_item_id: string;
  quantity: number;
}