import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// 1. GET - Fetch a single product to pre-fill the edit form
export async function GET(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const { productId } = await params; // Await params for Next.js 15+

    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: { category: true } // Include category to pre-fill that field
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// 2. PATCH - Update the product
export async function PATCH(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const { productId } = await params;
    const body = await req.json();
    const { name, price, description, image, category } = body;

    // Handle slug update if name changes (optional, but good practice)
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

// 3. DELETE - Remove the product (You already had this)
export async function DELETE(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const { productId } = await params;
    const product = await prisma.product.delete({
      where: { id: productId }
    });
    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}