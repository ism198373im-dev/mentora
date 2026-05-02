import Link from "next/link"

export default function QuranPage() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>📖 القرآن الكريم</h1>

      <div style={{ display: "grid", gap: "10px", marginTop: "20px" }}>
        <Link href="/quran/mushaf">📖 المصحف</Link>
        <Link href="/quran/surahs">📚 السور</Link>
        <Link href="/quran/reciters">🎧 القراء</Link>
      </div>
    </div>
  )
}