import { useQuery } from "@tanstack/react-query";
import { Button } from "../ui/button";

export function SnippetsError() {
  const { refetch, isRefetching } = useQuery({ queryKey: ["snippets"] })

  return (
    <div className="flex flex-col justify-center items-center gap-1 w-full">
      <p>There was an error</p>
      <Button onClick={() => refetch()}>
        {isRefetching ? "loading..." : "retry"}
      </Button>
    </div>
  )
}
