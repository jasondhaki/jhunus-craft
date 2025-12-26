import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { startOfMonth, endOfMonth, eachDayOfInterval, format, startOfDay } from "date-fns";

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      where: { NOT: { status: "CANCELLED" } }
    });

    const products = await prisma.product.findMany();

    // Grouping revenue by day for the graph
    const salesByDay: { [key: string]: number } = {};
    orders.forEach((order) => {
      const day = format(new Date(order.createdAt), "MMM dd");
      salesByDay[day] = (salesByDay[day] || 0) + parseFloat(order.totalAmount.toString());
    });

    // Convert to array format Recharts likes
    const graphData = Object.keys(salesByDay).map(day => ({
      name: day,
      total: salesByDay[day]
    }));

    return NextResponse.json({
      totalRevenue: orders.reduce((acc, o) => acc + parseFloat(o.totalAmount.toString()), 0),
      salesCount: orders.length,
      inventoryCount: products.length,
      lowStockCount: products.filter(p => p.stock < 5).length,
      products: products.map(p => ({ name: p.name, stock: p.stock })),
      graphData // New data for the chart!
    });
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}