"use client";

import { useParams } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export default function Book() {
  const { id } = useParams();

  const book = async () => {
    const user = auth.currentUser;
    if (!user) return;

    await addDoc(collection(db, "bookings"), {
      teacherId: id,
      userId: user.uid,
      email: user.email,
      status: "pending",
      createdAt: serverTimestamp(),
    });

    alert("Booked!");
  };

  const pay = async () => {
    const res = await fetch("/api/create-checkout-session", {
      method: "POST",
      body: JSON.stringify({
        teacherName: "Teacher",
        price: 100,
      }),
    });

    const data = await res.json();
    window.location.href = data.url;
  };

  return (
    <div className="p-6">
      <button onClick={book} className="bg-green-600 text-white px-4 py-2 mr-2">
        Book
      </button>

      <button onClick={pay} className="bg-purple-600 text-white px-4 py-2">
        Pay
      </button>
    </div>
  );
}