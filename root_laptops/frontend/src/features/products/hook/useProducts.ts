import { useQuery } from "@tanstack/react-query"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1"

interface ProductFilters {
  page?: number;
  limit?: number;
  category?: string;
  color?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  sort?: string;
}

const fetchProducts = async (filters: ProductFilters) => {
  const params = new URLSearchParams();
  if (filters.page) params.append("page", filters.page.toString());
  if (filters.limit) params.append("limit", filters.limit.toString());
  if (filters.category) params.append("category", filters.category);
  if (filters.color) params.append("color", filters.color);
  if (filters.minPrice) params.append("minPrice", filters.minPrice.toString());
  if (filters.maxPrice) params.append("maxPrice", filters.maxPrice.toString());
  if (filters.search) params.append("search", filters.search);
  if (filters.sort) params.append("sort", filters.sort);

  const url = `${API_URL}/products?${params.toString()}`;
  const res = await fetch(url, {
    cache: 'no-store', 
  });
  if (!res.ok) throw new Error("Network response was not ok");
  const response = await res.json();
  return response;
}

export function useProducts(filters: ProductFilters) {
  return useQuery({
    queryKey: ["products", filters],
    queryFn: () => fetchProducts(filters),
    staleTime: 0, 
    gcTime: 1000 * 60 * 5, 
  })
}