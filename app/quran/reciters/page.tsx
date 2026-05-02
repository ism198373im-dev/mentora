"use client"

import { useState } from "react"

const reciters = [
  { name: "Alafasy", url: "https://server1.com/alafasy/" },
  { name: "Sudais", url: "https://server1.com/sudais/" },
  { name: "Shuraim", url: "https://server1.com/shuraim/" },
]

export default function RecitersPage() {
  const [selected, setSelected] = useState(reciters[0])

  return (
    <div style={{ padding: 20 }}>
      <h1>🎧 اختيار القارئ</h1>

      <select
        onChange={(e) =>
          setSelected(reciters[Number(e.target.value)])
        }
      >
        {reciters.map((r, i) => (
          <option key={i} value={i}>
            {r.name}
          </option>
        ))}
      </select>

      <p>القارئ الحالي: {selected.name}</p>
    </div>
  )
}