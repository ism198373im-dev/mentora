"use client"

import { useEffect, useState } from "react"

const surahs = [
  { id: 1, name: "الفاتحة" },
  { id: 2, name: "البقرة" },
  { id: 3, name: "آل عمران" },
  { id: 4, name: "النساء" },
  { id: 5, name: "المائدة" },
]

// ربط السور بالصفحات
const surahPages: { [key: number]: number } = {
  1: 1,
  2: 2,
  3: 50,
  4: 77,
  5: 106,
}

// القراء
const reciters = [
  {
    name: "عبد الباسط عبد الصمد",
    server: "https://server8.mp3quran.net/afs",
  },
  {
    name: "المنشاوي",
    server: "https://server10.mp3quran.net/minsh",
  },
  {
    name: "الحصري",
    server: "https://server13.mp3quran.net/husr",
  },
]

export default function ReadQuran() {
  const [selectedSurah, setSelectedSurah] = useState<{ id: number; name: string } | null>(null)
  const [selectedReciter, setSelectedReciter] = useState(reciters[0])

  // تحميل من التخزين
  useEffect(() => {
    const savedSurah = localStorage.getItem("surah")
    const savedReciter = localStorage.getItem("reciter")

    if (savedSurah) setSelectedSurah(JSON.parse(savedSurah))
    if (savedReciter) setSelectedReciter(JSON.parse(savedReciter))
  }, [])

  // حفظ السورة
  useEffect(() => {
    if (selectedSurah) {
      localStorage.setItem("surah", JSON.stringify(selectedSurah))
    }
  }, [selectedSurah])

  // حفظ القارئ
  useEffect(() => {
    localStorage.setItem("reciter", JSON.stringify(selectedReciter))
  }, [selectedReciter])

  const getAudioUrl = () => {
    if (!selectedSurah) return ""
    return `${selectedReciter.server}/${String(selectedSurah.id).padStart(3, "0")}.mp3`
  }

  const pageNumber = selectedSurah ? surahPages[selectedSurah.id] || 1 : 1

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>📖 المصحف + التلاوة</h1>

      {/* اختيار القارئ */}
      <h2>🎙️ اختر القارئ</h2>
      <select
        value={reciters.findIndex(r => r.name === selectedReciter.name)}
        onChange={(e) =>
          setSelectedReciter(reciters[parseInt(e.target.value)])
        }
      >
        {reciters.map((r, i) => (
          <option key={i} value={i}>
            {r.name}
          </option>
        ))}
      </select>

      {/* اختيار السورة */}
      <h2 style={{ marginTop: "20px" }}>📚 اختر سورة</h2>

      {surahs.map((s) => (
        <div key={s.id} style={{ margin: "10px" }}>
          <button onClick={() => setSelectedSurah(s)}>
            {s.name}
          </button>
        </div>
      ))}

      {/* العرض */}
      {selectedSurah && (
        <div style={{ marginTop: "30px" }}>
          <h3>
            🎧 سورة {selectedSurah.name} - {selectedReciter.name}
          </h3>

          {/* الصوت */}
          <audio key={getAudioUrl()} controls style={{ width: "100%" }}>
            <source src={getAudioUrl()} type="audio/mpeg" />
          </audio>

          {/* المصحف */}
          <div style={{ marginTop: "20px" }}>
            <iframe
              src={`https://quran.com/page/${pageNumber}`}
              width="100%"
              height="500px"
              style={{ border: "none" }}
            />
          </div>
        </div>
      )}
    </div>
  )
}