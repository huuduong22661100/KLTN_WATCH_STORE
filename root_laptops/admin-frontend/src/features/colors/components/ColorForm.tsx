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
import { Color, ColorPayload } from '../types';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Color name must be at least 2 characters.' }),
  hex: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, { message: 'Hex code must be a valid format (e.g., #RRGGBB or #RGB).' }),
  slug: z.string().min(2, { message: 'Slug must be at least 2 characters.' }),
});

interface ColorFormProps {
  initialData?: Color; // For editing existing colors
  onSubmit: (data: ColorPayload) => void;
  loading?: boolean;
}

export const ColorForm: React.FC<ColorFormProps> = ({ initialData, onSubmit, loading }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData ? {
      name: initialData.name,
      hex: initialData.hex,
      slug: initialData.slug,
    } : {
      name: '',
      hex: '#FFFFFF',
      slug: '',
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset({
        name: initialData.name,
        hex: initialData.hex,
        slug: initialData.slug,
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
              <FormLabel>Color Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter color name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="hex"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hex Code</FormLabel>
              <FormControl>
                <Input placeholder="#RRGGBB" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <Input placeholder="enter-color-slug" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Save Color'}
        </Button>
      </form>
    </Form>
  );
};
