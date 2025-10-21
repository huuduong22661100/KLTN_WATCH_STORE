'use client';

import React, { useState } from 'react';
import {
  useCategories,
  useCreateCategory,
  useUpdateCategory,
  useDeleteCategory,
} from '@/features/categories/hooks/useCategories';
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
import { Category, CategoryFormData } from '@/shared/types';
import styles from './page.module.css';

export default function CategoriesPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [formData, setFormData] = useState<CategoryFormData>({
    category: '',
  });
  const [searchQuery, setSearchQuery] = useState('');

  const { data: categories, isLoading, isError } = useCategories({ search: searchQuery });
  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();
  const deleteCategory = useDeleteCategory();

  const handleOpenDialog = (category?: Category) => {
    if (category) {
      setEditingCategory(category);
      setFormData({
        category: category.category,
      });
    } else {
      setEditingCategory(null);
      setFormData({
        category: '',
      });
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCategory) {
      updateCategory.mutate(
        { id: editingCategory._id, data: formData },
        {
          onSuccess: () => {
            setIsDialogOpen(false);
            setEditingCategory(null);
          },
        }
      );
    } else {
      createCategory.mutate(formData, {
        onSuccess: () => {
          setIsDialogOpen(false);
        },
      });
    }
  };

  const handleDelete = () => {
    if (deleteId) {
      deleteCategory.mutate(deleteId);
      setDeleteId(null);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>Quản lý danh mục</h1>
          <p className={styles.description}>
            Quản lý danh mục sản phẩm
          </p>
        </div>
        <Button onClick={() => handleOpenDialog()}>
          <Plus className={styles.buttonIcon} /> Thêm danh mục
        </Button>
      </div>

      <div className={styles.header}>
        <Input
          placeholder="Tìm kiếm theo tên danh mục..."
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
          <div className={styles.errorText}>Lỗi khi tải dữ liệu danh mục</div>
        </div>
      )}

      {categories && (
        <div className={styles.tableContainer}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tên danh mục</TableHead>
                <TableHead className={styles.alignRight}>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={2} className={styles.emptyCell}>
                    Không có danh mục nào
                  </TableCell>
                </TableRow>
              ) : (
                categories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell>{category.category}</TableCell>
                    <TableCell className={styles.alignRight}>
                      <div className={styles.actions}>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleOpenDialog(category)}
                        >
                          <Edit className={styles.actionIcon} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setDeleteId(category._id)}
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
              {editingCategory ? 'Cập nhật danh mục' : 'Thêm danh mục mới'}
            </DialogTitle>
            <DialogDescription>
              {editingCategory
                ? 'Cập nhật thông tin danh mục'
                : 'Nhập thông tin danh mục mới'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="category">Tên danh mục</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">
                {editingCategory ? 'Cập nhật' : 'Tạo mới'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={deleteId !== null}
        onOpenChange={(open) => !open && setDeleteId(null)}
        onConfirm={handleDelete}
        title="Xóa danh mục"
        description="Bạn có chắc chắn muốn xóa danh mục này? Hành động này không thể hoàn tác."
        confirmText="Xóa"
      />
    </div>
  );
}
