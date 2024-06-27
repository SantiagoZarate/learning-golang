import { LockMicroIcon } from "@/components/icons/LockMiniIcon";
import { WorldwideMicroIcon } from "@/components/icons/WorldwideMicroIcon";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/components/ui/use-toast";
import { useGlobalContext } from "@/hooks/useGlobalContext";
import { useState } from "react";
import { SnippetForm } from "./SnippetForm";
import { SnippetsView } from "./SnippetsView";
import { useQuery } from "@tanstack/react-query";
import snippetAPI from '@/services/snippets'
import { redirect } from "react-router-dom";

type ViewMode = 'public' | 'private'

export function HomePage() {
  const { userIsLogged, getToken } = useGlobalContext()
  const [viewMode, setViewMode] = useState<ViewMode>("public")

  const publicSnp = useQuery({
    queryKey: ["snippets"],
    queryFn: snippetAPI.getSnippets
  })

  const privateSnp = useQuery({
    queryKey: ["snippets-private"],
    queryFn: () => snippetAPI.getPrivateSnippets(getToken()),
    enabled: userIsLogged
  })

  const { data, isError, isLoading } = viewMode === 'public' ? publicSnp : privateSnp

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
            onClick={() => { setViewMode("public") }}>
            <WorldwideMicroIcon />
            Public
          </Button>
          <Button
            className="flex-1 flex gap-2"
            disabled={viewMode === "private"}
            onClick={() => {
              userIsLogged
                ? setViewMode(() => ("private"))
                : toast({ title: "You must be logged in to view private snippets" })
              redirect("/home/private")
            }}>
            <LockMicroIcon />
            Private
          </Button>
        </header>
        <article className="flex w-full p-2">
          <SnippetsView data={data ?? []} isError={isError} isLoading={isLoading} />
        </article>
        <Toaster />
      </section >
    </>
  )
}
