import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY as string);

export async function POST(req: Request) {
  try {
    const { email, subject, message } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    await resend.emails.send({
      from: "Mentora <onboarding@resend.dev>",
      to: email,
      subject: subject || "Mentora Notification 🚀",
      html: `
        <div style="font-family: Arial;">
          <h2>📖 Mentora</h2>
          <p>${message}</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Email failed" },
      { status: 500 }
    );
  }
}