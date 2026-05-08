import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const { tutor, bookingId } = await req.json();

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",

    line_items: [
      {
        price_data: {
          currency: "egp",
          product_data: {
            name: tutor.name,
          },
          unit_amount: tutor.price * 100,
        },
        quantity: 1,
      },
    ],

    success_url: `${process.env.NEXT_PUBLIC_URL}/dashboard`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/book/${tutor.id}`,

    metadata: {
      bookingId,
    },
  });

  return NextResponse.json({ url: session.url });
}