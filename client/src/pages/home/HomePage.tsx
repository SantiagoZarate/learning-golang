import { LockMicroIcon } from "@/components/icons/LockMiniIcon";
import { WorldwideMicroIcon } from "@/components/icons/WorldwideMicroIcon";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { SnippetForm } from "./SnippetForm";
import { useGlobalContext } from "@/hooks/useGlobalContext";

type ViewMode = 'public' | 'private'

export function HomePage() {
  const redirect = useNavigate()
  const { pathname } = useLocation()
  const { userIsLogged } = useGlobalContext()
  const [viewMode, setViewMode] = useState<ViewMode>(pathname.includes("/private") ? "private" : "public")

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
            onClick={() => {
              setViewMode("public")
              redirect("/home")
            }}>
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
          <Outlet />
        </article>
        <Toaster />
      </section >
    </>
  )
}
