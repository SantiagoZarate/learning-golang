import envs from "@/config/envs"
import { Methods } from "@/types/api"

interface Options {
  path: string,
  method?: Methods,
  payload?: unknown
  token?: any
}

export function fetcher<T>({ method = "GET", path, token, payload }: Options): Promise<T> {
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
