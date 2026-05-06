import Stripe from "stripe";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { db } from "@/lib/firebase";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { Resend } from "resend";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2026-04-22.dahlia",
});

const resend = new Resend(process.env.RESEND_API_KEY as string);

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

export async function POST(req: Request) {
  const body = await req.text();
  const sig = headers().get("stripe-signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err: any) {
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    );
  }

  if (event.type === "checkout.session.completed") {
    const session: any = event.data.object;

    const email = session.customer_email;
    const userId = session.client_reference_id;
    const tutorName = session.metadata?.tutorName;
    const subject = session.metadata?.subject;
    const price = session.amount_total / 100;

    await addDoc(collection(db, "bookings"), {
      userId,
      userEmail: email,
      name: tutorName,
      subject,
      price,
      createdAt: new Date().toISOString(),
    });

    if (userId) {
      await setDoc(
        doc(db, "users", userId),
        { plan: "pro" },
        { merge: true }
      );
    }

    await resend.emails.send({
      from: "Mentora <onboarding@resend.dev>",
      to: email,
      subject: "Payment Successful 🎉",
      html: `
        <div>
          <h2>Mentora Booking Confirmed</h2>
          <p>Teacher: ${tutorName}</p>
          <p>Subject: ${subject}</p>
          <p>Price: ${price} EGP</p>
        </div>
      `,
    });
  }

  return NextResponse.json({ received: true });
}