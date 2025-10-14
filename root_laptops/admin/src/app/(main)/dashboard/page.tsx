'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { DollarSign, Package, ShoppingCart, Users } from "lucide-react";

const cardData = [
  { title: "Total Revenue", icon: DollarSign, value: "$45,231.89", description: "+20.1% from last month" },
  { title: "Subscriptions", icon: Users, value: "+2350", description: "+180.1% from last month" },
  { title: "Sales", icon: ShoppingCart, value: "+12,234", description: "+19% from last month" },
  { title: "Active Now", icon: Package, value: "+573", description: "+201 since last hour" },
];

export default function DashboardPage() {
  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
      {cardData.map((card, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
            <card.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{card.value}</div>
            <p className="text-xs text-muted-foreground">{card.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
