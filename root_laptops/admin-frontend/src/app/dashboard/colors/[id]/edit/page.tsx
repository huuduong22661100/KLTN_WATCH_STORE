'use client';

import React, { useEffect, useState } from 'react';
import { ColorForm } from '@/features/colors/components/ColorForm';
import { fetchColorById, updateColor } from '@/features/colors/api';
import { Color, ColorPayload } from '@/features/colors/types';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';

export default function EditColorPage() {
  const [color, setColor] = useState<Color | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const params = useParams();
  const colorId = params.id as string;

  useEffect(() => {
    const loadColor = async () => {
      if (!colorId) return;
      setLoading(true);
      setError(null);
      try {
        const response = await fetchColorById(colorId);
        if (response.success && response.data) {
          setColor(response.data);
        } else {
          setError(response.message || 'Failed to fetch color details.');
        }
      } catch (err: any) {
        setError(err.message || 'An unexpected error occurred while fetching color.');
      }
    };

    loadColor();
  }, [colorId]);

  const handleSubmit = async (payload: ColorPayload) => {
    if (!colorId) return;
    setSubmitting(true);
    setError(null);
    try {
      const response = await updateColor(colorId, payload);
      if (response.success) {
        alert('Color updated successfully!');
        router.push('/dashboard/colors'); // Redirect to color list
      } else {
        setError(response.message || 'Failed to update color');
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred during color update.');
    }
  };

  if (loading) return <p>Loading color details...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!color) return <p>Color not found.</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Edit Color</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <ColorForm initialData={color} onSubmit={handleSubmit} loading={submitting} />
    </div>
  );
}
