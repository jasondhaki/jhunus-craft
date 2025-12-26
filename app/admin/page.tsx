"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { 
  DollarSign, 
  Package, 
  ShoppingCart, 
  AlertTriangle,
  Loader2 
} from "lucide-react";
// 1. New Imports for the Graph
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function AdminDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/api/analytics")
      .then(res => setData(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Loader2 className="h-10 w-10 animate-spin text-stone-500" />
    </div>
  );

  const stats = [
    {
      label: "Total Revenue",
      value: `$${data?.totalRevenue.toFixed(2)}`,
      icon: DollarSign,
      color: "text-emerald-600",
      bg: "bg-emerald-50"
    },
    {
      label: "Orders Processed",
      value: data?.salesCount,
      icon: ShoppingCart,
      color: "text-blue-600",
      bg: "bg-blue-50"
    },
    {
      label: "Active Products",
      value: data?.inventoryCount,
      icon: Package,
      color: "text-stone-600",
      bg: "bg-stone-50"
    },
    {
      label: "Low Stock Items",
      value: data?.lowStockCount,
      icon: AlertTriangle,
      color: "text-amber-600",
      bg: "bg-amber-50"
    }
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-stone-900 font-serif">Business Overview</h1>

      {/* STAT CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm transition-all hover:shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg ${stat.bg}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-stone-500">{stat.label}</p>
              <h3 className="text-2xl font-bold text-stone-900">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* 2. REVENUE GRAPH SECTION */}
      <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold mb-6 text-stone-900">Revenue Performance</h2>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data?.graphData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f5" />
              <XAxis 
                dataKey="name" 
                stroke="#a8a29e" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false} 
                dy={10}
              />
              <YAxis 
                stroke="#a8a29e" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false} 
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip 
                cursor={{fill: '#f5f5f5'}}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
              />
              <Bar dataKey="total" fill="#1c1917" radius={[4, 4, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* STOCK WATCHLIST */}
      <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-bold mb-4 text-stone-900">Inventory Health</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data?.products.map((product: any, idx: number) => (
            <div key={idx} className="flex items-center justify-between p-4 rounded-lg bg-stone-50/50 border border-stone-100">
              <span className="text-sm font-medium text-stone-700">{product.name}</span>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                product.stock < 5 ? "bg-red-100 text-red-700" : "bg-stone-200 text-stone-600"
              }`}>
                {product.stock} in stock
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}