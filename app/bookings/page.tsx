"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import AuthGuard from "@/components/AuthGuard";

export default function BookingsPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        const snapshot = await getDocs(collection(db, "bookings"));

        const data = snapshot.docs.map((docItem) => ({
          id: docItem.id,
          ...docItem.data(),
        }));

        const filtered = data.filter(
          (b: any) => b.userId === currentUser.uid
        );

        setBookings(filtered);
      } else {
        setBookings([]);
      }

      setLoading(false);
    });

    return () => unsub();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm("Delete this booking?");
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "bookings", id));

      setBookings((prev) => prev.filter((b) => b.id !== id));

      alert("Deleted successfully ✅");
    } catch (error) {
      console.log(error);
      alert("Error deleting ❌");
    }
  };

  if (loading) {
    return <p className="p-10 text-center">Loading...</p>;
  }

  return (
    <AuthGuard>

      <div className="p-10">

        <h1 className="text-4xl font-bold text-blue-600 mb-8 text-center">
          📋 My Bookings
        </h1>

        {!user ? (
          <p className="text-center text-gray-500">
            Please login first
          </p>
        ) : bookings.length === 0 ? (
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

                <p className="text-gray-500 mb-4">
                  {b.price} EGP / hour
                </p>

                <button
                  onClick={() => handleDelete(b.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>

              </div>
            ))}

          </div>
        )}

      </div>

    </AuthGuard>
  );
}