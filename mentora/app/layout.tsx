export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar">
      <body
        style={{
          margin: 0,
          fontFamily: "system-ui",
          background: "#f6f7fb",
        }}
      >
        {/* Navbar */}
        <header style={nav}>
          <div style={{ fontWeight: "bold" }}>🚀 Mentora</div>

          <nav style={{ display: "flex", gap: 15 }}>
            <a href="/" style={link}>Home</a>
            <a href="/tutors" style={link}>Teachers</a>
            <a href="/bookings" style={link}>Bookings</a>
            <a href="/dashboard" style={link}>Dashboard</a>
            <a href="/admin" style={link}>Admin</a>
          </nav>
        </header>

        {/* Page */}
        <main style={{ padding: 20 }}>{children}</main>
      </body>
    </html>
  )
}

const nav: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "15px 20px",
  background: "white",
  boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
  position: "sticky",
  top: 0,
}

const link: React.CSSProperties = {
  textDecoration: "none",
  color: "#333",
  fontSize: 14,
}