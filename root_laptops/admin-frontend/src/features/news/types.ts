import { ApiResponse, PaginatedApiResponse } from '@/features/products/types'; // Reusing common API response types

export interface NewsArticle {
  _id: string;
  title: string;
  slug: string;
  content: string;
  thumbnail_img: string;
  author_id: string; // Assuming ID for now, will populate later
  created_at: string;
  updated_at: string;
}

export interface NewsPayload {
  title: string;
  slug: string;
  content: string;
  thumbnail_img: string;
}

// Re-export for convenience
export { ApiResponse, PaginatedApiResponse };
