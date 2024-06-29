import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import snippetAPI from '@/services/snippets'
import { Snippet } from "@/types/snippet";
import { useSession } from "./useSession";

export function useSnippets() {
  const { getToken, userIsLogged, userCredentials: { username } } = useSession()
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
    return publicSnp.data?.find(snippet => snippet.id === id)?.author.username === username
  }

  return {
    deleteSnippet: deleteSnippet.mutate,
    publicSnp,
    privateSnp,
    userIsAuthorOfSnippet
  }
}