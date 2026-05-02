export default function SurahsPage() {
  const surahs = [
    "الفاتحة",
    "البقرة",
    "آل عمران",
    "النساء",
    "المائدة",
  ]

  return (
    <div style={{ padding: 20 }}>
      <h1>📚 السور</h1>

      <ul>
        {surahs.map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ul>
    </div>
  )
}