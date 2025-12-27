import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { resend } from "@/lib/resend"; // Correctly imported

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
      const product = products.find((p) => p.id === id);
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

    // 4. TRIGGER EMAIL NOTIFICATION
    // We send this to YOU so you know a sale happened
    try {
      await resend.emails.send({
        from: "Jhunu's Craft <onboarding@resend.dev>",
        to: "your-email@gmail.com", // 👈 REPLACE with your real email
        subject: `🛍️ New Order: $${totalAmount.toFixed(2)}`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; border: 1px solid #e5e5e5; border-radius: 10px;">
            <h2 style="color: #1c1917;">New Order Alert!</h2>
            <p>A new order has been placed on <strong>Jhunu's Craft</strong>.</p>
            <hr style="border: 0; border-top: 1px solid #eee;" />
            <p><strong>Total Amount:</strong> $${totalAmount.toFixed(2)}</p>
            <p><strong>Customer Phone:</strong> ${phone}</p>
            <p><strong>Delivery Address:</strong> ${address}</p>
            <div style="margin-top: 20px;">
              <a href="${process.env.NEXT_PUBLIC_APP_URL}/admin/orders" 
                 style="background-color: #1c1917; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-size: 14px;">
                 View in Admin Panel
              </a>
            </div>
          </div>
        `
      });
    } catch (emailError) {
      // We log the email error but don't stop the order success response
      console.log("[ORDER_EMAIL_ERROR]", emailError);
    }

    return NextResponse.json(order);
  } catch (error) {
    console.log("[ORDERS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}