"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

export default function SurahsPage() {
  const [surahs, setSurahs] = useState<any[]>([])

  useEffect(() => {
    fetch("https://api.alquran.cloud/v1/surah")
      .then((res) => res.json())
      .then((data) => setSurahs(data.data))
  }, [])

  return (
    <div style={{ padding: "20px" }}>
      <h1>📚 السور</h1>

      <div style={{ marginTop: "20px" }}>
        {surahs.map((s) => (
          <Link key={s.number} href={`/quran/surah/${s.number}`} style={card}>
            {s.number}. {s.name}
          </Link>
        ))}
      </div>
    </div>
  )
}

const card: any = {
  display: "block",
  padding: "10px",
  border: "1px solid #ddd",
  marginBottom: "10px",
  borderRadius: "8px",
  textDecoration: "none",
}