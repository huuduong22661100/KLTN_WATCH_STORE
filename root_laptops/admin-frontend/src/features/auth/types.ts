export interface LoginPayload {
  email: string;
  password: string;
}

// This is the shape of the successful login response from the backend
export interface AuthSuccessResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: {
      id: string;
      name: string;
      email: string;
      role: 'user' | 'admin';
      phone: string;
      address: string;
      avatar_url: string;
    };
  };
}
