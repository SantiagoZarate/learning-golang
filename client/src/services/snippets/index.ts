import envs from "@/config/envs"
import { SnippetFormType } from "@/helpers/createSnippetSchema"
import { Snippet } from "@/types/snippet"

type Methods = 'GET' | 'POST' | 'PUT' | 'DELETE'

interface ResponseAPI<T> {
  ok: boolean,
  message: string,
  data?: T[]
}

interface SnippetAPI {
  createSnippet: (data: SnippetFormType) => Promise<ResponseAPI<Snippet>>
  deleteSnippetById: (id: number) => Promise<ResponseAPI<null>>
  getSnippets: () => Promise<ResponseAPI<Snippet[]>>
  getSnippetById: (id: number) => Promise<ResponseAPI<Snippet>>
}

export function method<T>(path: string, method: Methods, payload?: any): Promise<ResponseAPI<T>> {
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

export const snippetAPI: SnippetAPI = {
  createSnippet(data) {
    return method("/snippets", "POST", data)
  },
  deleteSnippetById(id) {
    return method(`/snippets/${id}`, "DELETE")
  },
  getSnippetById(id) {
    return method(`/snippets/${id}`, "GET")
  },
  getSnippets() {
    return method("/snippets", "GET")
  },
}
