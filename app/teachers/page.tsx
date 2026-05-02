"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<any[]>([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      const querySnapshot = await getDocs(collection(db, "teachers"));

      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setTeachers(data);
    };

    fetchTeachers();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>👨‍🏫 المدرسين</h1>

      {teachers.length === 0 ? (
        <p>جاري التحميل...</p>
      ) : (
        teachers.map((t) => (
          <div key={t.id} style={{ marginBottom: "10px" }}>
            <h3>{t.name}</h3>
            <p>📚 {t.subject}</p>
            <p>💰 {t.price}</p>
          </div>
        ))
      )}
    </div>
  );
}