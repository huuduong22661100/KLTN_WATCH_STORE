import { useMutation } from "@tanstack/react-query";
import { loginApi } from "../api";
import { useAuthStore } from "@/store/authStore";
import { LoginCredentials, LoginResponse } from "../types";

export function useLogin() {
  const { login } = useAuthStore();

  return useMutation<LoginResponse, Error, LoginCredentials>({
    mutationFn: loginApi, 
    onSuccess: (data) => {
      // Khi API trả về thành công, gọi action `login` của store
      login(data.data.token, data.data.user);
    },
  });
}