import Stripe from "stripe";
import { NextResponse } from "next/server";
import { db } from "@/lib/firebase-admin"; // مهم (admin SDK)

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature")!;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    return NextResponse.json({ error: "Webhook Error" }, { status: 400 });
  }

  // 🎯 عند نجاح الدفع
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as any;

    const bookingId = session.metadata?.bookingId;

    if (bookingId) {
      await db.collection("bookings").doc(bookingId).update({
        status: "paid",
      });
    }
  }

  return NextResponse.json({ received: true });
}