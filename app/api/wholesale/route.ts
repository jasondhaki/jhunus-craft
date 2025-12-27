import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { resend } from "@/lib/resend"; // Import your initialized Resend client

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { 
      contactName, 
      companyName, 
      email, 
      country, 
      productInterest, 
      estimatedQty, 
      message 
    } = body;

    // Validation
    if (!contactName || !companyName || !email) {
      return new NextResponse("Required fields missing", { status: 400 });
    }

    // 1. Save to Database for Admin Dashboard
    const inquiry = await prisma.wholesaleInquiry.create({
      data: {
        contactName,
        companyName,
        email,
        country,
        productInterest,
        estimatedQty: parseInt(estimatedQty),
        message,
      }
    });

    // 2. TRIGGER EMAIL NOTIFICATION TO ADMIN
    try {
      await resend.emails.send({
        from: "Jhunu's Craft <onboarding@resend.dev>",
        to: "your-email@gmail.com", // 👈 REPLACE with your real email
        subject: `🏢 New Wholesale Lead: ${companyName}`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; border: 1px solid #e5e5e5; border-radius: 10px; max-width: 600px;">
            <h2 style="color: #1c1917; border-bottom: 2px solid #1c1917; padding-bottom: 10px;">New B2B Inquiry</h2>
            <p>You have received a new wholesale lead for <strong>Jhunu's Craft</strong>.</p>
            
            <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Company:</strong></td>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${companyName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Contact:</strong></td>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${contactName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Email:</strong></td>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${email}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Interest:</strong></td>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${productInterest}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Est. Qty:</strong></td>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${estimatedQty}</td>
              </tr>
            </table>

            <div style="margin-top: 20px; padding: 15px; background-color: #f9f8f7; border-radius: 5px;">
              <p style="margin: 0; font-size: 14px; color: #444;"><strong>Message:</strong></p>
              <p style="margin-top: 5px; font-size: 14px;">${message || "No message provided."}</p>
            </div>

            <div style="margin-top: 20px; text-align: center;">
              <a href="mailto:${email}" 
                 style="background-color: #1c1917; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-size: 14px; font-weight: bold;">
                 Reply to Customer
              </a>
            </div>
          </div>
        `
      });
    } catch (emailError) {
      // Log the error but ensure the database transaction still "counts" as a success for the user
      console.log("[WHOLESALE_EMAIL_ERROR]", emailError);
    }

    return NextResponse.json(inquiry);
  } catch (error) {
    console.log("[WHOLESALE_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}