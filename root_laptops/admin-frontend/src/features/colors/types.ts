import { ApiResponse, PaginatedApiResponse } from '@/features/products/types'; // Reusing common API response types

export interface Color {
  _id: string;
  name: string;
  hex: string;
  slug: string;
  created_at: string;
  updated_at: string;
}

export interface ColorPayload {
  name: string;
  hex: string;
  slug: string;
}

// Re-export for convenience
export { ApiResponse, PaginatedApiResponse };
