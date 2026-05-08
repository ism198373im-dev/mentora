"use client";

import { useEffect, useState } from "react";
import { db, auth } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default function BookingsPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (!u) {
        setUser(null);
        setBookings([]);
        setLoading(false);
        return;
      }

      setUser(u);

      const snap = await getDocs(collection(db, "bookings"));

      const data = snap.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((b: any) => b.userId === u.uid);

      setBookings(data);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  if (loading) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  if (!user) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-xl font-bold">You must login first 🔐</h1>
      </div>
    );
  }

  return (
    <div className="p-10">

      <h1 className="text-3xl font-bold mb-6">
        My Bookings 📚
      </h1>

      {bookings.length === 0 ? (
        <p>No bookings yet</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">

          {bookings.map((b) => (
            <div key={b.id} className="p-4 shadow rounded-xl bg-white">

              <h2 className="font-bold text-xl">
                {b.tutorName}
              </h2>

              <p>{b.subject}</p>
              <p>{b.price} EGP</p>

              <p className="text-sm text-gray-500 mt-2">
                {b.userEmail}
              </p>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}