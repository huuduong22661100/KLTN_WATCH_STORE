import { ApiResponse, PaginatedApiResponse } from '@/features/products/types'; // Reusing common API response types

export interface Category {
  _id: string;
  name: string;
  parent_id?: string | Category; // Can be ID or populated object
  created_at: string;
  updated_at: string;
}

export interface CategoryPayload {
  name: string;
  parent_id?: string | null;
}

// Re-export for convenience
export { ApiResponse, PaginatedApiResponse };
