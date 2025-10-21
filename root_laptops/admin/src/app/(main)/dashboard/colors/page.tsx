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
import styles from './page.module.css';

export default function ColorsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingColor, setEditingColor] = useState<Color | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [formData, setFormData] = useState<ColorFormData>({
    color: '#000000',
  });
  const [searchQuery, setSearchQuery] = useState('');

  const { data: colors, isLoading, isError } = useColors({ search: searchQuery });
  const createColor = useCreateColor();
  const updateColor = useUpdateColor();
  const deleteColor = useDeleteColor();

  const handleOpenDialog = (color?: Color) => {
    if (color) {
      setEditingColor(color);
      setFormData({
        color: color.color,
      });
    } else {
      setEditingColor(null);
      setFormData({
        color: '#000000',
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
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>Quản lý màu sắc</h1>
          <p className={styles.description}>
            Quản lý màu sắc sản phẩm
          </p>
        </div>
        <Button onClick={() => handleOpenDialog()}>
          <Plus className={styles.buttonIcon} /> Thêm màu sắc
        </Button>
      </div>

      <div className={styles.header}>
        <Input
          placeholder="Tìm kiếm theo tên màu..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {isLoading && (
        <div className={styles.loadingContainer}>
          <div className={styles.loadingText}>Đang tải...</div>
        </div>
      )}

      {isError && (
        <div className={styles.errorContainer}>
          <div className={styles.errorText}>Lỗi khi tải dữ liệu màu sắc</div>
        </div>
      )}

      {colors && (
        <div className={styles.tableContainer}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Màu sắc</TableHead>
                <TableHead>Mã màu</TableHead>
                <TableHead className={styles.alignRight}>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {colors.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className={styles.emptyCell}>
                    Không có màu sắc nào
                  </TableCell>
                </TableRow>
              ) : (
                colors.map((color) => (
                  <TableRow key={color.id}>
                    <TableCell>
                      <div
                        style={{ 
                          width: '2.5rem',
                          height: '2.5rem',
                          borderRadius: '0.25rem',
                          border: '1px solid hsl(var(--border))',
                          backgroundColor: color.color 
                        }}
                      />
                    </TableCell>
                    <TableCell>{color.color}</TableCell>
                    <TableCell className={styles.alignRight}>
                      <div className={styles.actions}>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleOpenDialog(color)}
                        >
                          <Edit className={styles.actionIcon} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setDeleteId(color._id)}
                        >
                          <Trash2 className={styles.actionIcon} />
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
                <Label htmlFor="color">Mã màu (Hex)</Label>
                <div className="flex gap-2">
                  <Input
                    id="color"
                    type="color"
                    value={formData.color}
                    onChange={(e) =>
                      setFormData({ ...formData, color: e.target.value })
                    }
                    className="w-20 h-10"
                    required
                  />
                  <Input
                    value={formData.color}
                    onChange={(e) =>
                      setFormData({ ...formData, color: e.target.value })
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
