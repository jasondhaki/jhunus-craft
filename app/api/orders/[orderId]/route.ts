import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ orderId: string }> }
) {
  try {
    const { orderId } = await params;
    const body = await req.json();
    const { status, isPaid } = body;

    const order = await prisma.order.update({
      where: { id: orderId },
      data: { 
        status: status,
        isPaid: isPaid 
      }
    });

    return NextResponse.json(order);
  } catch (error) {
    console.log("[ORDER_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ orderId: string }> }
) {
  try {
    const { orderId } = await params;

    // First, delete the line items associated with this order
    await prisma.orderItem.deleteMany({
      where: { orderId: orderId }
    });

    // Then, delete the order itself
    const order = await prisma.order.delete({
      where: { id: orderId }
    });

    return NextResponse.json(order);
  } catch (error) {
    console.log("[ORDER_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}