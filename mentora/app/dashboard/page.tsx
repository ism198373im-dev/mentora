"use client"

import { useEffect, useState } from "react"
import { db, auth } from "@/lib/firebase"
import { collection, getDocs, query, where } from "firebase/firestore"
import { useRouter } from "next/navigation"

type Booking = {
  id: string
  teacherId: string
  userName: string
}

export default function Dashboard() {
  const router = useRouter()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const user = auth.currentUser

      // 🔐 حماية
      if (!user) {
        router.push("/login")
        return
      }

      // 📌 هنا هنفترض إن teacherId = user.uid (لو المدرس مسجل بنفس النظام)
      const q = query(
        collection(db, "bookings"),
        where("teacherId", "==", user.uid)
      )

      const snap = await getDocs(q)

      const data = snap.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Omit<Booking, "id">),
      }))

      setBookings(data)
      setLoading(false)
    }

    fetchData()
  }, [router])

  return (
    <div style={{ padding: 20, background: "#f6f7fb", minHeight: "100vh" }}>
      
      <h1>🧑‍🏫 لوحة تحكم المدرس</h1>

      {loading && <p>⏳ جاري التحميل...</p>}

      {!loading && bookings.length === 0 && (
        <p>❌ لا يوجد حجوزات حتى الآن</p>
      )}

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
            <h3>👤 {b.userName}</h3>
            <p>📅 حجز جديد</p>
          </div>
        ))}
      </div>
    </div>
  )
}