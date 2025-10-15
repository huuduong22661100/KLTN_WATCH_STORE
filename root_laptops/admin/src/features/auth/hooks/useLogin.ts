import { useMutation } from "@tanstack/react-query";
import { loginApi } from "../api";
import { useAuthStore } from "@/store/authStore";
import { LoginPayload, AuthResponse } from "../types";
import { toast } from 'sonner';

export function useLogin() {
  const { login } = useAuthStore();

  return useMutation<AuthResponse, Error, LoginPayload>({
    mutationFn: loginApi,
    onSuccess: (data) => {
      // ✅ Backend trả về: { success, message, data: { user, token } }
      const { user, token } = data.data;

      // ✅ Kiểm tra role phải là admin
      if (user.role !== 'admin') {
        toast.error('Bạn không có quyền truy cập trang admin. Vui lòng đăng nhập bằng tài khoản admin.');
        return;
      }

      // ✅ Lưu trạng thái auth
      login(user, token);
      toast.success('Đăng nhập thành công!');
    },
    onError: (error) => {
      console.error('Login failed:', error);
      toast.error(error.message || 'Đăng nhập thất bại');
    }
  });
}