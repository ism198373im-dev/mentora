'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'

const tutors = [
  { id: 1, name: "أحمد", subject: "رياضيات", price: 100 },
  { id: 2, name: "محمد", subject: "إنجليزي", price: 120 },
  { id: 3, name: "سارة", subject: "برمجة", price: 150 },
]

export default function TutorPage() {
  const params = useParams()
  const id = Number(params.id)

  const tutor = tutors.find(t => t.id === id)

  if (!tutor) {
    return <h1 style={{ padding: "20px" }}>❌ المدرس غير موجود</h1>
  }

  return (
    <div style={{
      padding: "30px",
      maxWidth: "500px",
      margin: "auto",
      background: "#f5f5f5",
      borderRadius: "10px",
      marginTop: "40px"
    }}>
      
      <h1 style={{ marginBottom: "10px" }}>
        👨‍🏫 {tutor.name}
      </h1>

      <p>📚 المادة: {tutor.subject}</p>

      <p style={{ fontWeight: "bold" }}>
        💰 السعر: {tutor.price} جنيه
      </p>

      <Link href={`/book/${tutor.id}`}>
        <button style={{
          marginTop: "20px",
          padding: "12px",
          width: "100%",
          background: "green",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "16px"
        }}>
          احجز الآن
        </button>
      </Link>

    </div>
  )
}