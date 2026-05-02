const reciters = [
  "مشاري العفاسي",
  "عبدالباسط عبدالصمد",
  "السديس",
  "المنشاوي",
]

export default function RecitersPage() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>🎧 القراء</h1>

      <div style={{ marginTop: "20px" }}>
        {reciters.map((r) => (
          <div key={r} style={card}>
            🎤 {r}
          </div>
        ))}
      </div>
    </div>
  )
}

const card = {
  padding: "10px",
  border: "1px solid #ddd",
  marginBottom: "10px",
  borderRadius: "8px",
}