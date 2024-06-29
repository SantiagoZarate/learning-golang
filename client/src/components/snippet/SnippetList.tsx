import { type Snippet as SnippetType } from "@/types/snippet";
import { Snippet } from "./Snippet";
import { AnimatePresence } from "framer-motion";

interface Props {
  snippets: SnippetType[]
}

export function SnippetList({ snippets }: Props) {
  return (
    <ul className="w-full flex flex-col gap-4 overflow-auto pt-[60px] pb-[65vh]">
      <AnimatePresence mode="popLayout">
        {
          snippets?.map(s => (
            <Snippet key={s.id} {...s} />
          ))
        }
      </AnimatePresence>
    </ul>
  )
}
