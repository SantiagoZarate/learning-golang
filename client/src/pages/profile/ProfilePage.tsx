import { UploadMicroIcon } from "@/components/icons/UploadMicroIcon";
import { Button } from "@/components/ui/button";
import { DEFAULT_USER_PFP } from "@/data/constants";
import { useSession } from "@/hooks/useSession";
import { ChangeEvent, useState } from "react";

export function ProfilePage() {
  const { userCredentials: { username } } = useSession()
  const [profilePicture, setProfilePicture] = useState<string>(DEFAULT_USER_PFP)

  const handleChangePicture = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0]
    const imageURL = URL.createObjectURL(file)
    setProfilePicture(imageURL)
  }

  return (
    <div className="flex flex-col gap-4">
      <header className="flex divide-x gap-2 items-center">
        <h1 className="text-2xl">
          Your Profile
        </h1>
        <p className="px-2 text-secondary text-sm">{username}</p>
      </header>
      <picture className="border-2 border-border w-fit rounded-full overflow-hidden">
        <img
          draggable={false}
          className="aspect-square size-24 object-cover"
          src={profilePicture}
          alt="" />
      </picture>
      <form action="">
        <label
          className="flex items-center gap-2 bg-muted border border-border rounded-lg px-4 py-2  cursor-pointer group">
          <span className="group-hover:translate-y-[-2px] transition">
            <UploadMicroIcon />
          </span>
          <p className="text-xs text-primary/60 group-hover:text-primary  transition">change profile picture</p>
          <input hidden type="file" onChange={(e) => handleChangePicture(e)} />
        </label>
        {profilePicture !== DEFAULT_USER_PFP && <Button type="submit">update!</Button>}
      </form>
    </div>
  )
}
