import { useQuery } from "@tanstack/react-query"
import snippetAPI from '@/services/snippets'
import { Snippet } from "@/types/snippet"
import { SnippetsView } from "../home/SnippetsView"
import { useGlobalContext } from "@/hooks/useGlobalContext"

export function PrivatePage() {
  const { getToken } = useGlobalContext()

  console.log(getToken())

  const { data, isError, isLoading } = useQuery<Snippet[]>({
    queryKey: ["snippets-private"],
    queryFn: () => snippetAPI.getPrivateSnippets(getToken()),
  })

  return (
    <SnippetsView data={data ?? []} isError={isError} isLoading={isLoading} />
  )
}
