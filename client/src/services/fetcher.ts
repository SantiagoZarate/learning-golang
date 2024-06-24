import envs from "@/config/envs"
import { Methods } from "@/types/api"

// const [cookies] = useCookies(["access_token"])
export function fetcher<T>(path: string, method: Methods, payload?: unknown): Promise<T> {
  // console.log(cookies["access_token"])

  const options: RequestInit = {
    method: method,
  }

  if (method === 'POST') {
    options.body = JSON.stringify(payload)
    options.headers = {
      // "access_token": cookies["access_token"],
      "Content-Type": "application/json",
    }
  }

  console.log("Deberia estars fetcheando data")

  return fetch(envs.API_URL + path, options)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Intenal server error")
      }
      return res.json()
    }).catch((err: Error) => (err))
}