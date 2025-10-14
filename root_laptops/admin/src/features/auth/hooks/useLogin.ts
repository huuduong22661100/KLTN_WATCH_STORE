import { useMutation } from "@tanstack/react-query";
import { loginApi } from "../api";
import { useAuthStore } from "@/store/authStore";
import { LoginCredentials, LoginResponse } from "../types";

export function useLogin() {
  const { login } = useAuthStore();

  return useMutation<LoginResponse, Error, LoginCredentials>({
    mutationFn: loginApi, 
    onSuccess: (data) => {
      login(data.data.user, data.data.token);
    },
    onError: (error) => {
      console.error('Login failed:', error);
    }
  });
}