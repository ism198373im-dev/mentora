"use client";

import { useParams } from "next/navigation";
import { tutors } from "@/data/tutors";
import { auth, db } from "@/lib/firebase";
import { addDoc, collection } from "firebase/firestore";

export default function BookPage() {
  const { id } = useParams();

  const tutor = tutors.find((t) => t.id === Number(id));

  if (!tutor) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-xl">Tutor not found</h1>
      </div>
    );
  }

  const handleBooking = async () => {
    const user = auth.currentUser;

    if (!user) {
      alert("You must login first ❌");
      return;
    }

    try {
      await addDoc(collection(db, "bookings"), {
        tutorId: tutor.id,
        name: tutor.name,
        subject: tutor.subject,
        price: tutor.price,
        userId: user.uid,
        userEmail: user.email,
      });

      alert("Booking saved to Firebase ✅");
    } catch (error) {
      console.log(error);
      alert("Error saving booking ❌");
    }
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
          onClick={handleBooking}
          className="bg-blue-600 text-white px-6 py-3 rounded w-full hover:bg-blue-700"
        >
          Confirm Booking
        </button>

      </div>
    </div>
  );
}