import { Button } from "../ui/button";

export function SnippetsError() {
  return (
    <div className="flex flex-col justify-center items-center gap-1">
      <p>There was an error</p>
      <Button>retry</Button>
    </div>
  )
}
