import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2026-04-22.dahlia",
});

export async function POST(req: Request) {
  try {
    const { tutor, user } = await req.json();

    if (!tutor || !user) {
      return NextResponse.json(
        { error: "Missing tutor or user data" },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",

      customer_email: user.email,

      client_reference_id: user.uid,

      metadata: {
        tutorName: tutor.name,
        subject: tutor.subject,
        price: String(tutor.price),
      },

      line_items: [
        {
          price_data: {
            currency: "egp",
            product_data: {
              name: tutor.name,
              description: tutor.subject,
            },
            unit_amount: tutor.price * 100,
          },
          quantity: 1,
        },
      ],

      success_url: `${process.env.NEXT_PUBLIC_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.log("Stripe Error:", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}