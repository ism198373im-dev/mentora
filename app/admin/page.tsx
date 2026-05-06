"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { collection, getDocs, doc, updateDoc, getDoc } from "firebase/firestore";

export default function Admin() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const run = async () => {
      const u = auth.currentUser;
      if (!u) return;

      const snap = await getDoc(doc(db, "users", u.uid));
      if (snap.exists() && snap.data().role === "admin") {
        setAllowed(true);
      }

      const b = await getDocs(collection(db, "bookings"));
      setBookings(b.docs.map(d => ({ id: d.id, ...d.data() })));
    };

    run();
  }, []);

  if (!allowed) return <p>🚫 Not allowed</p>;

  return (
    <div className="p-6">
      {bookings.map(b => (
        <div key={b.id} className="border p-3 my-2">
          <p>{b.email}</p>

          <button
            onClick={() =>
              updateDoc(doc(db, "bookings", b.id), { status: "approved" })
            }
            className="bg-green-500 text-white px-2 mr-2"
          >
            Approve
          </button>

          <button
            onClick={() =>
              updateDoc(doc(db, "bookings", b.id), { status: "rejected" })
            }
            className="bg-red-500 text-white px-2"
          >
            Reject
          </button>
        </div>
      ))}
    </div>
  );
}