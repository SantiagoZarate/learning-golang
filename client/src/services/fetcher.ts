import envs from "@/config/envs"
import { Methods } from "@/types/api"

export function fetcher<T>(path: string, method: Methods, payload?: unknown, token?: any): Promise<T> {
  const options: RequestInit = {
    method: method,
  }

  if (method === 'POST') {
    tokenizeRequest(options, payload, token)
  }

  return fetch(envs.API_URL + path, options)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Intenal server error")
      }
      return res.json()
    }).catch((err: Error) => (err))
}

function tokenizeRequest(options: RequestInit, payload: any, token: any) {
  options = {
    body: JSON.stringify(payload),
    headers: {
      ...options.headers,
      "Content-Type": "application/json",
      "access_token": token,
    },
    credentials: "include",
  }
}