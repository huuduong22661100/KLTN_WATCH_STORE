import { useQuery } from "@tanstack/react-query"

const API_URL = "http://localhost:5000/api/v1"

const fetchProducts = async () => {
  const res = await fetch(`${API_URL}/products`)
  if (!res.ok) throw new Error("Network response was not ok")
  const response = await res.json()
  return response.data
}

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  })
}