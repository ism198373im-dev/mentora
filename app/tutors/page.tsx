"use client";

import { useEffect, useState } from "react";

type Tutor = {
  id: string;
  name: string;
  subject: string;
  price: number;
};

export default function TutorsPage() {
  const [tutors, setTutors] = useState<Tutor[]>([]);

  useEffect(() => {
    // بيانات تجريبية (بعد كده نربطها بـ Firebase)
    const data: Tutor[] = [
      { id: "1", name: "Ahmed Ali", subject: "Math", price: 100 },
      { id: "2", name: "Sara Mohamed", subject: "English", price: 120 },
      { id: "3", name: "Omar Hassan", subject: "Physics", price: 150 },
    ];

    setTutors(data);
  }, []);

  return (
    <div style={{ padding: 30 }}>
      <h1 style={{ fontSize: 28, marginBottom: 20 }}>
        👨‍🏫 Available Tutors
      </h1>

      <div style={{ display: "grid", gap: 15 }}>
        {tutors.map((tutor) => (
          <div
            key={tutor.id}
            style={{
              border: "1px solid #ddd",
              padding: 15,
              borderRadius: 10,
            }}
          >
            <h2>{tutor.name}</h2>
            <p>📚 Subject: {tutor.subject}</p>
            <p>💰 Price: {tutor.price} EGP</p>
          </div>
        ))}
      </div>
    </div>
  );
}