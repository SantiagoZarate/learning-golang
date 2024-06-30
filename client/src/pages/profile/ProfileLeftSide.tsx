import { UserCredentials } from "@/hooks/useSession";

interface Props extends UserCredentials {
}

export function ProfileLeftSide({ pfp, role, username }: Props) {
  return (
    <section className="items-center flex flex-col gap-4 p-6">
      <picture className="border-2 border-border w-fit rounded-full overflow-hidden">
        <img
          draggable={false}
          className="aspect-square size-24 object-cover"
          src={pfp}
          alt="" />
      </picture>
      <footer className="flex flex-col gap-2">
        <div className="flex gap-4 items-center justify-between">
          <p className="text-sm text-border">Username:</p>
          <p className="px-2 text-secondary text-sm">{username}</p>
        </div>
        <div className="flex gap-4 items-center justify-between">
          <p className="text-sm text-border">Rol:</p>
          <p className="px-2 text-secondary text-sm">{role}</p>
        </div>
      </footer>
    </section>
  )
}
