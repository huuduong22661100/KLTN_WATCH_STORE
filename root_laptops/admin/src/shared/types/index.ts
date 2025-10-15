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
  customerName?: string;
  date?: string;
  orderCode?: string;
  paymentMethod?: string;
  category?: string;
  color?: string;
  minPrice?: number;
  maxPrice?: number;
  [key: string]: any;
}

// ============ Product Types ============
export interface Product {
  _id: string;
  id: number;
  title: string;
  description: { _id?: string; title: string; description?: string; }[];
  images: {
    mainImg: { url: string; alt_text?: string; };
    sliderImg: { url: string; alt_text?: string; }[];
  };
  price: number;
  stock: number;
  brand: string;
  sku: string;
  category_id: (string | { _id: string; id: number; category: string; })[]; // Có thể là string hoặc populated object
  tags: string[];
  gender: 'Nam' | 'Nữ';
  origin: string;
  color_id?: string | { _id: string; id: number; color: string; }; // Optional và có thể populated
  specifications?: {
    weight?: string;
    movement?: string;
    size?: string;
    thickness?: string;
    band_variation?: string;
    glass_material?: string;
    water_resistance_level?: string;
    dial_shape?: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductFormData {
  id?: number;
  title: string;
  description: { title: string; description?: string; }[];
  images: {
    mainImg: { url: string; alt_text?: string; };
    sliderImg: { url: string; alt_text?: string; }[];
  };
  price: number;
  stock: number;
  brand: string;
  sku: string;
  category_id: string[]; // Array of ObjectId strings
  tags: string[];
  gender: 'Nam' | 'Nữ';
  origin: string;
  color_id?: string; // ObjectId string
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
  _id: string; // MongoDB ObjectId
  id: number;  // Custom numeric ID
  category: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CategoryFormData {
  category: string;
}

// ============ Color Types ============
export interface Color {
  _id: string; // MongoDB ObjectId
  id: number;  // Custom numeric ID
  color: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ColorFormData {
  color: string;
}

// ============ Order Types ============
export interface Order {
  _id: string;
  order_number: string;
  user_id: User | string; // Can be populated User object or just ID string
  total: number; // Backend uses 'total', not 'total_amount'
  shipping_fee: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipping' | 'delivered' | 'cancelled';
  shipping_name: string;
  shipping_phone: string;
  shipping_address: string;
  shipping_district: string;
  shipping_city: string;
  payment_method: string;
  items?: OrderItem[]; // Optional, populated separately
  note?: string; // Backend uses 'note', not 'notes'
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
  thumbnail_img: string;
  author_id: { _id: string; name: string; };
  status: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
}

export interface NewsFormData {
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  thumbnail_img: string;
  author_id: string;
  status: 'draft' | 'published';
}
