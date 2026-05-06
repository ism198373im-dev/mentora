"use client";

import { useParams } from "next/navigation";
import { tutors } from "@/data/tutors";
import { useState } from "react";

export default function BookPage() {
  const { id } = useParams();
  const tutor = tutors.find((t) => t.id === Number(id));

  const [loading, setLoading] = useState(false);

  if (!tutor) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-xl">Tutor not found</h1>
      </div>
    );
  }

  const handlePay = async () => {
    setLoading(true);

    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tutor }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Payment error ❌");
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong ❌");
    }

    setLoading(false);
  };

  return (
    <div className="p-10 text-center">

      <h1 className="text-4xl font-bold text-blue-600 mb-6">
        📅 Book Session
      </h1>

      <div className="bg-white shadow p-6 rounded-xl max-w-md mx-auto">

        <h2 className="text-2xl font-bold mb-2">
          {tutor.name}
        </h2>

        <p className="text-gray-500 mb-1">
          Subject: {tutor.subject}
        </p>

        <p className="text-gray-500 mb-4">
          Price: {tutor.price} EGP / hour
        </p>

        <button
          onClick={handlePay}
          disabled={loading}
          className={`w-full py-3 rounded text-white ${
            loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? "Processing..." : "Pay & Confirm Booking 💳"}
        </button>

      </div>
    </div>
  );
}