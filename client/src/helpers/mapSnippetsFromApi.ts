import { type Snippet, type RawSnippet } from "@/types/snippet";

export function mapSnippetsArr(data: RawSnippet[]): Snippet[] {
  return data.map(d => mapSnippet(d))
}

export function mapSnippet(data: RawSnippet): Snippet {
  return {
    content: data.Content,
    created: new Date(data.Created),
    expires: new Date(data.Expires),
    id: data.Id,
    title: data.Title
  }
}