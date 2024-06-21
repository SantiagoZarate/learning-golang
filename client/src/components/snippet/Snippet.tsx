import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@radix-ui/react-tooltip";
import { WorldwideIcon } from "../icons/WorldwideIcon";
import { type Snippet } from "@/types/snippet";

interface Props extends Snippet {
}

export function Snippet({ content, created, expires, title }: Props) {
  return (
    <li
      className="w-full rounded-lg border bg-background shadow-xl border-stone-700 flex flex-col gap-2 p-4">
      <p className="text-2xl uppercase">{title}</p>
      <p className="text-sm">{content}</p>
      <footer className="flex justify-between items-center">
        <p className="text-xs text-white/20">{new Date().toDateString()}</p>
        <TooltipProvider delayDuration={50}>
          <Tooltip>
            <TooltipTrigger>
              {
                title?.length % 2 == 0
                  ?
                  <div className="flex gap-1 items-center text-xs capitalize text-card">
                    public
                    <WorldwideIcon />
                  </div>
                  :
                  <ul className="flex">
                    <li className="w-4 aspect-square rounded-full border border-background bg-card"></li>
                    <li className="w-4 aspect-square rounded-full border border-background bg-card -ml-1"></li>
                    <li className="w-4 aspect-square rounded-full border border-background bg-card -ml-1"></li>
                  </ul>
              }
            </TooltipTrigger>
            <TooltipContent>
              {
                title?.length % 2 == 0
                  ? <p>Everybody can see it</p>
                  : <p>Shared with you and 2 more people</p>
              }

            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </footer>
    </li>
  )
}
