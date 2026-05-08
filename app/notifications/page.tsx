"use client";

import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { auth, db } from "@/lib/firebase";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const user = auth.currentUser;

        if (!user) return;

        const q = query(
          collection(db, "notifications"),
          where("userId", "==", user.uid)
        );

        const snap = await getDocs(q);

        const data = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setNotifications(data);

      } catch (err) {
        console.log(err);
      }

      setLoading(false);
    };

    fetchNotifications();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl font-bold">
        Loading...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6">

      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-10">

          <h1 className="text-4xl font-extrabold text-gray-900">
            Notifications 🔔
          </h1>

          <p className="text-gray-500 mt-2">
            Stay updated with your bookings and activities
          </p>

        </div>

        {/* Notifications */}
        <div className="space-y-4">

          {notifications.length === 0 && (
            <div className="bg-white rounded-3xl p-10 shadow-lg border border-gray-100 text-center text-gray-500">
              No notifications yet 🔕
            </div>
          )}

          {notifications.map((note) => (

            <div
              key={note.id}
              className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition"
            >

              <div className="flex items-start gap-4">

                <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center text-2xl">
                  🔔
                </div>

                <div className="flex-1">

                  <h3 className="font-bold text-lg text-gray-900">
                    Mintara Notification
                  </h3>

                  <p className="text-gray-600 mt-1">
                    {note.message}
                  </p>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </main>
  );
}