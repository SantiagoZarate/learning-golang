import { useEffect, useState } from "react";
import envs from "../config/envs";
import { Snippet } from "../types/snippet";
import { SnippetForm } from "./SnippetForm";

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
      <section className="flex-1 flex p-4 max-h-full overflow-y-auto relative  items-center justify-center">
        {/* <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-background" /> */}
        {
          isLoading
            ? <p>Loading...</p>
            :
            <ul className="flex flex-col gap-4 overflow-y-auto">
              {
                snippets.map(s => (
                  <li
                    className="w-full rounded-lg border bg-background shadow-xl border-stone-700 flex flex-col gap-2 p-4"
                    key={s.ID}>
                    <p className="text-2xl uppercase">{s.Title}</p>
                    <p className="text-sm">{s.Content}</p>
                    <p className="text-xs text-white/20">{new Date().toDateString()}</p>
                  </li>
                ))
              }
            </ul>
        }
      </section>
    </>
  )
}
