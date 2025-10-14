// ============ Common Types ============
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  total: number;
  page: number;
  totalPages: number;
}

export interface QueryParams {
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
  [key: string]: any;
}

// ============ Product Types ============
export interface Product {
  _id: string;
  id: number;
  title: string;
  description: { name: string; title: string; }[];
  images: {
    mainImg: { url: string; alt_text?: string; };
    sliderImg: { url: string; alt_text?: string; }[];
  };
  price: number;
  stock: number;
  brand: string;
  sku: string;
  category_id: Category[] | string[];
  tags: string[];
  gender: 'Nam' | 'Nữ';
  origin: string;
  color_id: Color | string;
  specifications: {
    weight?: string;
    movement?: string;
    size?: string;
    thickness?: string;
    band_variation?: string;
    glass_material?: string;
    water_resistance_level?: string;
    dial_shape?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface ProductFormData {
  title: string;
  description: { name: string; title: string; }[];
  images: {
    mainImg: { url: string; alt_text?: string; };
    sliderImg: { url: string; alt_text?: string; }[];
  };
  price: number;
  stock: number;
  brand: string;
  sku: string;
  category_id: string[];
  tags: string[];
  gender: 'Nam' | 'Nữ';
  origin: string;
  color_id: string;
  specifications: {
    weight?: string;
    movement?: string;
    size?: string;
    thickness?: string;
    band_variation?: string;
    glass_material?: string;
    water_resistance_level?: string;
    dial_shape?: string;
  };
}

// ============ Category Types ============
export interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image_url?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryFormData {
  name: string;
  slug: string;
  description?: string;
  image_url?: string;
}

// ============ Color Types ============
export interface Color {
  _id: string;
  name: string;
  hex_code: string;
  createdAt: string;
  updatedAt: string;
}

export interface ColorFormData {
  name: string;
  hex_code: string;
}

// ============ Order Types ============
export interface Order {
  _id: string;
  order_number: string;
  user_id: User | string;
  total: number;
  shipping_fee: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipping' | 'delivered' | 'cancelled';
  shipping_name: string;
  shipping_phone: string;
  shipping_address: string;
  shipping_district: string;
  shipping_city: string;
  payment_method: string;
  payment_status: 'pending' | 'paid' | 'failed';
  items: OrderItem[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  _id: string;
  product_id: Product | string;
  product_name: string;
  product_image: string;
  quantity: number;
  price: number;
  subtotal: number;
}

// ============ User Types ============
export interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  avatar_url?: string;
  role: 'user' | 'admin';
  created_at: string;
  updated_at: string;
}

export interface UserFormData {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  role: 'user' | 'admin';
  password?: string;
}

// ============ News Types ============
export interface News {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  featured_image?: string;
  author: string;
  status: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
}

export interface NewsFormData {
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  featured_image?: string;
  author: string;
  status: 'draft' | 'published';
}
