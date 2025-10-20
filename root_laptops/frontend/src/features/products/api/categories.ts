

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

export async function getCategories() {
  const res = await fetch(`${API_URL}/categories`, {
    
    next: { 
      revalidate: 3600, 
      tags: ['categories'] 
    },
  });
  
  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }
  
  return res.json();
}

export async function getCategoryById(id: string) {
  const res = await fetch(`${API_URL}/categories/${id}`, {
    next: { revalidate: 3600 },
  });
  
  if (!res.ok) {
    throw new Error("Failed to fetch category");
  }
  
  return res.json();
}
