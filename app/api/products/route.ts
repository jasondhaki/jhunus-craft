import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    // 1. Parse the incoming JSON body
    const body = await req.json();
    const { name, price, description, image, category } = body;

    // 2. Validate essential data (Brutal Truth: If these are missing, we shouldn't proceed)
    if (!name || !price || !image) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    // 3. Generate the Slug automatically from the name
    // Example: "Jute Handbag" -> "jute-handbag"
    const slug = name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');

    // 4. Create the product in the database
    const product = await prisma.product.create({
      data: {
        name,
        price: Number(price),
        description,
        images: [image],
        slug: slug,
        // THIS IS THE FIX:
        category: {
          connectOrCreate: {
            where: { name: category }, // Look for a category with this name
            create: { name: category, slug: category.toLowerCase() }, // If not found, create it
          },
        },
      },
    });

    return NextResponse.json(product);

  } catch (error) {
    console.log("[PRODUCTS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}