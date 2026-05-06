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
    const unsub = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        router.push("/login");
        return;
      }

      const ADMIN_EMAIL = "ism198373.is@gmail.com";

      if (currentUser.email !== ADMIN_EMAIL) {
        alert("Access denied ❌");
        router.push("/");
        return;
      }

      const fetchData = async () => {
        try {
          const usersSnap = await getDocs(collection(db, "users"));
          const bookingsSnap = await getDocs(collection(db, "bookings"));

          const usersData = usersSnap.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          const bookingsData = bookingsSnap.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          setUsers(usersData);
          setBookings(bookingsData);
        } catch (error) {
          console.log("Error loading dashboard:", error);
        }

        setLoading(false);
      };

      fetchData();
    });

    return () => unsub();
  }, [router]);

  if (loading) {
    return <p className="p-10 text-center">Loading dashboard...</p>;
  }

  // 📊 Stats
  const totalUsers = users.length;
  const totalBookings = bookings.length;

  const revenue = bookings.reduce(
    (sum, b: any) => sum + (Number(b.price) || 0),
    0
  );

  const proUsers = users.filter((u: any) => u.plan === "pro").length;

  const avgBookingValue =
    totalBookings > 0 ? revenue / totalBookings : 0;

  return (
    <div className="p-10 bg-gray-50 min-h-screen">

      <h1 className="text-4xl font-bold text-center mb-10 text-blue-600">
        📊 Mentora Admin Dashboard
      </h1>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6">

        <div className="bg-white shadow rounded-xl p-6 text-center">
          <h2 className="text-gray-500">Users</h2>
          <p className="text-3xl font-bold">{totalUsers}</p>
        </div>

        <div className="bg-white shadow rounded-xl p-6 text-center">
          <h2 className="text-gray-500">Bookings</h2>
          <p className="text-3xl font-bold">{totalBookings}</p>
        </div>

        <div className="bg-white shadow rounded-xl p-6 text-center">
          <h2 className="text-gray-500">Revenue</h2>
          <p className="text-3xl font-bold text-green-600">
            {revenue} EGP
          </p>
        </div>

        <div className="bg-white shadow rounded-xl p-6 text-center">
          <h2 className="text-gray-500">Pro Users</h2>
          <p className="text-3xl font-bold text-purple-600">
            {proUsers}
          </p>
        </div>

      </div>

      {/* Extra metric */}
      <div className="grid md:grid-cols-1 gap-6 mt-10">

        <div className="bg-white shadow rounded-xl p-6 text-center">
          <h2 className="text-gray-500">Avg Booking Value</h2>
          <p className="text-3xl font-bold">
            {avgBookingValue.toFixed(2)} EGP
          </p>
        </div>

      </div>

    </div>
  );
}