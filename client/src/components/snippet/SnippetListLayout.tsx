import { PropsWithChildren } from "react";
import { AnimatePresence } from 'framer-motion'

export function SnippetListLayout({ children }: PropsWithChildren) {
  return (
    <ul className="relative w-full flex flex-col gap-4 overflow-y-auto pb-[70vh]">
      <AnimatePresence mode="popLayout">
        <div className="fixed z-20 w-full h-full pointer-events-none bg-background [mask-image:linear-gradient(0deg,#000_10%,transparent_50%)]" />
        {children}
      </AnimatePresence>
    </ul >
  )
}
