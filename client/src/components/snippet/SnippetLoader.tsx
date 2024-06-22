import { Variants, AnimatePresence, motion } from 'framer-motion'
import { SnippetListLayout } from "./SnippetListLayout"

export function SnippetLoader() {
  return (
    <li className="w-full rounded-lg border bg-background shadow-xl animate-pulse border-stone-700 h-[150px] flex flex-col gap-4 p-4">
      <p className="h-4 bg-border rounded-xl" />
      <div className="flex flex-col gap-2">
        <div className="w-full grid gap-3 grid-cols-3">
          <p className="h-3 col-span-1 bg-border rounded-xl" />
          <p className="h-3 col-span-2 bg-border rounded-xl" />
        </div>
        <div className="w-full grid gap-3 grid-cols-3">
          <p className="h-3 col-span-2 bg-border rounded-xl" />
        </div>
        <div className="w-full grid gap-3 grid-cols-3">
          <p className="h-3 col-span-1 bg-border rounded-xl" />
          <p className="h-3 col-span-2 bg-border rounded-xl" />
        </div>
      </div>
      <footer className="flex justify-between">
        <p className="h-4 w-8 bg-border rounded-xl" />
        <p className="h-4 w-8 bg-border rounded-xl" />
      </footer>
    </li>
  )
}

export function SnippetLoaders() {
  return (
    <AnimatePresence>
      <motion.div
        className="w-full overflow-y-hidden"
        animate={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 200 }}
        exit={{ opacity: 0 }}
      >
        <SnippetListLayout>
          {
            [1, 2, 3, 4, 5, 6].map(n => (
              <SnippetLoader key={n} />
            ))
          }
        </SnippetListLayout>
      </motion.div>
    </AnimatePresence>
  )
}

const demoVariants: Variants = {
  animate: {
    transition: {
      bounce: 0,
      staggerChildren: 0.05,
      stiffness: 100
    },
  },
  initial: {
  }
};

const itemVariants: Variants = {
  animate: {
    zIndex: 0,
    y: 0,
    opacity: 1,
    scale: 1,
    filter: "blur(0px",
  },
  initial: {
    y: 40,
    scale: 0.8,
    opacity: 0,
    filter: "blur(3px)"
  }
}

export function AnimatedSnippetLoaders() {
  return (
    <motion.ul
      variants={demoVariants}
      animate="animate"
      initial="initial"
      className="relative w-full flex flex-col gap-4 overflow-y-auto pb-[70vh]">
      <motion.div className="fixed z-50 w-full h-full pointer-events-none bg-background [mask-image:linear-gradient(0deg,#000_10%,transparent_50%)]" />
      {
        [1, 2, 3, 4, 5, 6].map(n => (
          <motion.div
            key={n}
            variants={itemVariants}
          >
            <SnippetLoader />
          </motion.div>
        ))
      }
    </motion.ul >
  )
}