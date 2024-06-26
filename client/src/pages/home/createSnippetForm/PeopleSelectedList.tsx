import { User } from "@/types/user";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  usersSelected: User[],
  onRemoveUser: (id: number) => void
}

export function PeopleSelectedList({ usersSelected, onRemoveUser }: Props) {
  const items: JSX.Element[] = [];
  for (let i = 0; i < 5; i++) {
    const user = usersSelected[i]

    const element = user === undefined
      ? <motion.li
        layout
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0, transition: { duration: 0.1 } }}
        key={`undefined-${i}`}
        className={`w-8 aspect-square overflow-hidden rounded-full border border-background bg-muted ${i === 0 ? "" : "-ml-2 "}`}
        style={{ zIndex: i }}
      >
        <img src="" alt="" />
      </motion.li>
      : <motion.li
        layout
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0, transition: { duration: 0.1 } }}
        whileHover={{ y: -4 }}
        onClick={() => onRemoveUser(user.id)}
        key={`user-${user.id}-${i}`}
        className={`w-8 aspect-square overflow-hidden rounded-full border border-background bg-card cursor-pointer ${i === 0 ? "" : "-ml-2 "}`}
        style={{ zIndex: i }}
      >
        <img src={user.pfp} alt="" />
      </motion.li>
    items.push(element)
  }

  return (
    <ul className="flex items-center">
      <AnimatePresence mode="popLayout">
        {items}
        {usersSelected.length > 5 &&
          <motion.p
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            initial={{ x: -100, opacity: 0 }}
            className="20 px-2 text-xs text-secondary min-w-24 block">
            and {usersSelected.length - 5} more...
          </motion.p>}
      </AnimatePresence>
    </ul>
  )
}
