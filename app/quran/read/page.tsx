"use client"

import { useState } from "react"

export default function MushafPage() {
  const [page, setPage] = useState(1)

  return (
    <div style={{ padding: 20 }}>
      <h1>📖 المصحف الشريف</h1>

      <div style={{ marginTop: 20 }}>
        <img
          src={`/quran-pages/${page}.png`}
          style={{ width: "100%", maxWidth: 500 }}
        />
      </div>

      <div style={{ marginTop: 20 }}>
        <button onClick={() => setPage(p => Math.max(1, p - 1))}>
          ⬅️ السابق
        </button>

        <span style={{ margin: "0 10px" }}>
          الصفحة {page}
        </span>

        <button onClick={() => setPage(p => p + 1)}>
          التالي ➡️
        </button>
      </div>
    </div>
  )
}