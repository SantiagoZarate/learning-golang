import { SnippetAPI } from "@/types/api";
import { Snippet } from "@/types/snippet";

export const testSnippetAPI: SnippetAPI = {
  async createSnippet(_data, _token) {
    return {
      ok: true,
      message: "snippet created",
      data: "" as unknown as Snippet
    };
  },
  async deleteSnippetById(_id, _token) {
    return {
      message: "deleted succesfully",
      ok: true,
      data: null
    }
  },
  async getPrivateSnippets(_token) {
    return []
  },
  async getSnippetById(id) {
    return {
      message: "",
      ok: true,
      data: {
        id,
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
    }
  },
  async getSnippets() {
    return []
  },
}