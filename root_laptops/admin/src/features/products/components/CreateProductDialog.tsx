'use client';

import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ProductFormData } from '@/shared/types';
import { createProduct } from '@/features/products/api';
import { getCategories } from '@/features/categories/api';
import { getColors } from '@/features/colors/api';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { Textarea } from '@/shared/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { Loader2, Plus, X } from 'lucide-react';

interface CreateProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateProductDialog({ open, onOpenChange }: CreateProductDialogProps) {
  const queryClient = useQueryClient();

  // Initial form state
  const [formData, setFormData] = useState<Partial<ProductFormData>>({
    title: '',
    brand: '',
    gender: 'Nam',
    origin: '',
    price: 0,
    stock: 0,
    sku: '',
    category_id: [],
    tags: [],
    description: [{ title: '', description: '' }],
    images: {
      mainImg: { url: '', alt_text: '' },
      sliderImg: [],
    },
    specifications: {
      weight: '',
      movement: '',
      size: '',
      thickness: '',
      band_variation: '',
      glass_material: '',
      water_resistance_level: '',
      dial_shape: '',
    },
  });

  // Fetch categories and colors
  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategories({ limit: 100 }),
  });

  const { data: colorsData } = useQuery({
    queryKey: ['colors'],
    queryFn: () => getColors({ limit: 100 }),
  });

  const categories = categoriesData || [];
  const colors = colorsData || [];

  // Create mutation
  const createMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      toast.success('Tạo sản phẩm thành công', {
        description: 'Sản phẩm mới đã được thêm vào danh sách',
      });
      queryClient.invalidateQueries({ queryKey: ['products'] });
      onOpenChange(false);
      resetForm();
    },
    onError: (error: any) => {
      toast.error('Lỗi tạo sản phẩm', {
        description: error.message || 'Không thể tạo sản phẩm',
      });
    },
  });

  const handleFieldChange = (field: keyof ProductFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNestedFieldChange = (parent: string, field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [parent]: {
        ...(prev[parent as keyof ProductFormData] as any),
        [field]: value,
      },
    }));
  };

  const handleDescriptionChange = (index: number, field: 'title' | 'description', value: string) => {
    const newDescriptions = [...(formData.description || [])];
    newDescriptions[index] = { ...newDescriptions[index], [field]: value };
    setFormData((prev) => ({ ...prev, description: newDescriptions }));
  };

  const handleAddDescription = () => {
    setFormData((prev) => ({
      ...prev,
      description: [...(prev.description || []), { title: '', description: '' }],
    }));
  };

  const handleRemoveDescription = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      description: prev.description?.filter((_, i) => i !== index),
    }));
  };

  const handleTagChange = (index: number, value: string) => {
    const newTags = [...(formData.tags || [])];
    newTags[index] = value;
    setFormData((prev) => ({ ...prev, tags: newTags }));
  };

  const handleAddTag = () => {
    setFormData((prev) => ({ ...prev, tags: [...(prev.tags || []), ''] }));
  };

  const handleRemoveTag = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags?.filter((_, i) => i !== index),
    }));
  };

  const handleCategoryToggle = (categoryId: string) => {
    const currentCategories = formData.category_id || [];
    const newCategories = currentCategories.includes(categoryId)
      ? currentCategories.filter((id) => id !== categoryId)
      : [...currentCategories, categoryId];
    
    setFormData((prev) => ({ ...prev, category_id: newCategories }));
  };

  const resetForm = () => {
    setFormData({
      title: '',
      brand: '',
      gender: 'Nam',
      origin: '',
      price: 0,
      stock: 0,
      sku: '',
      category_id: [],
      tags: [],
      description: [{ title: '', description: '' }],
      images: {
        mainImg: { url: '', alt_text: '' },
        sliderImg: [],
      },
      specifications: {
        weight: '',
        movement: '',
        size: '',
        thickness: '',
        band_variation: '',
        glass_material: '',
        water_resistance_level: '',
        dial_shape: '',
      },
    });
  };

  const handleSubmit = () => {
    // Validation
    if (!formData.title || !formData.brand || !formData.sku) {
      toast.error('Vui lòng điền đầy đủ thông tin', {
        description: 'Tên sản phẩm, thương hiệu và SKU là bắt buộc',
      });
      return;
    }

    if (!formData.images?.mainImg?.url) {
      toast.error('Vui lòng thêm hình ảnh chính', {
        description: 'Sản phẩm cần có ít nhất 1 hình ảnh',
      });
      return;
    }

    createMutation.mutate(formData as ProductFormData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Tạo sản phẩm mới</DialogTitle>
          <DialogDescription>
            Điền thông tin để tạo sản phẩm mới. Các trường có dấu * là bắt buộc.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Thông tin cơ bản</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">
                  Tên sản phẩm <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleFieldChange('title', e.target.value)}
                  placeholder="VD: Đồng hồ Rolex Submariner"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sku">
                  SKU <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="sku"
                  value={formData.sku}
                  onChange={(e) => handleFieldChange('sku', e.target.value)}
                  placeholder="VD: ROLEX-SUB-001"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="brand">
                  Thương hiệu <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="brand"
                  value={formData.brand}
                  onChange={(e) => handleFieldChange('brand', e.target.value)}
                  placeholder="VD: Rolex"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="origin">Xuất xứ</Label>
                <Input
                  id="origin"
                  value={formData.origin}
                  onChange={(e) => handleFieldChange('origin', e.target.value)}
                  placeholder="VD: Thụy Sĩ"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">
                  Giá <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => handleFieldChange('price', Number(e.target.value))}
                  placeholder="0"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="stock">
                  Tồn kho <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="stock"
                  type="number"
                  value={formData.stock}
                  onChange={(e) => handleFieldChange('stock', Number(e.target.value))}
                  placeholder="0"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender">Giới tính</Label>
                <select
                  id="gender"
                  value={formData.gender}
                  onChange={(e) => handleFieldChange('gender', e.target.value as 'Nam' | 'Nữ')}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="color">Màu sắc</Label>
                <select
                  id="color"
                  value={formData.color_id || ''}
                  onChange={(e) => handleFieldChange('color_id', e.target.value || undefined)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="">Chọn màu sắc</option>
                  {colors.map((color: any) => (
                    <option key={color._id} value={color._id}>
                      {color.color}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-2">
            <Label>Danh mục</Label>
            <div className="flex flex-wrap gap-2 border rounded-md p-3 min-h-[60px]">
              {categories.map((category: any) => (
                <button
                  key={category._id}
                  type="button"
                  onClick={() => handleCategoryToggle(category._id)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    formData.category_id?.includes(category._id)
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                >
                  {category.category}
                </button>
              ))}
            </div>
          </div>

          {/* Images */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Hình ảnh</h3>
            
            <div className="space-y-2">
              <Label htmlFor="mainImg">
                Hình ảnh chính <span className="text-destructive">*</span>
              </Label>
              <Input
                id="mainImg"
                value={formData.images?.mainImg?.url || ''}
                onChange={(e) =>
                  handleNestedFieldChange('images', 'mainImg', {
                    url: e.target.value,
                    alt_text: formData.images?.mainImg?.alt_text || '',
                  })
                }
                placeholder="URL hình ảnh chính"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="mainImgAlt">Alt text hình ảnh chính</Label>
              <Input
                id="mainImgAlt"
                value={formData.images?.mainImg?.alt_text || ''}
                onChange={(e) =>
                  handleNestedFieldChange('images', 'mainImg', {
                    url: formData.images?.mainImg?.url || '',
                    alt_text: e.target.value,
                  })
                }
                placeholder="Mô tả hình ảnh"
              />
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Tags</Label>
              <Button type="button" size="sm" variant="outline" onClick={handleAddTag}>
                <Plus className="h-4 w-4 mr-1" /> Thêm tag
              </Button>
            </div>
            <div className="space-y-2">
              {(formData.tags || []).map((tag, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={tag}
                    onChange={(e) => handleTagChange(index, e.target.value)}
                    placeholder="Tag"
                  />
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={() => handleRemoveTag(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Mô tả sản phẩm</Label>
              <Button type="button" size="sm" variant="outline" onClick={handleAddDescription}>
                <Plus className="h-4 w-4 mr-1" /> Thêm mô tả
              </Button>
            </div>
            <div className="space-y-4">
              {(formData.description || []).map((desc, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Mô tả {index + 1}</Label>
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      onClick={() => handleRemoveDescription(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <Input
                    value={desc.title}
                    onChange={(e) => handleDescriptionChange(index, 'title', e.target.value)}
                    placeholder="Tiêu đề"
                  />
                  <Textarea
                    value={desc.description || ''}
                    onChange={(e) => handleDescriptionChange(index, 'description', e.target.value)}
                    placeholder="Nội dung mô tả"
                    rows={4}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Specifications */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Thông số kỹ thuật</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="weight">Trọng lượng</Label>
                <Input
                  id="weight"
                  value={formData.specifications?.weight || ''}
                  onChange={(e) => handleNestedFieldChange('specifications', 'weight', e.target.value)}
                  placeholder="VD: 50g"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="movement">Bộ máy</Label>
                <Input
                  id="movement"
                  value={formData.specifications?.movement || ''}
                  onChange={(e) => handleNestedFieldChange('specifications', 'movement', e.target.value)}
                  placeholder="VD: Automatic"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="size">Kích thước</Label>
                <Input
                  id="size"
                  value={formData.specifications?.size || ''}
                  onChange={(e) => handleNestedFieldChange('specifications', 'size', e.target.value)}
                  placeholder="VD: 40mm"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="thickness">Độ dày</Label>
                <Input
                  id="thickness"
                  value={formData.specifications?.thickness || ''}
                  onChange={(e) => handleNestedFieldChange('specifications', 'thickness', e.target.value)}
                  placeholder="VD: 12mm"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="band_variation">Loại dây</Label>
                <Input
                  id="band_variation"
                  value={formData.specifications?.band_variation || ''}
                  onChange={(e) => handleNestedFieldChange('specifications', 'band_variation', e.target.value)}
                  placeholder="VD: Dây thép"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="glass_material">Chất liệu kính</Label>
                <Input
                  id="glass_material"
                  value={formData.specifications?.glass_material || ''}
                  onChange={(e) => handleNestedFieldChange('specifications', 'glass_material', e.target.value)}
                  placeholder="VD: Sapphire"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="water_resistance_level">Chống nước</Label>
                <Input
                  id="water_resistance_level"
                  value={formData.specifications?.water_resistance_level || ''}
                  onChange={(e) =>
                    handleNestedFieldChange('specifications', 'water_resistance_level', e.target.value)
                  }
                  placeholder="VD: 100m"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dial_shape">Hình dạng mặt</Label>
                <Input
                  id="dial_shape"
                  value={formData.specifications?.dial_shape || ''}
                  onChange={(e) => handleNestedFieldChange('specifications', 'dial_shape', e.target.value)}
                  placeholder="VD: Tròn"
                />
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              onOpenChange(false);
              resetForm();
            }}
            disabled={createMutation.isPending}
          >
            Hủy
          </Button>
          <Button onClick={handleSubmit} disabled={createMutation.isPending}>
            {createMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Đang tạo...
              </>
            ) : (
              <>
                <Plus className="mr-2 h-4 w-4" />
                Tạo sản phẩm
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
