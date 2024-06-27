import { useQuery } from "@tanstack/react-query"
import snippetAPI from '@/services/snippets'
import { Snippet } from "@/types/snippet"
import { SnippetsView } from "../home/SnippetsView"

export function PrivatePage() {
  const { data, isError, isLoading } = useQuery<Snippet[]>({
    queryKey: ["snippets-private"],
    queryFn: snippetAPI.getPrivateSnippets,
  })

  return (
    <SnippetsView data={data ?? []} isError={isError} isLoading={isLoading} />
  )
}
