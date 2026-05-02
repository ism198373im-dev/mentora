"use client"

import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { db, auth } from "@/lib/firebase"
import {
  addDoc,
  collection,
  doc,
  getDoc,
} from "firebase/firestore"

type Teacher = {
  name: string
  subject: string
  price?: number
}

export default function BookPage() {
  const { id } = useParams()
  const router = useRouter()

  const [teacher, setTeacher] = useState<Teacher | null>(null)
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  // 👨‍🏫 جلب بيانات المدرس
  useEffect(() => {
    const fetchTeacher = async () => {
      const ref = doc(db, "teachers", id as string)
      const snap = await getDoc(ref)

      if (snap.exists()) {
        setTeacher(snap.data() as Teacher)
      }
    }

    fetchTeacher()
  }, [id])

  // 📅 الحجز
  const handleBook = async () => {
    const user = auth.currentUser

    if (!user || !teacher) {
      alert("لازم تسجيل دخول ❌")
      return
    }

    setLoading(true)

    try {
      // 1️⃣ إنشاء الحجز
      const bookingRef = await addDoc(collection(db, "bookings"), {
        teacherId: id,
        teacherName: teacher.name,
        teacherSubject: teacher.subject,
        teacherPrice: teacher.price || 0,

        userId: user.uid,
        userName: user.email,

        createdAt: new Date(),
      })

      // 2️⃣ إنشاء Room للشات
      const roomRef = await addDoc(collection(db, "rooms"), {
        teacherId: id,
        studentId: user.uid,
        bookingId: bookingRef.id,
        createdAt: new Date(),
      })

      // 3️⃣ إشعار للمدرس
      await addDoc(collection(db, "notifications"), {
        userId: id,
        text: "📅 لديك حجز جديد من طالب",
        type: "booking",
        read: false,
        createdAt: new Date(),
      })

      setDone(true)

      // 🚀 تحويل للشات بعد الحجز
      setTimeout(() => {
        router.push(`/chat/${roomRef.id}`)
      }, 1000)

    } catch (error) {
      console.log(error)
      alert("حصل خطأ أثناء الحجز")
    }

    setLoading(false)
  }

  return (
    <div style={container}>
      <h1>📅 تأكيد الحجز</h1>

      {/* 👨‍🏫 Teacher Card */}
      {teacher ? (
        <div style={card}>
          <h2>👨‍🏫 {teacher.name}</h2>
          <p>📘 {teacher.subject}</p>
          <p>💰 {teacher.price} جنيه</p>
        </div>
      ) : (
        <p>⏳ جاري تحميل بيانات المدرس...</p>
      )}

      {/* Button */}
      <button onClick={handleBook} disabled={loading} style={btn}>
        {loading ? "جاري الحجز..." : "تأكيد الحجز"}
      </button>

      {/* Success */}
      {done && <p style={{ color: "green" }}>✅ تم الحجز بنجاح</p>}
    </div>
  )
}

/* 🎨 Styles */
const container: React.CSSProperties = {
  padding: 20,
  background: "#f6f7fb",
  minHeight: "100vh",
}

const card: React.CSSProperties = {
  background: "white",
  padding: 15,
  borderRadius: 12,
  marginBottom: 20,
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
}

const btn: React.CSSProperties = {
  padding: "12px 20px",
  background: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: 8,
  cursor: "pointer",
}