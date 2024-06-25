import { type Snippet as SnippetType } from "@/types/snippet";
import { SnippetListLayout } from "./SnippetListLayout";
import { Snippet } from "./Snippet";

interface Props {
  snippets: SnippetType[]
}

export function SnippetList({ snippets }: Props) {
  return (
    <SnippetListLayout>
      {
        snippets.map(s => (
          <Snippet key={s.id} {...s} />
        ))
      }
    </SnippetListLayout>
  )
}
