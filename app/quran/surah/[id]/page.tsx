"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"

export default function SurahPage() {
  const { id } = useParams()

  const [data, setData] = useState<any>(null)
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null)
  const [reciter, setReciter] = useState("ar.alafasy")

  const reciters = [
    { name: "Alafasy", id: "ar.alafasy" },
    { name: "Sudais", id: "ar.abdurrahmaansudais" },
    { name: "Shuraim", id: "ar.saoodshuraym" },
  ]

  useEffect(() => {
    fetch(`https://api.alquran.cloud/v1/surah/${id}`)
      .then((res) => res.json())
      .then((res) => setData(res.data))
  }, [id])

  const playAudio = (ayahNumber: number) => {
    if (currentAudio) {
      currentAudio.pause()
    }

    const audio = new Audio(
      `https://cdn.islamic.network/quran/audio/128/${reciter}/${ayahNumber}.mp3`
    )

    audio.play()
    setCurrentAudio(audio)
  }

  const playSurah = async () => {
    if (!data) return

    for (const ayah of data.ayahs) {
      await new Promise((resolve) => {
        const audio = new Audio(
          `https://cdn.islamic.network/quran/audio/128/${reciter}/${ayah.number}.mp3`
        )

        setCurrentAudio(audio)

        audio.play()
        audio.onended = () => resolve(true)
      })
    }
  }

  if (!data) return <p>جاري التحميل...</p>

  return (
    <div style={{ padding: 20 }}>
      
      <h1>📖 {data.englishName} - {data.name}</h1>

      {/* اختيار القارئ */}
      <div style={{ margin: "20px 0" }}>
        <label>🎧 اختيار القارئ: </label>

        <select
          value={reciter}
          onChange={(e) => setReciter(e.target.value)}
        >
          {reciters.map((r, i) => (
            <option key={i} value={r.id}>
              {r.name}
            </option>
          ))}
        </select>
      </div>

      {/* زر تشغيل السورة */}
      <button
        onClick={playSurah}
        style={{
          padding: 10,
          marginBottom: 20,
          background: "#000",
          color: "#fff",
          border: "none",
          borderRadius: 5
        }}
      >
        ▶️ تشغيل السورة كاملة
      </button>

      {/* الآيات */}
      {data.ayahs.map((ayah: any) => (
        <div key={ayah.number} style={{ margin: "20px 0" }}>
          
          <p style={{ fontSize: 22, textAlign: "right" }}>
            {ayah.text}
          </p>

          <button
            onClick={() => playAudio(ayah.number)}
            style={{
              marginTop: 5,
              padding: 5
            }}
          >
            ▶️ تشغيل الآية
          </button>

          <hr />
        </div>
      ))}
    </div>
  )
}