import { News, NewsListResponse, NewsDetailResponse } from "../types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";


export async function getAllNews(): Promise<NewsListResponse> {
  const res = await fetch(`${API_URL}/news`, {
    next: { revalidate: 3600 }, 
  });

  if (!res.ok) {
    throw new Error("Failed to fetch news");
  }

  return res.json();
}


export async function getNewsBySlug(slug: string): Promise<NewsDetailResponse> {
  const res = await fetch(`${API_URL}/news/slug/${slug}`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch news detail");
  }

  return res.json();
}


export async function getNewsById(id: string): Promise<News> {
  const res = await fetch(`${API_URL}/news/${id}`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch news detail");
  }

  const response: NewsDetailResponse = await res.json();
  return response.data;
}
