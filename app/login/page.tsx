"use client";

import { useParams } from "next/navigation";
import { tutors } from "@/data/tutors";
import { useState, useEffect } from "react";
import { auth, db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default function BookPage() {
  const { id } = useParams();
  const tutor = tutors.find((t) => t.id === Number(id));

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });

    return () => unsub();
  }, []);

  if (!tutor) {
    return <div className="p-10 text-center">Tutor not found</div>;
  }

  if (!user) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-xl font-bold">Login first 🔐</h1>
      </div>
    );
  }

  const handlePay = async () => {
    setLoading(true);

    try {
      await addDoc(collection(db, "bookings"), {
        tutorId: tutor.id,
        tutorName: tutor.name,
        subject: tutor.subject,
        price: tutor.price,
        userId: user.uid,
        userEmail: user.email,
        createdAt: new Date(),
      });

      alert("Booking saved 🎉");

      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tutor, userId: user.uid, userEmail: user.email }),
      });

      const data = await res.json();

      if (data.url) window.location.href = data.url;
    } catch (e) {
      alert("Error ❌");
    }

    setLoading(false);
  };

  return (
    <div className="p-10 text-center">

      <h1 className="text-4xl font-bold text-blue-600 mb-6">
        📅 Book Session
      </h1>

      <div className="bg-white shadow p-6 rounded-xl max-w-md mx-auto">

        <h2 className="text-2xl font-bold mb-2">{tutor.name}</h2>
        <p>{tutor.subject}</p>
        <p>{tutor.price} EGP</p>

        <button
          onClick={handlePay}
          disabled={loading}
          className="w-full mt-4 bg-green-600 text-white py-3 rounded"
        >
          {loading ? "Processing..." : "Book Now 💳"}
        </button>

      </div>
    </div>
  );
}