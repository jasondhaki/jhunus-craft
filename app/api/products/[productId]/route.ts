import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// 1. GET
export async function GET(
  req: Request,
  // FIX: Type 'params' as a Promise
  { params }: { params: Promise<{ productId: string }> }
) {
  try {
    const { productId } = await params; // Await it correctly

    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: { category: true }
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// 2. PATCH
export async function PATCH(
  req: Request,
  // FIX: Type 'params' as a Promise
  { params }: { params: Promise<{ productId: string }> }
) {
  try {
    const { productId } = await params; // Await it correctly
    const body = await req.json();
    const { name, price, description, image, category } = body;

    const slug = name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');

    const product = await prisma.product.update({
      where: { id: productId },
      data: {
        name,
        price: Number(price),
        description,
        images: [image],
        slug, 
        category: {
            connectOrCreate: {
              where: { name: category }, 
              create: { name: category, slug: category.toLowerCase() },
            },
        },
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// 3. DELETE
export async function DELETE(
  req: Request,
  // FIX: Type 'params' as a Promise
  { params }: { params: Promise<{ productId: string }> }
) {
  try {
    const { productId } = await params; // Await it correctly
    const product = await prisma.product.delete({
      where: { id: productId }
    });
    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}