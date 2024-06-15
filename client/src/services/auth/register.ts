import envs from "@/config/envs";
import { type RegisterPayload } from "@/types/auth";

export function register(data: RegisterPayload) {
  return fetch(envs.AUTH_API_URL + "/register", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    }
  }).then(res => res.json())
}