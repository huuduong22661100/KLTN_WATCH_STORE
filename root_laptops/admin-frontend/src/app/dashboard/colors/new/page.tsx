'use client';

import React, { useState } from 'react';
import { ColorForm } from '@/features/colors/components/ColorForm';
import { createColor } from '@/features/colors/api';
import { ColorPayload } from '@/features/colors/types';
import { useRouter } from 'next/navigation';

export default function AddColorPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (payload: ColorPayload) => {
    setLoading(true);
    setError(null);
    try {
      const response = await createColor(payload);
      if (response.success) {
        alert('Color created successfully!');
        router.push('/dashboard/colors'); // Redirect to color list
      } else {
        setError(response.message || 'Failed to create color');
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred during color creation.');
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Add New Color</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <ColorForm onSubmit={handleSubmit} loading={loading} />
    </div>
  );
}
