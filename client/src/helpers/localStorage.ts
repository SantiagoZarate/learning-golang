import { UserCredentials } from "@/hooks/useSession"

export function clearUserCredentials() {
  localStorage.removeItem("username")
  localStorage.removeItem("role")
  localStorage.removeItem("pfp")
}

export function storeUserCredentials({ role, username, pfp }: UserCredentials) {
  localStorage.setItem("username", username)
  localStorage.setItem("role", role)
  localStorage.setItem("pfp", pfp)

}

export function retrieveUserCredentials(): UserCredentials {
  const username = localStorage.getItem("username")!
  const role = localStorage.getItem("role")!
  const pfp = localStorage.getItem("pfp")!

  return {
    username,
    role,
    pfp
  }
}