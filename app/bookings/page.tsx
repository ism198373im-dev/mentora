"use client"

import { useEffect, useState } from "react"
import { db, auth } from "@/lib/firebase"
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore"
import { useRouter } from "next/navigation"

type Booking = {
  id: string
  teacherId: string
  teacherName?: string
  teacherSubject?: string
  userName: string
}

export default function Bookings() {
  const router = useRouter()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBookings = async () => {
      const user = auth.currentUser

      // 🔐 حماية الصفحة
      if (!user) {
        router.push("/login")
        return
      }

      const q = query(
        collection(db, "bookings"),
        where("userId", "==", user.uid)
      )

      const snap = await getDocs(q)

      const data = snap.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Omit<Booking, "id">),
      }))

      setBookings(data)
      setLoading(false)
    }

    fetchBookings()
  }, [router])

  return (
    <div style={{ padding: 20, background: "#f6f7fb", minHeight: "100vh" }}>
      
      <h1 style={{ marginBottom: 20 }}>📋 حجوزاتي</h1>

      {loading && <p>⏳ جاري التحميل...</p>}

      {!loading && bookings.length === 0 && (
        <p>❌ لا يوجد حجوزات</p>
      )}

      {/* Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 15,
        }}
      >
        {bookings.map(b => (
          <div
            key={b.id}
            style={{
              background: "white",
              padding: 15,
              borderRadius: 12,
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            }}
          >
            {/* Teacher Name */}
            <h3 style={{ marginBottom: 5 }}>
              👨‍🏫 {b.teacherName || "مدرس"}
            </h3>

            {/* Subject */}
            <p style={{ color: "#555" }}>
              📘 {b.teacherSubject || "بدون مادة"}
            </p>

            {/* User */}
            <p style={{ fontSize: 12, color: "#888" }}>
              👤 {b.userName}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}