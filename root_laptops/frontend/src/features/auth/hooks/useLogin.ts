import { useMutation } from "@tanstack/react-query";
import { loginApi } from "../api";
import { useAuthStore } from "@/store/authStore";
import { LoginCredentials, LoginResponse } from "../types";
import { useCartStore } from "@/store/cartStore";

export function useLogin() {
  const { login } = useAuthStore();
  const { loadCartFromServer } = useCartStore();

  return useMutation<LoginResponse, Error, LoginCredentials>({
    mutationFn: loginApi, 
    onSuccess: async (data) => {
      login(data.data.user, data.data.token);
      await loadCartFromServer();
    },
    onError: (error) => {
      console.error('Login failed:', error);
    }
  });
}