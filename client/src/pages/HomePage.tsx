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
      <SnippetForm />
      <section className="relative flex-1 flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-background" />
        {
          isLoading
            ? <p>Loading...</p>
            :
            <ul className="flex flex-col gap-4 overflow-y-auto">
              {
                snippets.map(s => (
                  <li
                    className="rounded-lg border border-stone-700 w-72 flex flex-col gap-2 p-4"
                    key={s.ID}>
                    <p className="text-2xl uppercase">{s.Title}</p>
                    <p className="text-sm">{s.Content}</p>
                  </li>
                ))
              }
            </ul>
        }
      </section>
    </>
  )
}
