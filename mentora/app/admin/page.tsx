"use client"

import { useEffect, useState } from "react"
import { db, auth } from "@/lib/firebase"
import { collection, getDocs } from "firebase/firestore"
import { useRouter } from "next/navigation"

export default function AdminPage() {
  const router = useRouter()

  const [teachers, setTeachers] = useState<any[]>([])
  const [bookings, setBookings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const user = auth.currentUser

    // 🔐 حماية بسيطة (مؤقتة)
    if (!user || user.email !== "admin@test.com") {
      router.push("/")
      return
    }

    const load = async () => {
      // 👨‍🏫 جلب المدرسين
      const teachersSnap = await getDocs(collection(db, "teachers"))
      setTeachers(
        teachersSnap.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }))
      )

      // 📦 جلب الحجوزات
      const bookingsSnap = await getDocs(collection(db, "bookings"))
      setBookings(
        bookingsSnap.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }))
      )

      setLoading(false)
    }

    load()
  }, [router])

  return (
    <div style={{ padding: 20 }}>
      <h1>🧑‍💼 Admin Panel</h1>

      {loading && <p>⏳ جاري التحميل...</p>}

      {/* 👨‍🏫 Teachers */}
      <h2>👨‍🏫 المدرسين</h2>
      {teachers.map(t => (
        <div key={t.id} style={card}>
          <p>👨‍🏫 {t.name}</p>
          <p>📘 {t.subject}</p>
          <p>💰 {t.price}</p>
        </div>
      ))}

      {/* 📦 Bookings */}
      <h2>📦 الحجوزات</h2>
      {bookings.map(b => (
        <div key={b.id} style={card}>
          <p>👤 {b.userName}</p>
          <p>👨‍🏫 {b.teacherName}</p>
        </div>
      ))}
    </div>
  )
}

const card: React.CSSProperties = {
  background: "white",
  padding: 12,
  marginBottom: 10,
  borderRadius: 10,
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
}