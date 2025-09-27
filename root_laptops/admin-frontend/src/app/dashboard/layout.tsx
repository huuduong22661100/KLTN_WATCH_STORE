import React from 'react';
import PrivateRoute from '@/shared/components/PrivateRoute'; // Import PrivateRoute

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PrivateRoute> {/* Wrap the entire layout with PrivateRoute */}
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-800 text-white p-4">
          <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
          <nav>
            <ul>
              {/* TODO: Add navigation links here */}
              <li className="mb-2"><a href="/dashboard" className="hover:text-gray-300">Dashboard</a></li>
              <li className="mb-2"><a href="/dashboard/products" className="hover:text-gray-300">Products</a></li>
              <li className="mb-2"><a href="/dashboard/orders" className="hover:text-gray-300">Orders</a></li>
              <li className="mb-2"><a href="/dashboard/categories" className="hover:text-gray-300">Categories</a></li>
              <li className="mb-2"><a href="/dashboard/colors" className="hover:text-gray-300">Colors</a></li>
              <li className="mb-2"><a href="/dashboard/news" className="hover:text-gray-300">News</a></li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </PrivateRoute>
  );
}
