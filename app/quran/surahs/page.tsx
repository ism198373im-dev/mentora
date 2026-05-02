const surahs = [
  "الفاتحة",
  "البقرة",
  "آل عمران",
  "النساء",
  "المائدة",
]

export default function SurahsPage() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>📚 السور</h1>

      <div style={{ marginTop: "20px" }}>
        {surahs.map((s) => (
          <div key={s} style={cardStyle}>
            📖 {s}
          </div>
        ))}
      </div>
    </div>
  )
}

const cardStyle = {
  padding: "10px",
  border: "1px solid #ddd",
  marginBottom: "10px",
  borderRadius: "8px",
}