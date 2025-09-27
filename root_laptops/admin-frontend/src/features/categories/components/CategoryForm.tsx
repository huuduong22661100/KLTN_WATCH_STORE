'use client';

import React, { useEffect, useState } from 'react';
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
import { Category, CategoryPayload } from '../types';
import { fetchCategories } from '../api'; // To populate parent category dropdown

const formSchema = z.object({
  name: z.string().min(2, { message: 'Category name must be at least 2 characters.' }),
  parent_id: z.string().nullable().optional(), // Allow null for top-level categories
});

interface CategoryFormProps {
  initialData?: Category; // For editing existing categories
  onSubmit: (data: CategoryPayload) => void;
  loading?: boolean;
}

export const CategoryForm: React.FC<CategoryFormProps> = ({ initialData, onSubmit, loading }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData ? {
      name: initialData.name,
      parent_id: typeof initialData.parent_id === 'object' && initialData.parent_id !== null
        ? initialData.parent_id._id
        : initialData.parent_id || null,
    } : {
      name: '',
      parent_id: null,
    },
  });

  const [parentCategories, setParentCategories] = useState<Category[]>([]);
  const [fetchingParents, setFetchingParents] = useState(true);

  useEffect(() => {
    const loadParentCategories = async () => {
      try {
        const response = await fetchCategories();
        if (response.success && response.data) {
          // Filter out the current category from its own parent options
          const filteredCategories = response.data.filter(cat => cat._id !== initialData?._id);
          setParentCategories(filteredCategories);
        }
      } catch (err) {
        console.error('Failed to fetch parent categories:', err);
      } finally {
        setFetchingParents(false);
      }
    };
    loadParentCategories();
  }, [initialData?._id]);


  useEffect(() => {
    if (initialData) {
      form.reset({
        name: initialData.name,
        parent_id: typeof initialData.parent_id === 'object' && initialData.parent_id !== null
          ? initialData.parent_id._id
          : initialData.parent_id || null,
      });
    }
  }, [initialData, form]);

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter category name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="parent_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Parent Category</FormLabel>
              <FormControl>
                {/* For now, a simple input. Later, this should be a Select component */}
                <Input
                  placeholder="Enter parent category ID (optional)"
                  value={field.value || ''}
                  onChange={(e) => field.onChange(e.target.value || null)}
                  disabled={fetchingParents}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={loading || fetchingParents}>
          {loading ? 'Saving...' : 'Save Category'}
        </Button>
      </form>
    </Form>
  );
};
