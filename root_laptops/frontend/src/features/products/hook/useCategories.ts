import { useQuery } from "@tanstack/react-query";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

const fetchCategories = async () => {
  const res = await fetch(`${API_URL}/categories`, {
    
    cache: 'force-cache',
  });
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
};

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 60, 
    gcTime: 1000 * 60 * 60 * 2, 
  });
}
