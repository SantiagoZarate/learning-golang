import { UserCredentials } from "@/hooks/useAuth"

export function clearUserCredentials() {
  localStorage.removeItem("username")
  localStorage.removeItem("role")
}

export function storeUserCredentials({ role, username }: UserCredentials) {
  localStorage.setItem("username", username)
  localStorage.setItem("role", role)
}

export function retrieveUserCredentials(): UserCredentials {
  const username = localStorage.getItem("username")!
  const role = localStorage.getItem("role")!
  return {
    username,
    role
  }
}