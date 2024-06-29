import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import snippetAPI from '@/services/snippets'
import { Snippet } from "@/types/snippet";
import { useSession } from "./useSession";
import { SnippetFormType } from "@/helpers/createSnippetSchema";

export function useSnippets() {
  const { getToken, userIsLogged, userCredentials } = useSession()
  const queryClient = useQueryClient()
  const publicSnp = useQuery({
    queryKey: ["snippets"],
    queryFn: snippetAPI.getSnippets
  })

  const privateSnp = useQuery({
    queryKey: ["snippets-private"],
    queryFn: () => snippetAPI.getPrivateSnippets(getToken()),
    enabled: userIsLogged
  })

  const createSnippet = useMutation({
    mutationKey: ["snippets"],
    mutationFn: (data: SnippetFormType) => snippetAPI.createSnippet(data, getToken()),
    onMutate: async (newSnippet: SnippetFormType) => {
      await queryClient.cancelQueries({ queryKey: ["snippets"] })
      const previousSnippets = queryClient.getQueryData(["snippets"])
      queryClient.setQueryData(["snippets"], (oldData: Snippet[]) => {
        if (oldData === null) {
          return [newSnippet]
        }
        return [
          {
            ...newSnippet,
            id: oldData.length + 1,
            isRecentlyAdded: true
          },
          ...oldData,
        ]
      })
      return { previousSnippets }
    },
    onError: (error, _, context) => {
      console.log(error)
      if (context?.previousSnippets !== undefined) {
        queryClient.setQueryData(["snippets"], context.previousSnippets)
      }
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["snippets"]
      })
    },
  });

  const deleteSnippet = useMutation({
    mutationKey: ["snippet-delete"],
    mutationFn: ({ id }: Pick<Snippet, "id">) => snippetAPI.deleteSnippetById(id, getToken()),
    onMutate: async ({ id }) => {
      await queryClient.cancelQueries({ queryKey: ["snippets"] })
      const previousData = queryClient.getQueryData(["snippets"])
      console.log("Eliminando snippet")
      queryClient.setQueryData(["snippets"], (prevStatus: Snippet[]) => {
        return prevStatus.filter(snippet => snippet.id !== id)
      })

      return { previousData }
    },
    onError: (error, _, context) => {
      console.log(error)
      if (context?.previousData !== undefined) {
        queryClient.setQueryData(["snippets"], context.previousData)
      }
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["snippets"]
      })
    },
  })

  const userIsAuthorOfSnippet = ({ id }: Pick<Snippet, "id">) => {
    const snippet = publicSnp.data?.find(snippet => snippet.id === id)

    if (!snippet) {
      return false
    }

    if (snippet.author === undefined || snippet.author.username === undefined) {
      return false
    }

    return snippet.author.username === userCredentials?.username
  }

  return {
    deleteSnippet: deleteSnippet.mutate,
    publicSnp,
    privateSnp,
    userIsAuthorOfSnippet,
    createSnippet
  }
}