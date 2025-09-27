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
import { NewsArticle, NewsPayload } from '../types';

const formSchema = z.object({
  title: z.string().min(5, { message: 'Title must be at least 5 characters.' }),
  slug: z.string().min(5, { message: 'Slug must be at least 5 characters.' }),
  content: z.string().min(20, { message: 'Content must be at least 20 characters.' }),
  thumbnail_img: z.string().url({ message: 'Thumbnail image must be a valid URL.' }),
});

interface NewsFormProps {
  initialData?: NewsArticle; // For editing existing articles
  onSubmit: (data: NewsPayload) => void;
  loading?: boolean;
}

export const NewsForm: React.FC<NewsFormProps> = ({ initialData, onSubmit, loading }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData ? {
      title: initialData.title,
      slug: initialData.slug,
      content: initialData.content,
      thumbnail_img: initialData.thumbnail_img,
    } : {
      title: '',
      slug: '',
      content: '',
      thumbnail_img: '',
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset({
        title: initialData.title,
        slug: initialData.slug,
        content: initialData.content,
        thumbnail_img: initialData.thumbnail_img,
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
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter news title" {...field} />
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
                <Input placeholder="enter-news-slug" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter news content" {...field} rows={10} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="thumbnail_img"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Thumbnail Image URL</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/thumbnail.jpg" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Save News Article'}
        </Button>
      </form>
    </Form>
  );
};
