'use client';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Zustand persist tự động hydrate từ localStorage

  return <>{children}</>;
}