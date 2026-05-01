import { auth, db } from "@/lib/firebase"
import { doc, getDoc } from "firebase/firestore"

/**
 * 🔐 جلب دور المستخدم (role)
 * يرجع: "student" | "teacher" | null
 */
export const getRole = async (): Promise<string | null> => {
  const user = auth.currentUser

  if (!user) return null

  try {
    const userRef = doc(db, "users", user.uid)
    const userSnap = await getDoc(userRef)

    if (!userSnap.exists()) return null

    const data = userSnap.data()

    return data.role || null
  } catch (error) {
    console.log("Error getting role:", error)
    return null
  }
}