"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const snap = await getDocs(collection(db, "teachers"));

        const data = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setTeachers(data);
      } catch (error) {
        console.log(error);
      }

      setLoading(false);
    };

    fetchTeachers();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl font-bold">
        Loading...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white px-6 py-16">

      {/* Header */}
      <div className="max-w-6xl mx-auto text-center mb-16">

        <div className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-medium mb-4">
          👨‍🏫 أفضل المدرسين
        </div>

        <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
          استكشف المدرسين المحترفين
        </h1>

        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          اختر المدرس المناسب لك واحجز حصتك بسهولة في دقائق.
        </p>

      </div>

      {/* Teachers Grid */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">

        {teachers.map((teacher) => (
          <div
            key={teacher.id}
            className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden hover:-translate-y-2 transition duration-300"
          >

            {/* Top */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-700 h-32 flex items-center justify-center text-6xl text-white">
              👨‍🏫
            </div>

            {/* Content */}
            <div className="p-6">

              <div className="flex items-center justify-between mb-4">

                <h2 className="text-2xl font-bold text-gray-900">
                  {teacher.name}
                </h2>

                <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">
                  ⭐ 4.9
                </span>

              </div>

              <p className="text-gray-500 mb-3">
                📚 {teacher.subject}
              </p>

              <p className="text-gray-700 font-semibold text-lg mb-6">
                💰 {teacher.price} EGP / hour
              </p>

              {/* Features */}
              <div className="space-y-2 mb-6 text-sm text-gray-500">

                <div>🎓 خبرة عالية في التدريس</div>
                <div>👥 طلاب كثيرون</div>
                <div>⚡ حجز سريع وسهل</div>

              </div>

              {/* Button */}
              <Link
                href={`/book/${teacher.id}`}
                className="block text-center bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-xl font-semibold shadow-md"
              >
                احجز الآن
              </Link>

            </div>

          </div>
        ))}

      </div>

      {/* Empty */}
      {teachers.length === 0 && (
        <div className="text-center text-gray-500 mt-20 text-xl">
          لا يوجد مدرسون حالياً
        </div>
      )}

    </main>
  );
}