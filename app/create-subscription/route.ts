import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2026-04-22.dahlia",
});

export async function POST(req: Request) {
  try {
    const { user } = await req.json();

    if (!user) {
      return NextResponse.json(
        { error: "Missing user" },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      customer_email: user.email,
      client_reference_id: user.uid,

      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID as string,
          quantity: 1,
        },
      ],

      success_url: `${process.env.NEXT_PUBLIC_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.log("Stripe error:", error);

    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}