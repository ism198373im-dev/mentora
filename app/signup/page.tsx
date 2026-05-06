"use client";

import { useState } from "react";
import { auth, db } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSignUp = async () => {
    setLoading(true);

    try {
      // 1️⃣ Create user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      // 2️⃣ Save user in Firestore
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        role: "user",
        plan: "free",
        createdAt: new Date().toISOString(),
      });

      // 3️⃣ Send welcome email (SaaS feature)
      await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          subject: "Welcome to Mentora 🎉",
          message:
            "Your account has been created successfully. Start learning now 🚀",
        }),
      });

      alert("Account created successfully ✅");

      router.push("/login");
    } catch (error: any) {
      alert(error.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">

      <div className="bg-white shadow p-6 rounded-xl w-80">

        <h1 className="text-2xl font-bold mb-4 text-center">
          Sign Up
        </h1>

        <input
          className="border p-2 w-full mb-3"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="border p-2 w-full mb-4"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleSignUp}
          disabled={loading}
          className="bg-green-600 text-white w-full py-2 rounded"
        >
          {loading ? "Creating..." : "Create Account"}
        </button>

      </div>

    </div>
  );
}