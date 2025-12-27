import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { format } from "date-fns";

export async function GET() {
  try {
    // 1. Fetch orders (excluding cancelled) for the Revenue Card and Graph
    const orders = await prisma.order.findMany({
      where: { NOT: { status: "CANCELLED" } }
    });

    // 2. Fetch products for Inventory Health
    const products = await prisma.product.findMany();

    // 3. NEW: Fetch the 5 most recent wholesale leads
    const recentInquiries = await prisma.wholesaleInquiry.findMany({
      take: 5,
      orderBy: {
        createdAt: 'desc'
      }
    });

    // 4. Grouping revenue by day for the graph
    const salesByDay: { [key: string]: number } = {};
    orders.forEach((order) => {
      const day = format(new Date(order.createdAt), "MMM dd");
      salesByDay[day] = (salesByDay[day] || 0) + parseFloat(order.totalAmount.toString());
    });

    // Convert to array format for Recharts
    const graphData = Object.keys(salesByDay).map(day => ({
      name: day,
      total: salesByDay[day]
    }));

    // 5. Return everything in one JSON response
    return NextResponse.json({
      totalRevenue: orders.reduce((acc, o) => acc + parseFloat(o.totalAmount.toString()), 0),
      salesCount: orders.length,
      inventoryCount: products.length,
      lowStockCount: products.filter(p => p.stock < 5).length,
      products: products.map(p => ({ name: p.name, stock: p.stock })),
      graphData,
      recentInquiries // Sent to the dashboard
    });
  } catch (error) {
    console.error("ANALYTICS_GET_ERROR", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}