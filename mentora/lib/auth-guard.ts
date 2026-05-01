import { auth } from "@/lib/firebase"

export const requireAuth = (callback: () => void) => {
  const user = auth.currentUser

  if (!user) {
    window.location.href = "/login"
    return false
  }

  callback()
  return true
}