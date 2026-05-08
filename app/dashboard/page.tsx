"use client";

import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
} from "firebase/firestore";

import { db } from "@/lib/firebase";
import BookingsChart from "@/components/BookingsChart";

export default function DashboardPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const snap = await getDocs(collection(db, "bookings"));

        const data = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setBookings(data);
      } catch (err) {
        console.log(err);
      }

      setLoading(false);
    };

    fetchBookings();
  }, []);

  const totalBookings = bookings.length;

  const approvedBookings = bookings.filter(
    (b) => b.status === "approved"
  ).length;

  const pendingBookings = bookings.filter(
    (b) => b.status === "pending"
  ).length;

  // 📊 Chart data (static for now, can be dynamic later)
  const chartData = [
    { name: "Mon", bookings: 3 },
    { name: "Tue", bookings: 5 },
    { name: "Wed", bookings: 2 },
    { name: "Thu", bookings: 8 },
    { name: "Fri", bookings: 6 },
    { name: "Sat", bookings: 4 },
    { name: "Sun", bookings: 7 },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl font-bold">
        Loading...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6">

      {/* HEADER */}
      <div className="max-w-7xl mx-auto mb-10">

        <div className="flex items-center justify-between flex-wrap gap-4">

          <div>

            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">
              Dashboard 📊
            </h1>

            <p className="text-gray-500 mt-2">
              Welcome back to Mintara
            </p>

          </div>

          <button className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-3 rounded-2xl shadow-lg font-semibold">
            + New Booking
          </button>

        </div>

      </div>

      {/* STATS */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6 mb-12">

        <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100">

          <div className="text-5xl mb-3">📚</div>

          <h2 className="text-4xl font-extrabold">
            {totalBookings}
          </h2>

          <p className="text-gray-500 mt-2">
            Total Bookings
          </p>

        </div>

        <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100">

          <div className="text-5xl mb-3">✅</div>

          <h2 className="text-4xl font-extrabold">
            {approvedBookings}
          </h2>

          <p className="text-gray-500 mt-2">
            Approved
          </p>

        </div>

        <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100">

          <div className="text-5xl mb-3">⏳</div>

          <h2 className="text-4xl font-extrabold">
            {pendingBookings}
          </h2>

          <p className="text-gray-500 mt-2">
            Pending
          </p>

        </div>

      </div>

      {/* 📊 CHART */}
      <div className="max-w-7xl mx-auto mb-12">

        <BookingsChart data={chartData} />

      </div>

      {/* RECENT BOOKINGS */}
      <div className="max-w-7xl mx-auto">

        <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100">

          <h2 className="text-2xl font-bold mb-6">
            Recent Bookings
          </h2>

          <div className="space-y-4">

            {bookings.length === 0 && (
              <p className="text-gray-500 text-center">
                No bookings yet
              </p>
            )}

            {bookings.map((b) => (

              <div
                key={b.id}
                className="flex items-center justify-between border border-gray-100 p-4 rounded-2xl"
              >

                <div>

                  <h3 className="font-bold">
                    {b.tutorName}
                  </h3>

                  <p className="text-gray-500 text-sm">
                    {b.userEmail}
                  </p>

                </div>

                <span
                  className={`px-4 py-1 rounded-full text-sm font-semibold ${
                    b.status === "approved"
                      ? "bg-green-100 text-green-700"
                      : b.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {b.status}
                </span>

              </div>

            ))}

          </div>

        </div>

      </div>

    </main>
  );
}