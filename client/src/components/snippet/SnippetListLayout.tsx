import { PropsWithChildren } from "react";
import { AnimatePresence } from 'framer-motion'

export function SnippetListLayout({ children }: PropsWithChildren) {
  return (
    <ul className="w-full flex flex-col gap-4 overflow-auto pt-[60px] pb-[65vh]">
      <AnimatePresence mode="popLayout">
        {children}
      </AnimatePresence>
    </ul >
  )
}
