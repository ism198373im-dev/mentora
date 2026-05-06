"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { collection, getDocs } from "firebase/firestore";

export default function DashboardPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        router.push("/login");
        return;
      }

      // 👇 هنا بنعتبر الإيميل ده Admin (تقدر تغيّره)
      const ADMIN_EMAIL = "ism198373.is@gmail.com";

      if (currentUser.email !== ADMIN_EMAIL) {
        alert("Access denied ❌");
        router.push("/");
        return;
      }

      try {
        const snapshot = await getDocs(collection(db, "bookings"));

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setBookings(data);
      } catch (error) {
        console.log(error);
      }

      setLoading(false);
    });

    return () => unsub();
  }, [router]);

  if (loading) {
    return <p className="p-10 text-center">Loading dashboard...</p>;
  }

  return (
    <div className="p-10">

      <h1 className="text-4xl font-bold text-blue-600 mb-8 text-center">
        👨‍🏫 Admin Dashboard
      </h1>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-500">
          No bookings yet
        </p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">

          {bookings.map((b) => (
            <div
              key={b.id}
              className="bg-white p-6 shadow rounded-xl text-center"
            >

              <h2 className="text-xl font-bold mb-2">
                {b.name}
              </h2>

              <p className="text-gray-500 mb-1">
                Subject: {b.subject}
              </p>

              <p className="text-gray-500 mb-1">
                Price: {b.price} EGP
              </p>

              <p className="text-sm text-gray-400 mt-2">
                User: {b.userEmail}
              </p>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}