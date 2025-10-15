export interface User {
  id: string;
  email: string;
  name: string;
  role?: string;
  phone?: string;
  address?: string;
  avatar_url?: string;
}

// Dữ liệu gửi đi khi login
export type LoginPayload = {
  email: string;
  password: string;
};

// Dữ liệu gửi đi khi register
export type RegisterPayload = {
  email: string;
  password: string;
  name: string;
};

// ✅ Dữ liệu API trả về sau khi login/register thành công (giống Frontend)
export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    token: string;
  };
}

// Alias để dễ hiểu
export type LoginResponse = AuthResponse;
