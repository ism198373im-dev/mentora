"use client"

import { useEffect, useState } from "react"
import { db, auth } from "@/lib/firebase"
import { collection, getDocs, query, where } from "firebase/firestore"
import { useRouter } from "next/navigation"
import { requireAuth } from "@/lib/requireAuth"

type Booking = {
  id: string
  teacherName?: string
  teacherSubject?: string
  userName: string
  userId: string
}

export default function Bookings() {
  const router = useRouter()

  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      // 🔐 حماية: لازم يكون Student
      const ok = await requireAuth(router, ["student"])
      if (!ok) return

      const user = auth.currentUser
      if (!user) return

      try {
        // 📦 جلب حجوزات المستخدم فقط
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
      } catch (error) {
        console.log("Error loading bookings:", error)
      }

      setLoading(false)
    }

    load()
  }, [router])

  return (
    <div
      style={{
        padding: 20,
        background: "#f6f7fb",
        minHeight: "100vh",
      }}
    >
      <h1>📋 حجوزاتي</h1>

      {/* Loading */}
      {loading && <p>⏳ جاري التحميل...</p>}

      {/* Empty state */}
      {!loading && bookings.length === 0 && (
        <p>❌ لا يوجد حجوزات</p>
      )}

      {/* Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: 15,
          marginTop: 20,
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
            <h3>👨‍🏫 {b.teacherName || "مدرس"}</h3>
            <p>📘 {b.teacherSubject || "بدون مادة"}</p>

            <p style={{ fontSize: 12, color: "#888" }}>
              👤 {b.userName}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}