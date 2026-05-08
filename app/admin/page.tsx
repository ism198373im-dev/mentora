"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

export default function AdminPage() {
  const [teachers, setTeachers] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [price, setPrice] = useState(0);

  const fetchTeachers = async () => {
    const snap = await getDocs(collection(db, "teachers"));
    setTeachers(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const addTeacher = async () => {
    await addDoc(collection(db, "teachers"), {
      name,
      subject,
      price,
      timeSlots: ["10:00", "12:00", "14:00"],
    });

    setName("");
    setSubject("");
    setPrice(0);
    fetchTeachers();
  };

  const removeTeacher = async (id: string) => {
    await deleteDoc(doc(db, "teachers", id));
    fetchTeachers();
  };

  return (
    <div className="p-10">

      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>

      {/* Add Teacher */}
      <div className="bg-white p-4 shadow rounded mb-6">

        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 m-1"
        />

        <input
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="border p-2 m-1"
        />

        <input
          placeholder="Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="border p-2 m-1"
        />

        <button
          onClick={addTeacher}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Add Teacher
        </button>
      </div>

      {/* List */}
      {teachers.map((t) => (
        <div key={t.id} className="p-3 bg-gray-100 mb-2 flex justify-between">
          <div>
            {t.name} - {t.subject} - {t.price} EGP
          </div>

          <button
            onClick={() => removeTeacher(t.id)}
            className="text-red-600"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}