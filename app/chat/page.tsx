"use client";

import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";

import { auth, db } from "@/lib/firebase";

export default function ChatPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState("");

  const roomId = "global-room"; // ممكن نطوره لاحقًا لكل طالب/مدرس

  useEffect(() => {
    const q = query(
      collection(db, "chats", roomId, "messages"),
      orderBy("createdAt", "asc")
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setMessages(data);
    });

    return () => unsub();
  }, []);

  const sendMessage = async () => {
    if (!text.trim()) return;

    const user = auth.currentUser;

    await addDoc(collection(db, "chats", roomId, "messages"), {
      text,
      senderId: user?.uid || "anonymous",
      senderName: user?.email || "User",
      createdAt: serverTimestamp(),
    });

    setText("");
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6">

      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <h1 className="text-4xl font-extrabold mb-6">
          Chat 💬
        </h1>

        {/* Messages */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 h-[500px] overflow-y-auto space-y-4">

          {messages.map((msg) => (

            <div
              key={msg.id}
              className={`p-3 rounded-2xl max-w-[70%] ${
                msg.senderId === auth.currentUser?.uid
                  ? "bg-blue-600 text-white ml-auto"
                  : "bg-gray-100"
              }`}
            >

              <p className="text-sm font-semibold mb-1">
                {msg.senderName}
              </p>

              <p>{msg.text}</p>

            </div>

          ))}

        </div>

        {/* Input */}
        <div className="flex gap-3 mt-4">

          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type message..."
            className="flex-1 border border-gray-200 rounded-2xl px-4 py-3"
          />

          <button
            onClick={sendMessage}
            className="bg-blue-600 text-white px-6 py-3 rounded-2xl"
          >
            Send
          </button>

        </div>

      </div>

    </main>
  );
}