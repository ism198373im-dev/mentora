"use client"

import { useEffect, useState } from "react"

const reciters = [
  { name: "مشاري العفاسي", id: "ar.alafasy" },
  { name: "عبدالباسط", id: "ar.abdulbasitmurattal" },
  { name: "السديس", id: "ar.abdurrahmaansudais" },
  { name: "المنشاوي", id: "ar.minshawi" },
]

export default function SurahsPage() {
  const [surahs, setSurahs] = useState<any[]>([])
  const [reciter, setReciter] = useState(reciters[0].id)
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null)

  useEffect(() => {
    fetch("https://api.alquran.cloud/v1/surah")
      .then((res) => res.json())
      .then((data) => setSurahs(data.data))
  }, [])

  const playSurah = (number: number) => {
    if (audio) audio.pause()

    const newAudio = new Audio(
      `https://cdn.islamic.network/quran/audio-surah/128/${reciter}/${number}.mp3`
    )

    setAudio(newAudio)
    newAudio.play()
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>📚 السور</h1>

      {/* اختيار القارئ */}
      <div style={{ marginBottom: "20px" }}>
        <h3>🎧 اختر القارئ</h3>

        <select
          value={reciter}
          onChange={(e) => setReciter(e.target.value)}
        >
          {reciters.map((r) => (
            <option key={r.id} value={r.id}>
              {r.name}
            </option>
          ))}
        </select>
      </div>

      {/* السور */}
      <div>
        {surahs.map((s) => (
          <div key={s.number} style={card}>
            <span>
              {s.number}. {s.name}
            </span>

            <button onClick={() => playSurah(s.number)}>
              ▶️ تشغيل
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

const card = {
  display: "flex",
  justifyContent: "space-between",
  padding: "10px",
  border: "1px solid #ddd",
  marginBottom: "10px",
  borderRadius: "8px",
}