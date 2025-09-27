'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/shared/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/components/ui/form';
import { Input } from '@/shared/components/ui/input';
import { Textarea } from '@/shared/components/ui/textarea';
import { Product, ProductPayload } from '../types';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Product name must be at least 2 characters.' }),
  title: z.string().min(2, { message: 'Product title must be at least 2 characters.' }),
  price: z.coerce.number().min(0, { message: 'Price must be a positive number.' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters.' }),
  mainImg: z.string().url({ message: 'Main image must be a valid URL.' }),
  // For simplicity, sliderImg, specifications, faqs, etc., will be handled as JSON strings or separate components later
  sku: z.string().optional(),
  part_number: z.string().optional(),
  series: z.string().optional(),
  brand_id: z.string().min(1, { message: 'Brand is required.' }),
  color_id: z.string().min(1, { message: 'Color is required.' }),
  category_id: z.array(z.string()).min(1, { message: 'At least one category is required.' }),
});

interface ProductFormProps {
  initialData?: Product; // For editing existing products
  onSubmit: (data: ProductPayload) => void;
  loading?: boolean;
}

export const ProductForm: React.FC<ProductFormProps> = ({ initialData, onSubmit, loading }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData ? {
      name: initialData.name,
      title: initialData.title,
      price: initialData.price,
      description: initialData.description,
      mainImg: initialData.images.mainImg,
      sku: initialData.sku,
      part_number: initialData.part_number,
      series: initialData.series,
      brand_id: initialData.brand_id,
      color_id: initialData.color_id,
      category_id: initialData.category_id,
    } : {
      name: '',
      title: '',
      price: 0,
      description: '',
      mainImg: '',
      sku: '',
      part_number: '',
      series: '',
      brand_id: '',
      color_id: '',
      category_id: [],
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset({
        name: initialData.name,
        title: initialData.title,
        price: initialData.price,
        description: initialData.description,
        mainImg: initialData.images.mainImg,
        sku: initialData.sku,
        part_number: initialData.part_number,
        series: initialData.series,
        brand_id: initialData.brand_id,
        color_id: initialData.color_id,
        category_id: initialData.category_id,
      });
    }
  }, [initialData, form]);

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    // Transform form values to ProductPayload structure
    const payload: ProductPayload = {
      ...values,
      sliderImg: initialData?.images.sliderImg || [], // Keep existing or empty
      specifications: initialData?.specifications || {}, // Keep existing or empty
      faqs: initialData?.faqs || [], // Keep existing or empty
    };
    onSubmit(payload);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter product name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter product title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input type="number" placeholder="0" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter product description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="mainImg"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Main Image URL</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/image.jpg" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* TODO: Add fields for brand, color, category (e.g., using Select components) */}
        {/* For now, using simple input for brand_id, color_id, category_id */}
        <FormField
          control={form.control}
          name="brand_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Brand ID</FormLabel>
              <FormControl>
                <Input placeholder="Enter brand ID" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="color_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Color ID</FormLabel>
              <FormControl>
                <Input placeholder="Enter color ID" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category IDs (comma-separated)</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter category IDs"
                  value={field.value.join(',')}
                  onChange={(e) => field.onChange(e.target.value.split(',').map(s => s.trim()))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sku"
          render={({ field }) => (
            <FormItem>
              <FormLabel>SKU</FormLabel>
              <FormControl>
                <Input placeholder="Enter SKU" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="part_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Part Number</FormLabel>
              <FormControl>
                <Input placeholder="Enter part number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="series"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Series</FormLabel>
              <FormControl>
                <Input placeholder="Enter series" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Save Product'}
        </Button>
      </form>
    </Form>
  );
};
