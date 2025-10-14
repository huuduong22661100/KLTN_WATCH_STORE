'use client';

import React, { useState } from 'react';
import {
  useColors,
  useCreateColor,
  useUpdateColor,
  useDeleteColor,
} from '@/features/colors/hooks/useColors';
import { Button } from '@/shared/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { ConfirmDialog } from '@/shared/components/ui/confirm-dialog';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Color, ColorFormData } from '@/shared/types';

export default function ColorsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingColor, setEditingColor] = useState<Color | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [formData, setFormData] = useState<ColorFormData>({
    name: '',
    hex_code: '#000000',
  });

  const { data: colors, isLoading, isError } = useColors();
  const createColor = useCreateColor();
  const updateColor = useUpdateColor();
  const deleteColor = useDeleteColor();

  const handleOpenDialog = (color?: Color) => {
    if (color) {
      setEditingColor(color);
      setFormData({
        name: color.name,
        hex_code: color.hex_code,
      });
    } else {
      setEditingColor(null);
      setFormData({
        name: '',
        hex_code: '#000000',
      });
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingColor) {
      updateColor.mutate(
        { id: editingColor._id, data: formData },
        {
          onSuccess: () => {
            setIsDialogOpen(false);
            setEditingColor(null);
          },
        }
      );
    } else {
      createColor.mutate(formData, {
        onSuccess: () => {
          setIsDialogOpen(false);
        },
      });
    }
  };

  const handleDelete = () => {
    if (deleteId) {
      deleteColor.mutate(deleteId);
      setDeleteId(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Quản lý màu sắc</h1>
          <p className="text-muted-foreground">
            Quản lý màu sắc sản phẩm
          </p>
        </div>
        <Button onClick={() => handleOpenDialog()}>
          <Plus className="mr-2 h-4 w-4" /> Thêm màu sắc
        </Button>
      </div>

      {isLoading && (
        <div className="flex justify-center py-8">
          <div className="text-muted-foreground">Đang tải...</div>
        </div>
      )}

      {isError && (
        <div className="flex justify-center py-8">
          <div className="text-red-500">Lỗi khi tải dữ liệu màu sắc</div>
        </div>
      )}

      {colors && (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Màu sắc</TableHead>
                <TableHead>Tên màu</TableHead>
                <TableHead>Mã màu</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {colors.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                    Không có màu sắc nào
                  </TableCell>
                </TableRow>
              ) : (
                colors.map((color) => (
                  <TableRow key={color._id}>
                    <TableCell>
                      <div
                        className="w-10 h-10 rounded border"
                        style={{ backgroundColor: color.hex_code }}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{color.name}</TableCell>
                    <TableCell>{color.hex_code}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleOpenDialog(color)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setDeleteId(color._id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingColor ? 'Cập nhật màu sắc' : 'Thêm màu sắc mới'}
            </DialogTitle>
            <DialogDescription>
              {editingColor
                ? 'Cập nhật thông tin màu sắc'
                : 'Nhập thông tin màu sắc mới'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Tên màu</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="hex_code">Mã màu (Hex)</Label>
                <div className="flex gap-2">
                  <Input
                    id="hex_code"
                    type="color"
                    value={formData.hex_code}
                    onChange={(e) =>
                      setFormData({ ...formData, hex_code: e.target.value })
                    }
                    className="w-20 h-10"
                    required
                  />
                  <Input
                    value={formData.hex_code}
                    onChange={(e) =>
                      setFormData({ ...formData, hex_code: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">
                {editingColor ? 'Cập nhật' : 'Tạo mới'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={deleteId !== null}
        onOpenChange={(open) => !open && setDeleteId(null)}
        onConfirm={handleDelete}
        title="Xóa màu sắc"
        description="Bạn có chắc chắn muốn xóa màu sắc này? Hành động này không thể hoàn tác."
        confirmText="Xóa"
      />
    </div>
  );
}
