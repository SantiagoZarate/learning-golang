import { FormSectionHeader } from "@/components/FormSectionHeader";
import { UsersMicroIcon } from "@/components/icons/UsersMicroIcon";
import { PlusIcon } from "lucide-react";
import data from '@/data/users.json'
import { useState } from "react";
import { User } from "@/types/user";
import { AnimatePresence, motion } from 'framer-motion'

export function PeopleList() {
  const [users, setUsers] = useState<User[]>(data)

  const removeUser = (id: number) => {
    setUsers((prevState) => prevState.filter(user => user.id !== id))
  }

  return (
    <article className="w-full flex flex-col gap-4">
      <FormSectionHeader
        icon={<UsersMicroIcon />}
        title="Choose who do you want to see it"
        description="By defaults it'll be public" />
      <ul className="flex flex-wrap gap-8 place-content-center">
        <AnimatePresence mode="popLayout">
          {
            users.map(n => (
              <motion.li
                layout
                key={n.id}
                animate={{ filter: "saturate(80%)" }}
                exit={{ opacity: 0, scale: 0.1 }}
                whileHover={{ scale: 1.1, filter: "saturate(120%)" }}
                onClick={() => removeUser(n.id)}
                className="cursor-pointer border aspect-square w-16 rounded-full overflow-hidden border-border">
                <img
                  className="w-full h-full bg-muted object-center"
                  src={n.pfp}
                  alt="user profile picture" />
              </motion.li>
            ))
          }
          <motion.li
            key={"add-new-friend"}
            layout
            className="cursor-pointer aspect-square w-16 rounded-full flex items-center justify-center overflow-hidden border-border bg-border object-center">
            <PlusIcon />
          </motion.li>
        </AnimatePresence>
      </ul>
    </article>
  )
}
