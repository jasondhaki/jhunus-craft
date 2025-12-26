"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import axios from "axios";
import toast from "react-hot-toast";
import { Loader2, Trash } from "lucide-react";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("/api/orders/all");
      setOrders(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Could not fetch orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const onStatusUpdate = async (orderId: string, newStatus: string) => {
    try {
      await axios.patch(`/api/orders/${orderId}`, { 
        status: newStatus,
        isPaid: newStatus === "DELIVERED" || newStatus === "PAID" 
      });
      toast.success("Order status updated");
      fetchOrders(); 
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const onDelete = async (id: string) => {
    // Safety check so you don't accidentally delete a real order
    if (!confirm("Are you sure you want to delete this order? This cannot be undone.")) return;
    
    try {
      await axios.delete(`/api/orders/${id}`);
      toast.success("Order deleted");
      fetchOrders(); 
    } catch (error) {
      toast.error("Something went wrong while deleting.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-10 w-10 animate-spin text-stone-500" />
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-stone-900">Order Management</h1>
      
      <div className="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead className="bg-stone-50 border-b border-stone-200">
            <tr className="text-stone-500 text-xs tracking-wider">
              <th className="p-4 font-semibold uppercase">Date</th>
              <th className="p-4 font-semibold uppercase">Customer</th>
              <th className="p-4 font-semibold uppercase">Items</th>
              <th className="p-4 font-semibold uppercase">Total</th>
              <th className="p-4 font-semibold uppercase">Status Control</th>
              <th className="p-4 font-semibold uppercase text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-stone-50/50 transition-colors">
                <td className="p-4 text-sm text-stone-600">
                  {format(new Date(order.createdAt), "MMM do, p")}
                </td>
                <td className="p-4">
                  <p className="font-bold text-stone-900">{order.phone}</p>
                  <p className="text-xs text-stone-500 line-clamp-1">{order.address}</p>
                </td>
                <td className="p-4">
                  <div className="flex flex-wrap gap-1">
                    {order.orderItems.map((item: any, idx: number) => (
                      <span key={idx} className="bg-stone-100 text-stone-700 text-[10px] px-2 py-0.5 rounded border border-stone-200">
                        {item.product.name}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="p-4 font-bold text-stone-900">
                  ${Number(order.totalAmount).toFixed(2)}
                </td>
                <td className="p-4">
                  <select 
                    value={order.status}
                    onChange={(e) => onStatusUpdate(order.id, e.target.value)}
                    className={`text-xs font-bold p-2 rounded-md border border-transparent cursor-pointer transition-all focus:ring-2 focus:ring-stone-900 ${
                      order.status === 'PENDING' ? 'bg-amber-100 text-amber-700' : 
                      order.status === 'DELIVERED' ? 'bg-emerald-100 text-emerald-700' : 
                      order.status === 'CANCELLED' ? 'bg-red-100 text-red-700' : 'bg-stone-100 text-stone-700'
                    }`}
                  >
                    <option value="PENDING">PENDING</option>
                    <option value="PAID">PAID</option>
                    <option value="SHIPPED">SHIPPED</option>
                    <option value="DELIVERED">DELIVERED</option>
                    <option value="CANCELLED">CANCELLED</option>
                  </select>
                </td>
                <td className="p-4 text-right">
                  <button 
                    onClick={() => onDelete(order.id)}
                    className="p-2 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all"
                    title="Delete Order"
                  >
                    <Trash className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {orders.length === 0 && (
          <div className="p-20 text-center">
            <p className="text-stone-400 font-medium">No orders found in the database.</p>
          </div>
        )}
      </div>
    </div>
  );
}