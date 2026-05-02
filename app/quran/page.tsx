import Link from "next/link"

export default function QuranHome() {
  return (
    <div style={{ padding: 20 }}>
      <h1>📖 القرآن الكريم</h1>

      <div style={{ display: "grid", gap: 15, marginTop: 20 }}>
        
        <Link href="/quran/read">
          📖 المصحف الشريف (قراءة)
        </Link>

        <Link href="/quran/surahs">
          📚 السور
        </Link>

        <Link href="/quran/reciters">
          🎧 اختيار القارئ
        </Link>

      </div>
    </div>
  )
}