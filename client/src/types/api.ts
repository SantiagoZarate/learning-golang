import { SnippetFormType } from "@/helpers/createSnippetSchema"
import { Snippet } from "./snippet"

export type Methods = 'GET' | 'POST' | 'PUT' | 'DELETE'

export interface ResponseAPI<T> {
  ok: boolean,
  message: string,
  data?: T
}

export interface SnippetAPI {
  createSnippet: (data: SnippetFormType) => Promise<ResponseAPI<Snippet>>
  deleteSnippetById: (id: number) => Promise<ResponseAPI<null>>
  getSnippets: () => Promise<Snippet[]>
  getSnippetById: (id: number) => Promise<ResponseAPI<Snippet>>
}