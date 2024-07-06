import { getTimeUntilExpiration } from "@/helpers/getTimeUntilExpires";

interface Props {
  pfp: string,
  username: string,
  expireTime: Date
}

export function SnippetAuthorInfo({ expireTime, pfp, username }: Props) {
  return (
    <div className="flex divide-x items-center">
      <div className="flex gap-2 items-center pr-2">
        <li className={`w-5 aspect-square rounded-full border border-background bg-card overflow-hidden`}>
          <img className="object-cover" src={pfp} alt="" />
        </li>
        <p data-testid="snippet-id-" className="text-xs text-white/40">{username}</p>
      </div>
      <p className="text-xs text-white/20 pl-2">Expires in {getTimeUntilExpiration(expireTime)}</p>
    </div>
  )
}
