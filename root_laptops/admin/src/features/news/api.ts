import { NEWS_ENDPOINTS } from '@/constants/api-url';
import { News } from './types';

export const getNews = async (): Promise<News[]> => {
  const res = await fetch(NEWS_ENDPOINTS.LIST);

  if (!res.ok) {
    throw new Error('Failed to fetch news');
  }

  const data = await res.json();
  return data.data.news;
};
