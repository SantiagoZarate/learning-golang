import { NoSnippetsFound } from "@/components/snippet/NoSnippetsFound";
import { SnippetList } from "@/components/snippet/SnippetList";
import { AnimatedSnippetLoaders } from "@/components/snippet/SnippetLoader";
import { SnippetsError } from "@/components/snippet/SnippetsError";
import snippetAPI from "@/services/snippets";
import { useQuery } from '@tanstack/react-query';
import { Snippet as SnippetType } from "../../types/snippet";
import { SnippetForm } from "./SnippetForm";
import { Toaster } from "@/components/ui/toaster";

export function HomePage() {
  const { data, isLoading, isError } = useQuery<SnippetType[]>({
    queryKey: ["snippets"],
    queryFn: snippetAPI.getSnippets,
  })

  const isEmpty = data?.length === 0

  const snippetsOrderedByID = data?.sort((a, b) => b.id - a.id)

  return (
    <>
      <section className="relative flex-1">
        <SnippetForm />
      </section>
      <section className="relative flex-1 flex p-4 max-h-full overflow-y-auto items-center justify-center">
        {isLoading && <AnimatedSnippetLoaders />}
        {isError && <SnippetsError />}
        {!isLoading && isEmpty && <NoSnippetsFound />}
        {!isError && !isEmpty && !isLoading && <SnippetList snippets={snippetsOrderedByID!} />}
        <Toaster />
      </section>
    </>
  )
}
