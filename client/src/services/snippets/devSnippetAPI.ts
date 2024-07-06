import { SnippetAPI } from "@/types/api"
import snippets from '@/data/snippets.json'

export const devSnippetAPI: SnippetAPI = {
  createSnippet(data) {
    return new Promise((resolve) => {
      setTimeout(() => {
        fetch("/src/data/snippets.json")
          .then(res => res.json())
          .then(res => {
            console.log("Agregando data...", data)
            resolve(res)
          })
      }, 2000)
    })
  },
  deleteSnippetById(id, _token) {
    return new Promise((resolve) => {
      setTimeout(() => {
        fetch("/src/data/snippets.json")
          .then(res => res.json())
          .then((res: any[]) => res.find(r => r.id === id))
          .then(data => resolve(data))
      }, 2000)
    })
  },
  getSnippetById(id) {
    return new Promise((resolve) => {
      setTimeout(() => {
        fetch("/src/data/snippets.json")
          .then(res => res.json())
          .then((res: any[]) => res.find(r => r.id === id))
          .then(data => resolve(data))
      }, 2000)
    })
  },
  getSnippets() {
    return new Promise((resolve, _reject) => {
      setTimeout(() => {
        fetch("/src/data/snippets.json")
          .then(res => resolve(res.json())
            // const res = new Response(JSON.stringify(snippets))
            // resolve(res.json())
          )
        // .then(res => {
        //   if (!res.ok) {
        //     throw new Error('Network response was not ok')
        //   }
        //   return res.json()
        // })
        // .then(data => resolve(data))
        // .catch(error => reject(error)) // Reject the promise on error
      }, 2000)
    })
  },
  getPrivateSnippets() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        fetch("/src/data/private-snippets.json")
          .then(res => {
            if (!res.ok) {
              throw new Error('Network response was not ok')
            }
            return res.json()
          })
          .then(data => resolve(data))
          .catch(error => reject(error)) // Reject the promise on error
      }, 2000)
    })
  }
}