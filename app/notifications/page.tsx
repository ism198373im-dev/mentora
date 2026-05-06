"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    const snap = await getDocs(collection(db, "notifications"));

    const data = snap.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    }));

    setNotifications(data);
  };

  return (
    <div style={{ padding: 30 }}>
      <h1>🔔 الإشعارات</h1>

      {notifications.length === 0 ? (
        <p>لا يوجد إشعارات</p>
      ) : (
        notifications.map((n) => (
          <div
            key={n.id}
            style={{
              padding: 10,
              border: "1px solid #ddd",
              marginTop: 10,
              borderRadius: 8,
            }}
          >
            <p>{n.message}</p>
            <small>👤 {n.studentName}</small>
          </div>
        ))
      )}
    </div>
  );
}