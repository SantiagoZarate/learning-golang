import { ExitMicroIcon } from "@/components/icons/ExitMicroIcon";
import { UploadMicroIcon } from "@/components/icons/UploadMicroIcon";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { DEFAULT_USER_PFP } from "@/data/constants";
import { UpdateProfilePictureForm, updateProfilePictureSchema } from "@/helpers/updateProfilePictureSchema";
import { useSession } from "@/hooks/useSession";
import { useTheme } from "@/hooks/useTheme";
import userAPI from '@/services/users';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ProfileLeftSide } from "./ProfileLeftSide";
import { ProfileSettingSection } from "./ProfileSettingSection";

export function ProfilePage() {
  const { userCredentials } = useSession()
  const { toggleTheme } = useTheme()
  const { logoutUser, getToken } = useSession()

  const { pfp, role, username } = userCredentials!

  const form = useForm<UpdateProfilePictureForm>({
    resolver: zodResolver(updateProfilePictureSchema),
    defaultValues: {
      image: null
    }
  })

  const handleSubmit = async () => {
    const images = form.getValues("image") as any as FileList
    const image = images.item(0)!
    const imageName = `avatars/avatar-${new Date()}-${username}`
    userAPI.updateProfilePicture(image, imageName, getToken())
      .then(() => toast({ title: "Profile picture succesfully changed!" }))
      .catch((err) => toast({ title: err }))
  }

  const getImage = () => {
    const profilePicture = pfp.length > 0 ? pfp : DEFAULT_USER_PFP
    const image = form.getValues("image") as any as FileList
    return image !== null ? URL.createObjectURL(image.item(0)!) : profilePicture
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      <header className="flex divide-x gap-2 items-center">
        <h1 className="text-2xl">
          Your Profile
        </h1>
      </header>
      <div className="grid grid-cols-5 divide-x">
        <ProfileLeftSide pfp={getImage()} role={role} username={username} />
        <section className="col-span-4 divide-y">
          <ProfileSettingSection
            name="Change your profile picture"
            action={
              <form className="flex items-center gap-4" method="POST" encType="multipart/form-data" onSubmit={form.handleSubmit(handleSubmit)}>
                <label
                  className="flex items-center gap-2 bg-muted border border-border rounded-lg px-4 py-2  cursor-pointer group">
                  <span className="group-hover:translate-y-[-2px] transition">
                    <UploadMicroIcon />
                  </span>
                  <p className="text-xs text-primary/60 group-hover:text-primary  transition">upload picture</p>
                  {form.formState.errors.image && <p className="text-red-400 text-xs">{form.formState.errors.image.message}</p>}
                  <input hidden type="file" {...form.register("image")} />
                </label>
                <Button disabled={form.watch("image") === null} type="submit">
                  {
                    form.formState.isLoading
                      ? "loading..."
                      : "update!"
                  }
                </Button>
              </form>
            } />
          <ProfileSettingSection
            name="Toggle theme"
            action={<Button onClick={() => toggleTheme()}>toggle</Button>} />
          <ProfileSettingSection
            name="Finish session"
            action={
              <Button variant={"destructive"} className="gap-2" onClick={() => logoutUser()}>
                <ExitMicroIcon />
                log out
              </Button>
            } />
        </section>
      </div>
    </div >
  )
}
