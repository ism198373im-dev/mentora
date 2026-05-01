"use client"

import { useEffect, useState } from "react"
import { db } from "@/lib/firebase"
import { collection, getDocs } from "firebase/firestore"
import Link from "next/link"

type Tutor = {
  id: string
  name: string
  subject: string
  price: number
}

export default function Tutors() {
  const [tutors, setTutors] = useState<Tutor[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const snap = await getDocs(collection(db, "teachers"))

        const data = snap.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Tutor[]

        setTutors(data)
      } catch (error) {
        console.log(error)
      }

      setLoading(false)
    }

    fetchTutors()
  }, [])

  return (
    <div>
      {/* Header */}
      <h1 style={{ marginBottom: 20 }}>👨‍🏫 المدرسين</h1>

      {/* Loading */}
      {loading && <p>⏳ جاري التحميل...</p>}

      {/* Empty state */}
      {!loading && tutors.length === 0 && (
        <p>❌ لا يوجد مدرسين حالياً</p>
      )}

      {/* Grid */}
      <div style={grid}>
        {tutors.map(t => (
          <div key={t.id} style={card}>
            
            {/* Name */}
            <h3 style={{ marginBottom: 5 }}>👨‍🏫 {t.name}</h3>

            {/* Subject */}
            <p style={{ color: "#666" }}>📘 {t.subject}</p>

            {/* Price */}
            <p style={{ fontWeight: "bold" }}>💰 {t.price} جنيه</p>

            {/* Button */}
            <Link href={`/book/${t.id}`}>
              <button style={btn}>احجز الآن</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

/* 🎨 Styles */
const grid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: 15,
  marginTop: 20,
}

const card: React.CSSProperties = {
  background: "white",
  padding: 16,
  borderRadius: 12,
  boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
  transition: "0.2s",
}

const btn: React.CSSProperties = {
  marginTop: 10,
  width: "100%",
  padding: 10,
  background: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: 8,
  cursor: "pointer",
}