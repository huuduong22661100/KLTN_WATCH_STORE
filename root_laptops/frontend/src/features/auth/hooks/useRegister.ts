import { useMutation } from "@tanstack/react-query";
import { registerApi } from "../api";
import { useAuthStore } from "@/store/authStore";
import { RegisterPayload, LoginResponse } from "../types";

export function useRegister() {
  const { login } = useAuthStore();

  return useMutation<LoginResponse, Error, RegisterPayload>({
    mutationFn: registerApi,
    onSuccess: (data) => {
      
      login(data.data.user, data.data.token);
    },
    onError: (error) => {
      console.error('Register failed:', error);
    }
  });
}