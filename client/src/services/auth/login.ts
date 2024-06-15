import envs from "@/config/envs"
import { LoginPayload } from "@/types/auth"

export function login(data: LoginPayload) {
  return fetch(envs.AUTH_API_URL + "/login", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  }).then(res => res.json())
}