"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { collection, getDocs } from "firebase/firestore";

export default function DashboardPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push("/login");
        return;
      }

      const ADMIN_EMAIL = "ism198373.is@gmail.com";

      if (user.email !== ADMIN_EMAIL) {
        alert("Access denied ❌");
        router.push("/");
        return;
      }

      const fetchData = async () => {
        try {
          const usersSnap = await getDocs(collection(db, "users"));
          const bookingsSnap = await getDocs(collection(db, "bookings"));

          setUsers(
            usersSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
          );

          setBookings(
            bookingsSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
          );
        } catch (err) {
          console.log(err);
        }

        setLoading(false);
      };

      fetchData();
    });

    return () => unsub();
  }, [router]);

  if (loading) return <p className="p-10 text-center">Loading...</p>;

  const revenue = bookings.reduce(
    (sum, b) => sum + (Number(b.price) || 0),
    0
  );

  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-10">
        📊 Mentora Dashboard
      </h1>

      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white p-6 text-center shadow rounded-xl">
          Users: {users.length}
        </div>

        <div className="bg-white p-6 text-center shadow rounded-xl">
          Bookings: {bookings.length}
        </div>

        <div className="bg-white p-6 text-center shadow rounded-xl">
          Revenue: {revenue} EGP
        </div>

        <div className="bg-white p-6 text-center shadow rounded-xl">
          Pro Users: {users.filter((u) => u.plan === "pro").length}
        </div>
      </div>
    </div>
  );
}