import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUsers, getUserById, updateUser, deleteUser } from '../api';
import { QueryParams, UserFormData } from '@/shared/types';
import { toast } from 'sonner';
import { useAuthStore } from '@/store/authStore';

export const useUsers = (params?: QueryParams) => {
  const { token } = useAuthStore();
  return useQuery({
    queryKey: ['users', params],
    queryFn: () => getUsers(params),
    enabled: !!token,
  });
};

export const useUsersForSelection = () => {
  const { token } = useAuthStore();
  return useQuery({
    queryKey: ['usersForSelection'],
    queryFn: async () => {
      const response = await getUsers({ limit: 1000 }); // Fetch a large number of users
      return response.data.map((user: { _id: string; name: string }) => ({ 
        _id: user._id, 
        name: user.name 
      }));
    },
    enabled: !!token,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (renamed from cacheTime in React Query v5)
  });
};

export const useUser = (id: string) => {
  const { token } = useAuthStore();
  return useQuery({
    queryKey: ['users', id],
    queryFn: () => getUserById(id),
    enabled: !!id && !!token,
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<UserFormData> }) =>
      updateUser(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('Cập nhật người dùng thành công');
    },
    onError: () => {
      toast.error('Cập nhật người dùng thất bại');
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('Xóa người dùng thành công');
    },
    onError: () => {
      toast.error('Xóa người dùng thất bại');
    },
  });
};
