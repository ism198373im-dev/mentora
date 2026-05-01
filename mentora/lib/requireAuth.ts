import { auth } from "@/lib/firebase"
import { getRole } from "@/lib/getRole"

/**
 * 🔐 حماية الصفحات حسب تسجيل الدخول + الدور
 */
export const requireAuth = async (
  router: any,
  allowedRoles?: string[]
) => {
  const user = auth.currentUser

  // ❌ مش عامل login
  if (!user) {
    router.push("/login")
    return false
  }

  // 🔐 لو مفيش تحديد roles نسمح لأي مستخدم
  if (!allowedRoles) return true

  const role = await getRole()

  if (!role) {
    router.push("/")
    return false
  }

  // ❌ لو الدور مش مسموح
  if (!allowedRoles.includes(role)) {
    router.push("/")
    return false
  }

  return true
}