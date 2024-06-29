import { SnippetFormType } from "@/helpers/createSnippetSchema"
import { Snippet } from "./snippet"

export type Methods = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

export interface ResponseAPI<T> {
  ok: boolean,
  message: string,
  data?: T
}

export interface SnippetAPI {
  createSnippet: (data: SnippetFormType, token: any) => Promise<ResponseAPI<Snippet>>
  deleteSnippetById: (id: number, token: any) => Promise<ResponseAPI<null>>
  getSnippets: () => Promise<Snippet[]>
  getSnippetById: (id: number) => Promise<ResponseAPI<Snippet>>
  getPrivateSnippets: (token: any) => Promise<Snippet[]>
}