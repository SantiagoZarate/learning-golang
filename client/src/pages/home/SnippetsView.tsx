import { NoSnippetsFound } from "@/components/snippet/NoSnippetsFound"
import { SnippetList } from "@/components/snippet/SnippetList"
import { AnimatedSnippetLoaders } from "@/components/snippet/SnippetLoader"
import { SnippetsError } from "@/components/snippet/SnippetsError"
import { Snippet } from "@/types/snippet"

interface Props {
  data: Snippet[],
  isError: boolean,
  isLoading: boolean
}

export function SnippetsView({ data, isError, isLoading }: Props) {
  console.log(data)
  const isEmpty = data?.length === 0
  const snippetsOrderedByID = data?.sort((a, b) => b.id - a.id)

  return (
    <>
      {isLoading && <AnimatedSnippetLoaders />}
      {isError && <SnippetsError />}
      {!isError && !isLoading && isEmpty && <NoSnippetsFound />}
      {!isError && !isEmpty && !isLoading && <SnippetList snippets={snippetsOrderedByID!} />}
    </>
  )
}
