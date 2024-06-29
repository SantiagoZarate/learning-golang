import { UploadMicroIcon } from "@/components/icons/UploadMicroIcon";
import { Button } from "@/components/ui/button";
import { DEFAULT_USER_PFP } from "@/data/constants";
import { useSession } from "@/hooks/useSession";
import { useTheme } from "@/hooks/useTheme";
import { ChangeEvent, useState } from "react";

export function ProfilePage() {
  const { userCredentials: { username, role } } = useSession()
  const [profilePicture, setProfilePicture] = useState<string>(DEFAULT_USER_PFP)
  const { toggleTheme } = useTheme()
  const { logoutUser } = useSession()

  const handleChangePicture = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0]
    const imageURL = URL.createObjectURL(file)
    setProfilePicture(imageURL)
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      <header className="flex divide-x gap-2 items-center">
        <h1 className="text-2xl">
          Your Profile
        </h1>
      </header>
      <div className="grid grid-cols-5 divide-x">
        <section className="items-center flex flex-col gap-4 p-6">
          <picture className="border-2 border-border w-fit rounded-full overflow-hidden">
            <img
              draggable={false}
              className="aspect-square size-24 object-cover"
              src={profilePicture}
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
        <section className="col-span-4 divide-y">
          <article className="p-6 flex items-center justify-between">
            <p>Change your profile picture</p>
            <form action="" className="flex items-center gap-4">
              <label
                className="flex items-center gap-2 bg-muted border border-border rounded-lg px-4 py-2  cursor-pointer group">
                <span className="group-hover:translate-y-[-2px] transition">
                  <UploadMicroIcon />
                </span>
                <p className="text-xs text-primary/60 group-hover:text-primary  transition">upload picture</p>
                <input hidden type="file" onChange={(e) => handleChangePicture(e)} />
              </label>
              <Button disabled={profilePicture === DEFAULT_USER_PFP} type="submit">update!</Button>
            </form>
          </article>
          <article className="p-6 flex items-center justify-between">
            <p>Toggle theme</p>
            <Button onClick={() => toggleTheme()}>
              toggle
            </Button>
          </article>
          <article className="p-6 flex items-center justify-between">
            <p>Finish session</p>
            <Button onClick={() => logoutUser()}>
              log out
            </Button>
          </article>
        </section>
      </div>
    </div>
  )
}
