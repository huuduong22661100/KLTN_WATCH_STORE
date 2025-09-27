export interface Product {
  _id: string;
  title: string;
  name: string;
  description: string;
  images: {
    mainImg: string;
    sliderImg: string[];
  };
  price: number;
  color_id: string; // Assuming ID for now, will populate later
  brand_id: string; // Assuming ID for now, will populate later
  specifications: any; // Detailed specifications object
  faqs: Array<{ question: string; answer: string }>;
  sku: string;
  part_number: string;
  series: string;
  category_id: string[]; // Array of category IDs
  created_at: string;
  updated_at: string;
}

export interface ProductPayload {
  title: string;
  name: string;
  description: string;
  mainImg: string;
  sliderImg: string[];
  price: number;
  color_id: string;
  brand_id: string;
  specifications: any;
  faqs: Array<{ question: string; answer: string }>;
  sku: string;
  part_number: string;
  series: string;
  category_id: string[];
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface PaginatedApiResponse<T> extends ApiResponse<T> {
  pagination?: {
    current: number;
    pages: number;
    total: number;
  };
}
