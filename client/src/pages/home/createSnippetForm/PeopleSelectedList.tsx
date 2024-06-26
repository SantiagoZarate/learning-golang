import { User } from "@/types/user";
import { AnimatePresence } from "framer-motion";
import { MoreUsersMessage } from "./MoreUsersSharedWithMessage";
import { UserSelectedAvatar } from "./UserSelectedAvatar";

interface Props {
  usersSelected: User[],
  onRemoveUser: (id: number) => void
}

export function PeopleSelectedList({ usersSelected, onRemoveUser }: Props) {
  const items: JSX.Element[] = [];
  for (let i = 0; i < 5; i++) {
    const user = usersSelected[i]

    const element = user === undefined
      ? <UserSelectedAvatar skeleton zIndex={i} key={`undefined-${i}`} />
      :
      <UserSelectedAvatar
        zIndex={i}
        key={`user-${user.id}-${i}`}
        onClick={() => onRemoveUser(user.id)}>
        <img src={user.pfp} alt="" />
      </UserSelectedAvatar >

    items.push(element)
  }

  return (
    <ul className="flex items-center">
      <AnimatePresence mode="popLayout">
        {items}
        {usersSelected.length > 5 && <MoreUsersMessage totalUsers={usersSelected.length} />}
      </AnimatePresence>
    </ul>
  )
}
