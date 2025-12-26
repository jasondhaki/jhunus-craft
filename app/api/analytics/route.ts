import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // 1. Fetch all paid/delivered orders for revenue
    const orders = await prisma.order.findMany({
      where: {
        NOT: { status: "CANCELLED" }
      },
      include: {
        orderItems: true
      }
    });

    const totalRevenue = orders.reduce((acc, order) => acc + Number(order.totalAmount), 0);
    const salesCount = orders.length;

    // 2. Fetch stock levels
    const products = await prisma.product.findMany({
      select: { name: true, stock: true }
    });

    const lowStockProducts = products.filter(p => p.stock < 5);

    return NextResponse.json({
      totalRevenue,
      salesCount,
      inventoryCount: products.length,
      lowStockCount: lowStockProducts.length,
      products // For a stock list
    });
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}