export function SnippetLoader() {
  return (
    <li className="w-full rounded-lg border bg-background shadow-xl animate-pulse border-stone-700 h-[150px] flex flex-col gap-4 p-4">
      <p className="h-4 bg-border rounded-xl" />
      <div className="flex flex-col gap-2">
        <div className="w-full grid gap-3 grid-cols-3">
          <p className="h-3 col-span-1 bg-border rounded-xl" />
          <p className="h-3 col-span-2 bg-border rounded-xl" />
        </div>
        <div className="w-full grid gap-3 grid-cols-3">
          <p className="h-3 col-span-2 bg-border rounded-xl" />
        </div>
        <div className="w-full grid gap-3 grid-cols-3">
          <p className="h-3 col-span-1 bg-border rounded-xl" />
          <p className="h-3 col-span-2 bg-border rounded-xl" />
        </div>
      </div>
      <footer className="flex justify-between">
        <p className="h-4 w-8 bg-border rounded-xl" />
        <p className="h-4 w-8 bg-border rounded-xl" />
      </footer>
    </li>
  )
}

export function SnippetLoaders() {
  return (
    <>
      {
        [1, 2, 3, 4, 5, 6].map(n => (
          <SnippetLoader key={n} />
        ))
      }
    </>
  )
}