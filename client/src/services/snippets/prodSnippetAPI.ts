import { mapSnippetsArr } from "@/helpers/mapSnippetsFromApi"
import { SnippetAPI } from "@/types/api"
import { RawSnippet } from "@/types/snippet"
import { fetcher } from "../fetcher"

export const prodSnippetAPI: SnippetAPI = {
  createSnippet(data, token) {
    return fetcher({
      path: "/snippet/create",
      method: "POST",
      payload: data,
      token
    })
  },
  deleteSnippetById(id, token) {
    return fetcher({
      path: `/snippets/${id}`,
      method: "DELETE",
      token
    })
  },
  getSnippetById(id) {
    return fetcher({ path: `/snippet/view/${id}` })
  },
  getSnippets() {
    return fetcher<RawSnippet[]>({ path: "/snippet" }).then(res => mapSnippetsArr(res))
  },
  getPrivateSnippets(token) {
    return fetcher<RawSnippet[]>({ path: "/snippet/private", token }).then(res => mapSnippetsArr(res))
  }
}