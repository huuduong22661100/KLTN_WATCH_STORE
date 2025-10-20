

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

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

export async function getProducts(filters: ProductFilters = {}) {
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
    
    next: { 
      revalidate: 300, 
      tags: ['products', filters.category ? `products-${filters.category}` : 'all-products']
    },
  });
  
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }
  
  return res.json();
}

export async function getProductById(id: string) {
  const res = await fetch(`${API_URL}/products/${id}`, {
    next: { 
      revalidate: 300,
      tags: [`product-${id}`]
    },
  });
  
  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }
  
  return res.json();
}
