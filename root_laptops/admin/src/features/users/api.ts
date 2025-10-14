import { USER_ENDPOINTS } from '@/constants/api-url';
import { User, UserFormData, PaginatedResponse, QueryParams } from '@/shared/types';

export const getUsers = async (params?: QueryParams): Promise<PaginatedResponse<User>> => {
  const queryString = params ? '?' + new URLSearchParams(params as any).toString() : '';
  const res = await fetch(USER_ENDPOINTS.LIST + queryString);

  if (!res.ok) {
    throw new Error('Failed to fetch users');
  }

  return await res.json();
};

export const getUserById = async (id: string): Promise<User> => {
  const res = await fetch(USER_ENDPOINTS.DETAIL(id));

  if (!res.ok) {
    throw new Error('Failed to fetch user');
  }

  const data = await res.json();
  return data.data;
};

export const updateUser = async (id: string, userData: Partial<UserFormData>): Promise<User> => {
  const res = await fetch(USER_ENDPOINTS.UPDATE(id), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!res.ok) {
    throw new Error('Failed to update user');
  }

  const data = await res.json();
  return data.data;
};

export const deleteUser = async (id: string): Promise<void> => {
  const res = await fetch(USER_ENDPOINTS.DELETE(id), {
    method: 'DELETE',
  });

  if (!res.ok) {
    throw new Error('Failed to delete user');
  }
};
