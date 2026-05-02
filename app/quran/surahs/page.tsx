"use client"

import { useEffect, useState } from "react"

export default function SurahsPage() {
  const [surahs, setSurahs] = useState<any[]>([])

  useEffect(() => {
    fetch("https://api.alquran.cloud/v1/surah")
      .then((res) => res.json())
      .then((data) => setSurahs(data.data))
  }, [])

  return (
    <div style={{ padding: "20px" }}>
      <h1>📖 المصحف الشريف</h1>

      <p>اختر السورة</p>

      <div style={{ marginTop: "20px" }}>
        {surahs.map((s) => (
          <a
            key={s.number}
            href={`/quran/surah/${s.number}`}
            style={cardStyle}
          >
            {s.number}. {s.englishName} - {s.name}
          </a>
        ))}
      </div>
    </div>
  )
}

const cardStyle = {
  display: "block",
  padding: "10px",
  marginBottom: "10px",
  border: "1px solid #ddd",
  borderRadius: "8px",
  textDecoration: "none",
}