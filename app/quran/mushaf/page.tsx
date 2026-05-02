export default function MushafPage() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>📖 المصحف الشريف</h1>

      <p>اختر السورة لبدء القراءة</p>

      <div style={{ display: "grid", gap: "10px", marginTop: "20px" }}>
        <a href="/quran/surahs">📚 تصفح السور</a>
        <a href="/quran/reciters">🎧 اختيار قارئ</a>
      </div>
    </div>
  )
}