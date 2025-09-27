import { NewsArticle, NewsPayload, PaginatedApiResponse, ApiResponse } from './types';
import { useAuthStore } from '@/store/authStore';

const API_BASE_URL = 'http://localhost:5000/api/v1/news';

const getAuthHeaders = () => {
  const token = useAuthStore.getState().token;
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
};

// Fetch all news articles
export const fetchNews = async (): Promise<PaginatedApiResponse<NewsArticle[]>> => {
  const res = await fetch(API_BASE_URL, {
    headers: getAuthHeaders(),
  });
  const data: PaginatedApiResponse<NewsArticle[]> = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Failed to fetch news articles');
  }
  return data;
};

// Fetch news article by ID (or slug, backend uses slug for GET single)
export const fetchNewsById = async (id: string): Promise<ApiResponse<NewsArticle>> => {
  // Backend uses slug for GET single, but for edit we'll use ID
  // Assuming backend has a GET by ID for admin purposes, or we adapt to slug
  // For now, let's assume ID is used for edit. If not, this needs adjustment.
  const res = await fetch(`${API_BASE_URL}/${id}`, {
    headers: getAuthHeaders(),
  });
  const data: ApiResponse<NewsArticle> = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Failed to fetch news article');
  }
  return data;
};

// Create a new news article
export const createNews = async (payload: NewsPayload): Promise<ApiResponse<NewsArticle>> => {
  const res = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });
  const data: ApiResponse<NewsArticle> = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Failed to create news article');
  }
  return data;
};

// Update an existing news article
export const updateNews = async (id: string, payload: NewsPayload): Promise<ApiResponse<NewsArticle>> => {
  const res = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });
  const data: ApiResponse<NewsArticle> = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Failed to update news article');
  }
  return data;
};

// Delete a news article
export const deleteNews = async (id: string): Promise<ApiResponse<null>> => {
  const res = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  const data: ApiResponse<null> = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Failed to delete news article');
  }
  return data;
};
