import { Snippet } from "@/components/snippet/Snippet";
import { SnippetLoaders } from "@/components/snippet/SnippetLoader";
import { useEffect, useState } from "react";
import envs from "../config/envs";
import { Snippet as SnippetType } from "../types/snippet";
import { SnippetForm } from "./SnippetForm";

export function HomePage() {
  const [snippets, setSnippets] = useState<SnippetType[]>([]);
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
        <ul className="relative w-full flex flex-col gap-4 overflow-y-auto pb-[70vh]">
          <div className="fixed z-20 w-full h-full pointer-events-none bg-background [mask-image:linear-gradient(0deg,#000_10%,transparent_50%)]" />
          {
            isLoading
              ? <SnippetLoaders />
              : snippets.map(s => (<Snippet key={s.id} {...s} />))
          }
        </ul>
      </section>
    </>
  )
}
