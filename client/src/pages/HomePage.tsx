import { useEffect, useState } from "react";
import envs from "../config/envs";
import { Snippet } from "../types/snippet";

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
      <section className="flex-1 flex items-center justify-center">
        <button className="px-4 py-2 rounded-lg uppercase text-xs hover:-translate-y-1 transition bg-stone-600">Get more snippets</button>
      </section>
      <section className="flex-1 flex items-center justify-center">
        {
          isLoading
            ? <p>Loading...</p>
            :
            <ul className="flex flex-col gap-4">
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
