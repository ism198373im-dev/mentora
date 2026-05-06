import Stripe from "stripe";
import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { addDoc, collection } from "firebase/firestore";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: Request) {
  const body = await req.text();

  let event;

  try {
    event = JSON.parse(body);
  } catch (err) {
    return NextResponse.json({ error: "Invalid webhook" });
  }

  // 💳 لما الدفع ينجح
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const meta = session.metadata;

    await addDoc(collection(db, "bookings"), {
      teacherId: meta.teacherId,
      teacherName: meta.teacherName,
      subject: meta.subject,
      price: meta.price,
      studentName: "Paid Student",
      paid: true,
      createdAt: new Date(),
    });
  }

  return NextResponse.json({ received: true });
}