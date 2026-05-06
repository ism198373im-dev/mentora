"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <div className="flex justify-between items-center p-4 bg-white shadow">

      {/* Logo */}
      <Link href="/" className="font-bold text-xl text-blue-600">
        📖 Mentora
      </Link>

      {/* Links */}
      <div className="flex gap-4 items-center">

        <Link href="/">Home</Link>
        <Link href="/tutors">Tutors</Link>
        <Link href="/bookings">Bookings</Link>

        {!loading && (
          <>
            {user ? (
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  href="/login"
                  className="bg-blue-600 text-white px-3 py-1 rounded"
                >
                  Login
                </Link>

                <Link
                  href="/signup"
                  className="bg-green-600 text-white px-3 py-1 rounded"
                >
                  Sign Up
                </Link>
              </>
            )}
          </>
        )}

      </div>

    </div>
  );
}