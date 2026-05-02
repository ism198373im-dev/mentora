"use client"

import { useEffect, useState } from "react"

export default function SurahPage({ params }: any) {
  const [surah, setSurah] = useState<any>(null)

  useEffect(() => {
    fetch(`https://api.alquran.cloud/v1/surah/${params.id}`)
      .then((res) => res.json())
      .then((data) => setSurah(data.data))
  }, [params.id])

  if (!surah) return <p>Loading...</p>

  return (
    <div style={{ padding: "20px", lineHeight: "2" }}>
      <h1>📖 {surah.name}</h1>

      {surah.ayahs.map((a: any) => (
        <p key={a.number}>
          <b>{a.numberInSurah}.</b> {a.text}
        </p>
      ))}
    </div>
  )
}