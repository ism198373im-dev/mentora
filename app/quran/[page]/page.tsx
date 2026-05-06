"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Page({ params }: any) {
  const router = useRouter();
  const page = parseInt(params?.page || "1");

  const [startX, setStartX] = useState<number | null>(null);
  const [zoom, setZoom] = useState(1);
  const [dark, setDark] = useState(false);

  // حفظ الصفحة
  useEffect(() => {
    localStorage.setItem("lastPage", page.toString());
  }, [page]);

  // الوضع الليلي
  useEffect(() => {
    const saved = localStorage.getItem("darkMode");
    if (saved === "true") setDark(true);
  }, []);

  const toggleDark = () => {
    setDark(!dark);
    localStorage.setItem("darkMode", (!dark).toString());
  };

  // Full screen
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  // swipe
  const handleTouchStart = (e: any) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: any) => {
    if (startX === null) return;

    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;

    if (diff > 50 && page < 604) {
      router.push(`/quran/${page + 1}`);
    }

    if (diff < -50 && page > 1) {
      router.push(`/quran/${page - 1}`);
    }
  };

  return (
    <div
      style={{
        textAlign: "center",
        padding: 10,
        background: dark ? "#111" : "#fff",
        color: dark ? "#fff" : "#000",
        minHeight: "100vh",
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <h3>📖 صفحة {page}</h3>

      {/* أزرار التحكم */}
      <div style={{ marginBottom: 10 }}>
        <button onClick={toggleDark}>
          {dark ? "☀️" : "🌙"}
        </button>

        <button onClick={toggleFullScreen} style={{ marginLeft: 10 }}>
          ⛶
        </button>
      </div>

      {/* الصورة */}
      <div style={{ overflow: "auto" }}>
        <img
          src={`/quran-pages/${page}.jpg`}
          alt="quran page"
          style={{
            transform: `scale(${zoom})`,
            maxWidth: "100%",
          }}
        />
      </div>

      {/* zoom */}
      <div style={{ marginTop: 10 }}>
        <button onClick={() => setZoom(zoom + 0.2)}>+</button>
        <button onClick={() => setZoom(Math.max(1, zoom - 0.2))}>
          -
        </button>
      </div>
    </div>
  );
}