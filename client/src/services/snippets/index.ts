import envs from "@/config/envs"
import { devSnippetAPI } from "./devSnippetAPI"
import { prodSnippetAPI } from "./prodSnippetAPI"
import { SnippetAPI } from "@/types/api";
import { testSnippetAPI } from "./testSnippetsAPI";

let snippetAPI: SnippetAPI;

if (envs.MODE === "production") {
  console.log("EJECUTANDO EN PRODUCTION MODE")
  snippetAPI = prodSnippetAPI
} else if (envs.MODE === 'testing') {
  console.log("EJECUTANDO EN TESTING MODE")
  snippetAPI = testSnippetAPI
} else {
  console.log("EJECUTANDO EN DEVELOPMENT MODE")
  snippetAPI = devSnippetAPI
}

export default snippetAPI;