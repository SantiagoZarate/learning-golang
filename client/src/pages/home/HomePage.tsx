import { LockMicroIcon } from "@/components/icons/LockMiniIcon";
import { WorldwideMicroIcon } from "@/components/icons/WorldwideMicroIcon";
import { NoSnippetsFound } from "@/components/snippet/NoSnippetsFound";
import { SnippetList } from "@/components/snippet/SnippetList";
import { AnimatedSnippetLoaders } from "@/components/snippet/SnippetLoader";
import { SnippetsError } from "@/components/snippet/SnippetsError";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import snippetAPI from "@/services/snippets";
import { useQuery } from '@tanstack/react-query';
import { Snippet as SnippetType } from "../../types/snippet";
import { SnippetForm } from "./SnippetForm";
import { useState } from "react";

type ViewMode = 'public' | 'private'

export function HomePage() {
  const [viewMode, setViewMode] = useState<ViewMode>("public")

  const publicSnippets = useQuery<SnippetType[]>({
    queryKey: ["snippets"],
    queryFn: snippetAPI.getSnippets,
  })

  const privateSnippets = useQuery<SnippetType[]>({
    queryKey: ["snippets-private"],
    queryFn: snippetAPI.getPrivateSnippets,
  })

  const snippets = viewMode === 'public' ? publicSnippets.data : privateSnippets.data;
  const isLoading = viewMode === 'public' ? publicSnippets.isLoading : privateSnippets.isLoading;
  const isError = viewMode === 'public' ? publicSnippets.isError : privateSnippets.isError;

  const isEmpty = snippets?.length === 0
  const snippetsOrderedByID = snippets?.sort((a, b) => b.id - a.id)

  return (
    <>
      <section className="relative flex-1">
        <SnippetForm />
      </section>
      <section className="relative flex-1 flex flex-col max-h-full overflow-y-auto items-center justify-center">
        <header className="w-full flex gap-2 p-2">
          <Button
            className="flex-1 flex gap-2"
            disabled={viewMode === "public"}
            onClick={() => setViewMode("public")}>
            <WorldwideMicroIcon />
            Public
          </Button>
          <Button
            className="flex-1 flex gap-2"
            disabled={viewMode === "private"}
            onClick={() => setViewMode("private")}>
            <LockMicroIcon />
            Private
          </Button>
        </header>
        <article className="flex w-full p-2">
          {isLoading && <AnimatedSnippetLoaders />}
          {isError && <SnippetsError />}
          {!isLoading && isEmpty && <NoSnippetsFound />}
          {!isError && !isEmpty && !isLoading && <SnippetList snippets={snippetsOrderedByID!} />}
        </article>
        <Toaster />
      </section>
    </>
  )
}
