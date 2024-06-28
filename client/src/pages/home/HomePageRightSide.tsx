import { LockMicroIcon } from "@/components/icons/LockMiniIcon"
import { WorldwideMicroIcon } from "@/components/icons/WorldwideMicroIcon"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { redirect } from "react-router-dom"
import { SnippetsView } from "./SnippetsView"
import { useSession } from "@/hooks/useSession"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import snippetAPI from '@/services/snippets'

type ViewMode = 'public' | 'private'

export function HomePageRightSide() {
  const { userIsLogged, getToken } = useSession()
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
      <header className="absolute top-0 w-full inset-0 z-50 h-min flex gap-2 p-2">
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
      <SnippetsView data={data ?? []} isError={isError} isLoading={isLoading} />
      <div className="absolute z-20 w-full h-full pointer-events-none bg-background [mask-image:linear-gradient(0deg,#000_5%,transparent_30%,transparent_90%,#000_95%)]" />
    </>
  )
}
