import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { type Snippet } from "@/types/snippet";
import { PublicTag } from "./PublicTag";
import { motion } from 'framer-motion'

interface Props extends Partial<Snippet> {
  isRecentlyAdded?: boolean
}

import { formatDistanceToNow } from 'date-fns';

function getTimeUntilExpiration(expirationDate: Date) {
  const expires = new Date(expirationDate);
  return formatDistanceToNow(expires, { addSuffix: true });
}

export function Snippet({ content, title, sharedWith, isPrivate, author, isRecentlyAdded = false, expires }: Props) {
  const popoverMessage = sharedWith?.length! - 1 === 0
    ? <p>Shared only with you</p>
    : <p>Shared with you and {sharedWith?.length! - 1} more people</p>

  return (
    <motion.li
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
      className="w-full rounded-lg border bg-background shadow-xl border-stone-700 flex flex-col gap-2 p-4">
      <p className="text-2xl uppercase">{title}</p>
      <p className="text-sm">{content}</p>
      <footer className="flex justify-between items-center">
        <p className="text-xs text-white/20">Expires in {getTimeUntilExpiration(expires!)}</p>
        <TooltipProvider delayDuration={50}>
          <Tooltip>
            <TooltipTrigger>
              {
                !isPrivate
                  ? <PublicTag />
                  :
                  <ul className="flex">
                    {
                      sharedWith?.map((u, index) => (
                        <li className={`w-5 aspect-square rounded-full border border-background bg-card overflow-hidden ${index === 0 ? "" : "-ml-1"}`}>
                          <img className="object-cover" src={u.pfp} alt="" />
                        </li>
                      ))
                    }
                  </ul>
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
}
