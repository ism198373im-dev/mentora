import Link from "next/link"

export default function Home() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🚀 Mentora</h1>
      <p style={styles.subtitle}>منصة تعليم + قرآن + مدرسين</p>

      <div style={styles.grid}>
        <Link style={styles.card} href="/teachers">👨‍🏫 المدرسين</Link>
        <Link style={styles.card} href="/bookings">📅 الحجوزات</Link>
        <Link style={styles.card} href="/dashboard">📊 الداشبورد</Link>
        <Link style={styles.card} href="/quran">📖 القرآن الكريم</Link>
        <Link style={styles.card} href="/admin">⚙️ الأدمن</Link>
      </div>
    </div>
  )
}

const styles: any = {
  container: { padding: "20px", textAlign: "center" },
  title: { fontSize: "32px", marginBottom: "10px" },
  subtitle: { color: "#666" },
  grid: {
    display: "grid",
    gap: "10px",
    marginTop: "20px",
  },
  card: {
    padding: "12px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    textDecoration: "none",
  },
}