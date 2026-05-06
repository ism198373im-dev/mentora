"use client";

import { useEffect, useState } from "react";
import { db, auth } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function MyBookings() {
  const [bookings, setBookings] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push("/login");
        return;
      }

      const q = query(
        collection(db, "bookings"),
        where("userId", "==", user.uid)
      );

      const snap = await getDocs(q);

      const data = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setBookings(data);
    });

    return () => unsub();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>📅 حجوزاتي</h1>

      {bookings.length === 0 ? (
        <p>لا يوجد حجوزات</p>
      ) : (
        bookings.map((b) => (
          <div key={b.id}>
            <p>👨‍🏫 {b.teacherName}</p>
            <p>📖 {b.subject}</p>
            <p>💰 {b.price} جنيه</p>
          </div>
        ))
      )}
    </div>
  );
}