"use client";

import { useParams } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export default function BookPage() {
  const { id } = useParams();

  const book = async () => {
    const user = auth.currentUser;
    if (!user) return;

    await addDoc(collection(db, "bookings"), {
      teacherId: id,
      studentId: user.uid,
      studentEmail: user.email,
      status: "pending",
      createdAt: serverTimestamp(),
    });

    alert("تم الحجز بنجاح");
  };

  return (
    <div className="p-6">
      <h1>📅 تأكيد الحجز</h1>

      <button
        onClick={book}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        احجز الآن
      </button>
    </div>
  );
}