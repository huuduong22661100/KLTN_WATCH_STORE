import { COLOR_ENDPOINTS } from '@/constants/api-url';
import { Color, ColorFormData } from '@/shared/types';

export const getColors = async (): Promise<Color[]> => {
  const res = await fetch(COLOR_ENDPOINTS.LIST);

  if (!res.ok) {
    throw new Error('Failed to fetch colors');
  }

  const data = await res.json();
  return data.data;
};

export const getColorById = async (id: string): Promise<Color> => {
  const res = await fetch(COLOR_ENDPOINTS.DETAIL(id));

  if (!res.ok) {
    throw new Error('Failed to fetch color');
  }

  const data = await res.json();
  return data.data;
};

export const createColor = async (colorData: ColorFormData): Promise<Color> => {
  const res = await fetch(COLOR_ENDPOINTS.CREATE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(colorData),
  });

  if (!res.ok) {
    throw new Error('Failed to create color');
  }

  const data = await res.json();
  return data.data;
};

export const updateColor = async (id: string, colorData: Partial<ColorFormData>): Promise<Color> => {
  const res = await fetch(COLOR_ENDPOINTS.UPDATE(id), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(colorData),
  });

  if (!res.ok) {
    throw new Error('Failed to update color');
  }

  const data = await res.json();
  return data.data;
};

export const deleteColor = async (id: string): Promise<void> => {
  const res = await fetch(COLOR_ENDPOINTS.DELETE(id), {
    method: 'DELETE',
  });

  if (!res.ok) {
    throw new Error('Failed to delete color');
  }
};
