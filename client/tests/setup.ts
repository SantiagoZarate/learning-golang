import { Snippet } from "@/types/snippet"

export const baseURL = "http://localhost:8001/"
export const credentials = {
  password: "userpass",
  username: "username"
}
export const testSnippet: Snippet = {
  id: 1,
  author: {
    id: 1,
    pfp: "",
    username: "username"
  },
  title: "snippet test",
  content: "snippet test",
  created: new Date(),
  expires: new Date(),
  isPrivate: false,
  sharedWith: []
}