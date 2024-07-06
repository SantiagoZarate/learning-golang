export function NoSnippetsFound() {
  return (
    <div data-testid="no-snippets-found" className="flex flex-col justify-center items-center gap-2">
      <h2>There is no snippets at moment</h2>
      <p className="text-secondary text-sm">be the first one!</p>
    </div>
  )
}
