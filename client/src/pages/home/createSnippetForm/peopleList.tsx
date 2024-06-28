import { FormSectionHeader } from "@/components/FormSectionHeader";
import { UsersMicroIcon } from "@/components/icons/UsersMicroIcon";
import { PlusIcon } from "lucide-react";
import { User } from "@/types/user";
import { AnimatePresence, motion } from 'framer-motion'
import { toast } from "@/components/ui/use-toast"
import { DEFAULT_USER_PFP, FREE_TIER_SHARE_USERS_AMOUNT } from "@/data/constants";

interface Props {
  users: User[],
  onSelectUser: (id: number) => void,
  amountUsersSelected: number
}

export function PeopleList({ onSelectUser, users, amountUsersSelected }: Props) {
  const triggerToast = () => {
    toast({
      title: "Max users reached",
      description: "upgrade to premium to share your snippetboxs with more people",
    })
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
            users?.map(n => (
              <motion.li
                layout
                key={n.id}
                animate={{ filter: "saturate(80%)" }}
                exit={{ opacity: 0, scale: 0.1 }}
                whileHover={{ scale: 1.1, filter: "saturate(120%)" }}
                onClick={amountUsersSelected < FREE_TIER_SHARE_USERS_AMOUNT ? () => onSelectUser(n.id) : () => triggerToast()}
                className="cursor-pointer border aspect-square w-16 rounded-full  border-border relative group">
                <div className="absolute inset-0 bg-black/0 z-50 rounded-full flex items-center justify-center group-hover:bg-black/40 transition">
                  <p className="text-xs px-2 py-1 bg-muted rounded-lg border-border shadow-md group-hover:opacity-100 opacity-0 transition">
                    {n.username}
                  </p>
                </div>
                <img
                  className="w-full h-full bg-muted object-center rounded-full"
                  src={n.pfp ? n.pfp : DEFAULT_USER_PFP}
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
