import { User } from "@/types/user"

interface Props {
  sharedWith: User[]
}

export function SnippetPeopleSharedWith({ sharedWith }: Props) {
  return (
    <ul className="flex">
      {
        sharedWith?.map((user, index) => (
          <li key={user.id} className={`w-5 aspect-square rounded-full border border-background bg-card overflow-hidden ${index === 0 ? "" : "-ml-1"}`}>
            <img className="object-cover" src={user.pfp} alt="" />
          </li>
        ))
      }
    </ul>
  )
}
