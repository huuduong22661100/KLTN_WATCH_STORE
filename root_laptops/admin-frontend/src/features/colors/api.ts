import { Color, ColorPayload, PaginatedApiResponse, ApiResponse } from './types';
import { useAuthStore } from '@/store/authStore';

const API_BASE_URL = 'http://localhost:5000/api/v1/colors';

const getAuthHeaders = () => {
  const token = useAuthStore.getState().token;
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
};

// Fetch all colors
export const fetchColors = async (): Promise<PaginatedApiResponse<Color[]>> => {
  const res = await fetch(API_BASE_URL, {
    headers: getAuthHeaders(),
  });
  const data: PaginatedApiResponse<Color[]> = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Failed to fetch colors');
  }
  return data;
};

// Fetch color by ID
export const fetchColorById = async (id: string): Promise<ApiResponse<Color>> => {
  const res = await fetch(`${API_BASE_URL}/${id}`, {
    headers: getAuthHeaders(),
  });
  const data: ApiResponse<Color> = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Failed to fetch color');
  }
  return data;
};

// Create a new color
export const createColor = async (payload: ColorPayload): Promise<ApiResponse<Color>> => {
  const res = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });
  const data: ApiResponse<Color> = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Failed to create color');
  }
  return data;
};

// Update an existing color
export const updateColor = async (id: string, payload: ColorPayload): Promise<ApiResponse<Color>> => {
  const res = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });
  const data: ApiResponse<Color> = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Failed to update color');
  }
  return data;
};

// Delete a color
export const deleteColor = async (id: string): Promise<ApiResponse<null>> => {
  const res = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  const data: ApiResponse<null> = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Failed to delete color');
  }
  return data;
};
