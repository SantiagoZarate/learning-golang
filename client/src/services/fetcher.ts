import envs from "@/config/envs"
import { Methods, ResponseAPI } from "@/types/api"

export function fetcher<T>(path: string, method: Methods, payload?: any): Promise<ResponseAPI<T>> {
  const options: RequestInit = {
    method: method,
    headers: {
      "Content-Type": "application/json",
    }
  }

  if (method === 'POST') {
    options.body = JSON.stringify(payload)
  }

  return fetch(envs.API_URL + path, options)
    .then((res) => {
      if (!res.ok) {
        res.json().then(res => ({
          message: res.message || "Error",
          ok: false,
          data: null
        }))
      }
      return res.json()
    }).catch(() => ({
      message: "Error",
      ok: false,
      data: null
    }))
}