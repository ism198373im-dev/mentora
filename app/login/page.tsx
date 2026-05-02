"use client"

import { useState } from "react"
import { auth, db } from "@/lib/firebase"
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth"
import { doc, setDoc, getDoc } from "firebase/firestore"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  // 🔐 تسجيل دخول
  const login = async () => {
    setLoading(true)

    try {
      const userCred = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )

      const user = userCred.user

      // 👇 نجيب role من Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid))

      if (!userDoc.exists()) {
        alert("المستخدم غير موجود في النظام")
        return
      }

      const role = userDoc.data().role

      // 🚀 توجيه حسب الدور
      if (role === "teacher") {
        router.push("/dashboard")
      } else if (role === "admin") {
        router.push("/admin")
      } else {
        router.push("/tutors")
      }
    } catch (error) {
      alert("❌ خطأ في تسجيل الدخول")
      console.log(error)
    }

    setLoading(false)
  }

  // 🆕 إنشاء حساب
  const register = async () => {
    setLoading(true)

    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )

      const user = userCred.user

      // 💾 إنشاء مستخدم في Firestore
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        role: "student", // 👤 افتراضي طالب
        createdAt: new Date(),
      })

      router.push("/tutors")
    } catch (error) {
      alert("❌ خطأ في إنشاء الحساب")
      console.log(error)
    }

    setLoading(false)
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f6f7fb",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Card */}
      <div
        style={{
          background: "white",
          padding: 25,
          borderRadius: 12,
          width: 340,
          boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: 20 }}>
          🔐 تسجيل الدخول
        </h2>

        {/* Email */}
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={input}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={input}
        />

        {/* Login */}
        <button onClick={login} disabled={loading} style={btnPrimary}>
          {loading ? "جاري الدخول..." : "دخول"}
        </button>

        {/* Register */}
        <button onClick={register} disabled={loading} style={btnSecondary}>
          إنشاء حساب
        </button>
      </div>
    </div>
  )
}

// 🎨 Styles
const input: React.CSSProperties = {
  width: "100%",
  padding: 10,
  marginBottom: 10,
  borderRadius: 8,
  border: "1px solid #ddd",
}

const btnPrimary: React.CSSProperties = {
  width: "100%",
  padding: 10,
  marginBottom: 10,
  borderRadius: 8,
  border: "none",
  background: "#2563eb",
  color: "white",
  cursor: "pointer",
}

const btnSecondary: React.CSSProperties = {
  width: "100%",
  padding: 10,
  borderRadius: 8,
  border: "none",
  background: "#16a34a",
  color: "white",
  cursor: "pointer",
}