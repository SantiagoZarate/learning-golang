import { Snippet } from "@/components/snippet/Snippet";
import { Snippet as SnippetType } from "@/types/snippet";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const snippets: SnippetType[] = [
  {
    content: "First snippet",
    created: new Date(),
    expires: new Date(),
    id: 1,
    title: "First snippet"
  },
  {
    content: "Second frame",
    created: new Date(),
    expires: new Date(),
    id: 2,
    title: "Second frame"
  },
  {
    content: "Thrid snippet",
    created: new Date(),
    expires: new Date(),
    id: 3,
    title: "Thrid snippet"
  },
  {
    content: "Fourth snippet",
    created: new Date(),
    expires: new Date(),
    id: 4,
    title: "Thrid snippet"
  },
  {
    content: "Fith snippet",
    created: new Date(),
    expires: new Date(),
    id: 5,
    title: "Thrid snippet"
  }
]

export function RightSide() {
  const [data, setData] = useState<SnippetType[]>(snippets.slice(0, 3))
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setData(() => {
        const newIndex = (index + 1) % snippets.length;
        setIndex(newIndex);

        // Create a new array with the updated snippets
        const newData = snippets.slice(newIndex, newIndex + 3);

        // If we reach the end of the array, wrap around to the beginning
        if (newIndex + 3 > snippets.length) {
          const overflow = newIndex + 3 - snippets.length;
          return [...snippets.slice(newIndex), ...snippets.slice(0, overflow)];
        }

        return newData;
      });
    }, 2000);

    return () => clearInterval(intervalId);
  }, [index]);

  return (
    <article className="relative flex items-center p-8">
      <div className="relative shadow-xl w-full border-8 border-border rounded-3xl">
        <div className="absolute z-50 flex items-center justify-center shadow-xl backdrop-blur-[8px] border-dotted border-4 -bottom-10 -right-10 size-24 rounded-full">
          <p className="text-xs text-center rotate-[15deg] text-secondary font-bold">it's like <em>x</em> but better!</p>
        </div>
        <ul className="relative w-full h-full rounded-3xl overflow-hidden bg-stone-900 p-4 flex flex-col gap-4">
          <AnimatePresence mode="popLayout">
            {
              data.map(d => (
                <motion.div
                  key={d.id}
                  layout
                  exit={{
                    opacity: 0,
                    scale: 0.8,
                    filter: "blur(5px)",
                    transition: { duration: 0.5 }
                  }}
                  initial={{ x: 500, filter: "blur(5px)" }}
                  animate={{
                    filter: "blur(0px)",
                    scale: 1,
                    opacity: 1,
                    x: 0, transition: {
                      stiffness: 100,
                      bounce: 0,
                      type: "spring",
                    }
                  }}
                >
                  <Snippet  {...d} />
                </motion.div>
              ))
            }
          </AnimatePresence>
        </ul>
      </div>
    </article>
  )
}
