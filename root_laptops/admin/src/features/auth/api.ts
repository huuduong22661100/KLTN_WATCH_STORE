import { AUTH_ENDPOINTS } from '@/constants/api-url';
import { LoginPayload, RegisterPayload, AuthResponse, User } from './types';

export const loginApi = async (payload: LoginPayload): Promise<AuthResponse> => {
  const res = await fetch(AUTH_ENDPOINTS.LOGIN, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Đăng nhập thất bại' }));
    throw new Error(error.message);
  }

  return res.json();
};

export const registerApi = async (payload: RegisterPayload): Promise<AuthResponse> => {
  const res = await fetch(AUTH_ENDPOINTS.REGISTER, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Đăng ký thất bại' }));
    throw new Error(error.message);
  }

  return res.json();
};

export const getCurrentUserApi = async (token: string): Promise<User> => {
  const res = await fetch(AUTH_ENDPOINTS.ME, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error('Không thể lấy thông tin người dùng');
  }

  const result = await res.json();
  return result.data.user;
};

export const logoutApi = async (token: string): Promise<void> => {
  await fetch(AUTH_ENDPOINTS.LOGOUT, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
};