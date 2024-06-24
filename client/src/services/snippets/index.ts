import envs from "@/config/envs"
import { RawSnippet } from "@/types/snippet"
import { fetcher } from "../fetcher"
import { SnippetAPI } from "@/types/api"
import { mapSnippetsArr } from "@/helpers/mapSnippetsFromApi"

const prodSnippetAPI: SnippetAPI = {
  createSnippet(data, token) {
    return fetcher("/snippet/create", "POST", data, token)
  },
  deleteSnippetById(id) {
    return fetcher(`/snippets/${id}`, "DELETE")
  },
  getSnippetById(id) {
    return fetcher(`/snippet/view/${id}`, "GET")
  },
  getSnippets() {
    return fetcher<RawSnippet[]>("/", "GET").then(res => mapSnippetsArr(res))
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
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        fetch("/src/data/snippets.json")
          .then(res => {
            if (!res.ok) {
              throw new Error('Network response was not ok');
            }
            return res.json();
          })
          .then(data => resolve(data))
          .catch(error => reject(error)); // Reject the promise on error
      }, 2000);
    });
  },
}

export default envs.DEVELOPMENT
  ? devSnippetAPI
  : prodSnippetAPI