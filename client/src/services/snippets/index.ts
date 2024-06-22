import envs from "@/config/envs"
import { Snippet } from "@/types/snippet"
import { fetcher } from "../fetcher"
import { SnippetAPI } from "@/types/api"

const prodSnippetAPI: SnippetAPI = {
  createSnippet(data) {
    return fetcher("/snippets", "POST", data)
  },
  deleteSnippetById(id) {
    return fetcher(`/snippets/${id}`, "DELETE")
  },
  getSnippetById(id) {
    return fetcher(`/snippets/${id}`, "GET")
  },
  getSnippets() {
    return fetcher<Snippet[]>("/snippets", "GET").then(res => res.data!)
  },
}

const devSnippetAPI: SnippetAPI = {
  createSnippet(data) {
    return new Promise((resolve) => {
      setTimeout(() => {
        fetch("/src/data/snippets.json")
          .then(res => res.json())
          .then(res => {
            console.log("Agregando data...", data)
            resolve(res)
          })
      }, 2000);
    });
  },
  deleteSnippetById(id) {
    return new Promise((resolve) => {
      setTimeout(() => {
        fetch("/src/data/snippets.json")
          .then(res => res.json())
          .then((res: any[]) => res.find(r => r.id === id))
          .then(data => resolve(data));
      }, 2000);
    });
  },
  getSnippetById(id) {
    return new Promise((resolve) => {
      setTimeout(() => {
        fetch("/src/data/snippets.json")
          .then(res => res.json())
          .then((res: any[]) => res.find(r => r.id === id))
          .then(data => resolve(data));
      }, 2000);
    });
  },
  getSnippets() {
    return new Promise((resolve) => {
      setTimeout(() => {
        fetch("/src/data/snippets.json")
          .then(res => res.json())
          .then(data => resolve(data));
      }, 2000);
    });
  },
}

export default envs.DEVELOPMENT
  ? devSnippetAPI
  : prodSnippetAPI