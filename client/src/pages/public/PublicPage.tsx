import { NoSnippetsFound } from "@/components/snippet/NoSnippetsFound"
import { SnippetList } from "@/components/snippet/SnippetList"
import { AnimatedSnippetLoaders } from "@/components/snippet/SnippetLoader"
import { SnippetsError } from "@/components/snippet/SnippetsError"
import snippetAPI from '@/services/snippets'
import { Snippet } from "@/types/snippet"
import { useQuery } from "@tanstack/react-query"

export function PublicPage() {
  const { data, isError, isLoading } = useQuery<Snippet[]>({
    queryKey: ["snippets"],
    queryFn: snippetAPI.getSnippets,
  })

  const isEmpty = data?.length === 0
  const snippetsOrderedByID = data?.sort((a, b) => b.id - a.id)

  return (
    <>
      {isLoading && <AnimatedSnippetLoaders />}
      {isError && <SnippetsError />}
      {!isLoading && isEmpty && <NoSnippetsFound />}
      {!isError && !isEmpty && !isLoading && <SnippetList snippets={snippetsOrderedByID!} />}
    </>
  )
}
