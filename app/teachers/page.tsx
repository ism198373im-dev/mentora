"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";

export default function Teachers() {
  const [teachers, setTeachers] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const snap = await getDocs(collection(db, "teachers"));
      setTeachers(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 grid md:grid-cols-3 gap-4">
      {teachers.map(t => (
        <div key={t.id} className="border p-4 rounded shadow">
          <h2>{t.name}</h2>
          <p>{t.subject}</p>
          <p className="text-green-600">{t.price} EGP</p>

          <Link href={`/book/${t.id}`} className="text-blue-500">
            Book
          </Link>
        </div>
      ))}
    </div>
  );
}