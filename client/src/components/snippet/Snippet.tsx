import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { type Snippet as SnippetType } from "@/types/snippet";
import { PublicTag } from "./PublicTag";
import { motion } from 'framer-motion'
import { DEFAULT_USER_PFP } from "@/data/constants";
import React from "react";
import { SnippetAuthorInfo } from "./SnippetAuthorInfo";
import { SnippetPeopleSharedWith } from "./SnippetPeopleSharedWith";
import { XMarkMiniIcon } from "../icons/XMarkMiniIcon";
import { useSnippets } from "@/hooks/useSnippets";

interface Props extends Partial<SnippetType> {
  isRecentlyAdded?: boolean,
}

export const Snippet = React.forwardRef<HTMLLIElement, Props>(({ content, id, title, author, sharedWith, isPrivate, isRecentlyAdded = false, expires }, ref) => {
  const { deleteSnippet, userIsAuthorOfSnippet } = useSnippets()
  const popoverMessage = sharedWith?.length! - 1 === 0
    ? <p>Shared only with you</p>
    : <p>Shared with you and {sharedWith?.length! - 1} more people</p>

  const profilePicture = author?.pfp ?? DEFAULT_USER_PFP
  return (
    <motion.li
      data-testid={`snippet-id-${id}`}
      ref={ref}
      layout
      initial={isRecentlyAdded && {
        filter: "blur(5px) saturate(150%)",
        opacity: 0.6,
        backgroundColor: "hsl(50deg, 97%, 63%)"
      }}
      exit={{
        filter: "blur(5px) saturate(150%)",
        opacity: 0,
      }}
      animate={{
        filter: "blur(0px) saturate(100%)",
        opacity: 1,
        backgroundColor: "hsl(24deg, 9%, 10%)",
        transition: {
          type: "spring",
          stiffness: 100,
        }
      }}
      className="relative w-full rounded-lg border bg-background shadow-xl border-stone-700 flex flex-col gap-2 p-4 group">
      {
        !userIsAuthorOfSnippet({ id: id! }) &&
        <div className="absolute top-0 right-0 m-2 group-hover:opacity-100 opacity-0 transition">
          <button onClick={() => deleteSnippet({ id: id! })} className="p-2 rounded-lg bg-muted border border-border">
            <XMarkMiniIcon />
          </button>
        </div>
      }
      <p data-testid={`snippet-id-${id}-title`} className="text-2xl uppercase">{title}</p>
      <p data-testid={`snippet-id-${id}-content`} className="text-sm">{content}</p>
      <footer className="flex justify-between items-center">
        <SnippetAuthorInfo data-testid={`snippet-id-${id}-author`} expireTime={expires!} pfp={profilePicture} username={author?.username!} />
        <TooltipProvider delayDuration={50}>
          <Tooltip>
            <TooltipTrigger>
              {
                !isPrivate
                  ? <PublicTag />
                  : <SnippetPeopleSharedWith sharedWith={sharedWith!} />
              }
            </TooltipTrigger>
            <TooltipContent className="bg-background">
              {
                isPrivate
                  ? popoverMessage
                  : <p>Everybody can see it</p>
              }
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </footer>
    </motion.li>
  )
})
