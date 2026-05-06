"use client"

import { useState } from "react"

export default function MushafPage() {
  const [page, setPage] = useState(1)

  const totalPages = 604

  const nextPage = () => {
    if (page < totalPages) setPage(page + 1)
  }

  const prevPage = () => {
    if (page > 1) setPage(page - 1)
  }

  return (
    <div style={{ padding: 20, textAlign: "center" }}>
      <h1>📖 المصحف الشريف</h1>

      {/* مكان الصورة (هنبدله بصور لاحقًا) */}
      <div
        style={{
          margin: "20px auto",
          width: "300px",
          height: "450px",
          border: "2px solid #ccc",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 24,
          borderRadius: 10
        }}
      >
        صفحة رقم {page}
      </div>

      {/* أزرار التحكم */}
      <div style={{ marginTop: 20 }}>
        <button onClick={prevPage} disabled={page === 1}>
          ⬅ السابق
        </button>

        <span style={{ margin: "0 15px" }}>
          {page} / {totalPages}
        </span>

        <button onClick={nextPage} disabled={page === totalPages}>
          التالي ➡
        </button>
      </div>
    </div>
  )
}