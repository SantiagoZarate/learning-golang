import envs from "@/config/envs"
import { Methods } from "@/types/api"

export function fetcher<T>(path: string, method: Methods, payload?: unknown, token?: any): Promise<T> {
  const options: RequestInit = {
    method: method,
  }

  if (method === 'POST') {
    options.body = JSON.stringify(payload)
    options.credentials = "include"
    options.headers = {
      "Content-Type": "application/json",
      "access_token": token,
    }
  }

  return fetch(envs.API_URL + path, options)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Intenal server error")
      }
      return res.json()
    }).catch((err: Error) => (err))
}
