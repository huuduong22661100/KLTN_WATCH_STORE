import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Products</CardTitle>
            <CardDescription>Number of products in the store.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">1,234</p>
            {/* TODO: Fetch real data */}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Orders</CardTitle>
            <CardDescription>Number of orders received.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">567</p>
            {/* TODO: Fetch real data */}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Pending Orders</CardTitle>
            <CardDescription>Orders needing processing.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">89</p>
            {/* TODO: Fetch real data */}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Users</CardTitle>
            <CardDescription>Number of registered users.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">3,456</p>
            {/* TODO: Fetch real data */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
