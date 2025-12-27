import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, subject, message } = body;

    // 1. Log to server console so you can debug
    console.log("Attempting to send email...");
    
    if (!process.env.RESEND_API_KEY) {
      console.error("CRITICAL ERROR: RESEND_API_KEY is missing in .env");
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    if (!firstName || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 2. Destructure data AND error from the response
    const { data, error } = await resend.emails.send({
      from: 'Jhunu\'s Craft <onboarding@resend.dev>',
      to: ['jasondhaki05@gmail.com'], 
      replyTo: email,
      subject: `[${subject}] New Inquiry from ${firstName} ${lastName}`,
      html: `
        <div>
          <h1>New Contact Form Submission</h1>
          <p><strong>Name:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <hr />
          <h3>Message:</h3>
          <p>${message}</p>
        </div>
      `,
    });

    // 3. ACTUAL ERROR CHECKING
    if (error) {
      console.error("Resend API Error:", error); // <--- This will show you exactly why it failed
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    console.log("Email sent successfully:", data);
    return NextResponse.json(data);

  } catch (error) {
    console.error("Unexpected Server Error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}