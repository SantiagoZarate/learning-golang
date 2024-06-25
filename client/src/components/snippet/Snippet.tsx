import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { type Snippet } from "@/types/snippet";
import { PublicTag } from "./PublicTag";
import { motion } from 'framer-motion'

interface Props extends Partial<Snippet> {
  likes?: number
  isRecentlyAdded?: boolean
}

export function Snippet({ content, title, likes = 0, isRecentlyAdded = false }: Props) {
  const isPublic = likes > 0

  return (
    <motion.li
      layout
      initial={isRecentlyAdded && {
        filter: "blur(5px) saturate(150%)",
        opacity: 0.6,
        y: -200,
      }}
      animate={{
        filter: "blur(0px) saturate(100%)",
        opacity: 1,
        y: 0,
        transition: {
          type: "spring",
          stiffness: 100
        }
      }}
      className="w-full rounded-lg border bg-background shadow-xl border-stone-700 flex flex-col gap-2 p-4">
      <p className="text-2xl uppercase">{title}</p>
      <p className="text-sm">{content}</p>
      <footer className="flex justify-between items-center">
        <p className="text-xs text-white/20">{new Date().toDateString()}</p>
        <TooltipProvider delayDuration={50}>
          <Tooltip>
            <TooltipTrigger>
              {
                isPublic
                  ? <PublicTag />
                  :
                  <ul className="flex">
                    <li className="w-4 aspect-square rounded-full border border-background bg-card"></li>
                    <li className="w-4 aspect-square rounded-full border border-background bg-card -ml-1"></li>
                    <li className="w-4 aspect-square rounded-full border border-background bg-card -ml-1"></li>
                  </ul>
              }
            </TooltipTrigger>
            <TooltipContent className="bg-background">
              {
                isPublic
                  ? <p>Everybody can see it</p>
                  : <p>Shared with you and 2 more people</p>
              }
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </footer>
    </motion.li>
  )
}
