'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import React from 'react';

export default function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
    } else if (user && user.role !== 'admin') {
      // If logged in but not an admin, redirect to login with an error
      router.push('/login?error=unauthorized');
    }
  }, [isLoggedIn, user, router]);

  if (!isLoggedIn || (user && user.role !== 'admin')) {
    // Optionally render a loading spinner or null while redirecting
    return null;
  }

  return <>{children}</>;
}
