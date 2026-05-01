import Link from "next/link"

export default function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #f6f7fb, #ffffff)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <div style={{ maxWidth: 800, textAlign: "center" }}>
        
        {/* Title */}
        <h1 style={{ fontSize: 40, marginBottom: 10 }}>
          🚀 Mentora
        </h1>

        {/* Subtitle */}
        <p style={{ fontSize: 18, color: "#555", marginBottom: 30 }}>
          منصة تساعدك تلاقي أفضل المدرسين وتحجز بسهولة
        </p>

        {/* Buttons */}
        <div style={{ marginBottom: 40 }}>
          <Link href="/tutors">
            <button
              style={{
                padding: "12px 20px",
                marginRight: 10,
                borderRadius: 8,
                border: "none",
                background: "#2563eb",
                color: "white",
                cursor: "pointer",
              }}
            >
              👨‍🏫 عرض المدرسين
            </button>
          </Link>

          <Link href="/login">
            <button
              style={{
                padding: "12px 20px",
                borderRadius: 8,
                border: "1px solid #ddd",
                background: "white",
                cursor: "pointer",
              }}
            >
              🔐 تسجيل الدخول
            </button>
          </Link>
        </div>

        {/* Features */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 15,
          }}
        >
          <div style={card}>
            🎯 <h3>اختار مدرسك</h3>
            <p>تصفح أفضل المدرسين بسهولة</p>
          </div>

          <div style={card}>
            📅 <h3>احجز بسهولة</h3>
            <p>حجز سريع بدون تعقيد</p>
          </div>

          <div style={card}>
            🔐 <h3>حسابك آمن</h3>
            <p>بياناتك محفوظة في Firebase</p>
          </div>
        </div>
      </div>
    </div>
  )
}

const card: React.CSSProperties = {
  background: "white",
  padding: 20,
  borderRadius: 12,
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  textAlign: "center",
}