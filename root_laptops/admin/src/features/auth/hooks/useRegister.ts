import { useMutation } from "@tanstack/react-query";
import { registerApi } from "../api";
import { useAuthStore } from "@/store/authStore"
import { RegisterPayload, AuthResponse } from "../types";

export function useRegister() {
  const { login } = useAuthStore();

  return useMutation<AuthResponse, Error, RegisterPayload>({
    mutationFn: registerApi,
    onSuccess: (data) => {
      
      login(data.token, data.user);
    },
  });
}