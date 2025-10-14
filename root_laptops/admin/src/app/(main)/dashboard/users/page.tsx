'use client';

import React, { useState } from 'react';
import { useUsers, useDeleteUser, useUpdateUser } from '@/features/users/hooks/useUsers';
import { Button } from '@/shared/components/ui/button';
import { Badge } from '@/shared/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import { Pagination } from '@/shared/components/ui/pagination';
import { ConfirmDialog } from '@/shared/components/ui/confirm-dialog';
import { Trash2, Shield, User as UserIcon } from 'lucide-react';
import { User } from '@/shared/types';

export default function UsersPage() {
  const [page, setPage] = useState(1);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  
  const { data, isLoading, isError } = useUsers({ page, limit: 10 });
  const deleteUser = useDeleteUser();
  const updateUser = useUpdateUser();

  const handleDelete = () => {
    if (deleteId) {
      deleteUser.mutate(deleteId);
      setDeleteId(null);
    }
  };

  const handleRoleChange = (userId: string, newRole: 'user' | 'admin') => {
    updateUser.mutate({ id: userId, data: { role: newRole } });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Quản lý người dùng</h1>
          <p className="text-muted-foreground">
            Quản lý tài khoản và phân quyền người dùng
          </p>
        </div>
      </div>

      {isLoading && (
        <div className="flex justify-center py-8">
          <div className="text-muted-foreground">Đang tải...</div>
        </div>
      )}

      {isError && (
        <div className="flex justify-center py-8">
          <div className="text-red-500">Lỗi khi tải dữ liệu người dùng</div>
        </div>
      )}

      {data && (
        <>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tên</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Số điện thoại</TableHead>
                  <TableHead>Vai trò</TableHead>
                  <TableHead>Ngày tạo</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.data.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      Không có người dùng nào
                    </TableCell>
                  </TableRow>
                ) : (
                  data.data.map((user) => (
                    <TableRow key={user._id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.phone || '-'}</TableCell>
                      <TableCell>
                        <Select
                          value={user.role}
                          onValueChange={(value: string) => handleRoleChange(user._id, value as 'user' | 'admin')}
                        >
                          <SelectTrigger className="w-[130px]">
                            <Badge
                              variant={user.role === 'admin' ? 'default' : 'secondary'}
                              className="flex items-center gap-1"
                            >
                              {user.role === 'admin' ? (
                                <><Shield className="h-3 w-3" /> Admin</>
                              ) : (
                                <><UserIcon className="h-3 w-3" /> User</>
                              )}
                            </Badge>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="user">User</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        {new Date(user.created_at).toLocaleDateString('vi-VN')}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setDeleteId(user._id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
          <Pagination
            currentPage={page}
            totalPages={data.totalPages}
            onPageChange={setPage}
          />
        </>
      )}

      <ConfirmDialog
        open={deleteId !== null}
        onOpenChange={(open) => !open && setDeleteId(null)}
        onConfirm={handleDelete}
        title="Xóa người dùng"
        description="Bạn có chắc chắn muốn xóa người dùng này? Hành động này không thể hoàn tác."
        confirmText="Xóa"
      />
    </div>
  );
}
