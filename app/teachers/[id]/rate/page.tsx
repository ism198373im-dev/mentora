"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { db, auth } from "@/lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export default function RateTeacher() {
  const { id } = useParams();
  const router = useRouter();

  const [rating, setRating] = useState(5);

  const submitRating = async () => {
    const user = auth.currentUser;

    if (!user) {
      alert("لازم تسجيل دخول");
      router.push("/login");
      return;
    }

    const ref = doc(db, "teachers", id as string);
    const snap = await getDoc(ref);

    if (!snap.exists()) return;

    const data = snap.data();

    const newSum = (data.ratingSum || 0) + rating;
    const newCount = (data.ratingCount || 0) + 1;

    await updateDoc(ref, {
      ratingSum: newSum,
      ratingCount: newCount,
    });

    alert("⭐ تم إضافة التقييم");

    router.push(`/teacher/${id}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">

      <div className="bg-white p-6 rounded-xl shadow w-full max-w-md">

        <h1 className="text-xl font-bold mb-4">
          ⭐ تقييم المدرس
        </h1>

        <select
          className="border p-2 w-full rounded"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
        >
          <option value={5}>⭐⭐⭐⭐⭐ (5)</option>
          <option value={4}>⭐⭐⭐⭐ (4)</option>
          <option value={3}>⭐⭐⭐ (3)</option>
          <option value={2}>⭐⭐ (2)</option>
          <option value={1}>⭐ (1)</option>
        </select>

        <button
          onClick={submitRating}
          className="mt-4 w-full bg-yellow-500 text-white py-2 rounded"
        >
          إرسال التقييم
        </button>

      </div>

    </div>
  );
}