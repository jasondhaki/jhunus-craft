import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// POST /api/orders
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { productIds, address, phone } = body;

    if (!productIds || productIds.length === 0) {
      return new NextResponse("Product IDs are required", { status: 400 });
    }

    // 1. Fetch real products from DB
    const products = await prisma.product.findMany({
      where: {
        id: { in: productIds }
      }
    });

    // 2. Calculate Total (Server-side calculation)
    const totalAmount = productIds.reduce((sum: number, id: string) => {
      // 👇 THIS WAS THE MISSING LINE 👇
      const product = products.find((p) => p.id === id);
      // 👆 YOU NEED TO FIND IT BEFORE YOU CAN USE IT 👆
      return sum + (product ? Number(product.price) : 0);
    }, 0);

    // 3. Create the Order in Database
    const order = await prisma.order.create({
      data: {
        isPaid: false, 
        status: "PENDING",
        address: address || "No address provided",
        phone: phone || "No phone provided",
        totalAmount: totalAmount,
        orderItems: {
          create: productIds.map((id: string) => ({
            product: { connect: { id: id } },
            quantity: 1, 
            price: products.find((p) => p.id === id)?.price || 0
          }))
        }
      }
    });

    return NextResponse.json(order);
  } catch (error) {
    console.log("[ORDERS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}