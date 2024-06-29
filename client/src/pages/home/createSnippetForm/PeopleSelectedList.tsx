import { User } from "@/types/user";
import { AnimatePresence } from "framer-motion";
import { MoreUsersMessage } from "./MoreUsersSharedWithMessage";
import { UserSelectedAvatar } from "./UserSelectedAvatar";
import { FREE_TIER_SHARE_USERS_AMOUNT } from "@/data/constants";
import { useSession } from "@/hooks/useSession";

interface Props {
  usersSelected: User[],
  onRemoveUser: (id: number) => void
}

export function PeopleSelectedList({ usersSelected, onRemoveUser }: Props) {
  const { userCredentials } = useSession()

  const isPremium = userCredentials?.role === 'premium'

  const items: JSX.Element[] = [];
  const usersLimit = isPremium ? 100 : FREE_TIER_SHARE_USERS_AMOUNT

  for (let i = 0; i < usersLimit; i++) {
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
        {usersSelected.length > FREE_TIER_SHARE_USERS_AMOUNT && isPremium && <MoreUsersMessage totalUsers={usersSelected.length} />}
      </AnimatePresence>
    </ul>
  )
}
