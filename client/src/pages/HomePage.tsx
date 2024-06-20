import { useEffect, useState } from "react";
import envs from "../config/envs";
import { Snippet } from "../types/snippet";
import { SnippetForm } from "./SnippetForm";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { WorldwideIcon } from "@/components/icons/WorldwideIcon";

export function HomePage() {
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const url = envs.DEVELOPMENT ? envs.API_URL + "/src/data/snippets.json" : envs.API_URL
    setIsLoading(true)
    setTimeout(() => {
      fetch(url)
        .then(res => res.json())
        .then(res => setSnippets(res))
        .finally(() => setIsLoading(false))
    }, 2000)
  }, [])

  return (
    <>
      <section className="relative flex-1">
        <SnippetForm />
      </section>
      <section className="relative flex-1 flex p-4 max-h-full overflow-y-auto items-center justify-center">
        {
          isLoading
            ? <p>Loading...</p>
            :
            <ul className="relative flex flex-col gap-4 overflow-y-auto pb-[70vh]">
              <div className="fixed w-full h-full pointer-events-none bg-background [mask-image:linear-gradient(0deg,#000_10%,transparent_50%)]" />
              {
                snippets.map(s => (
                  <li
                    className="w-full rounded-lg border bg-background shadow-xl border-stone-700 flex flex-col gap-2 p-4"
                    key={s.ID}>
                    <p className="text-2xl uppercase">{s.Title}</p>
                    <p className="text-sm">{s.Content}</p>
                    <footer className="flex justify-between items-center">
                      <p className="text-xs text-white/20">{new Date().toDateString()}</p>
                      <TooltipProvider delayDuration={50}>
                        <Tooltip>
                          <TooltipTrigger>
                            {
                              s.ID % 2 == 0
                                ?
                                <div className="flex gap-1 items-center text-xs capitalize text-card">
                                  public
                                  <WorldwideIcon />
                                </div>
                                :
                                <ul className="flex">
                                  <li className="w-4 aspect-square rounded-full border border-background bg-card"></li>
                                  <li className="w-4 aspect-square rounded-full border border-background bg-card -ml-1"></li>
                                  <li className="w-4 aspect-square rounded-full border border-background bg-card -ml-1"></li>
                                </ul>
                            }
                          </TooltipTrigger>
                          <TooltipContent>
                            {
                              s.ID % 2 == 0
                                ? <p>Everybody can see it</p>
                                : <p>Shared with you and 2 more people</p>
                            }

                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </footer>
                  </li>
                ))
              }
            </ul>
        }
      </section>
    </>
  )
}
