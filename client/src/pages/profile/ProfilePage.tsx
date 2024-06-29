import { UploadMicroIcon } from "@/components/icons/UploadMicroIcon";
import { Button } from "@/components/ui/button";
import { DEFAULT_USER_PFP } from "@/data/constants";
import { useSession } from "@/hooks/useSession";
import { useTheme } from "@/hooks/useTheme";
import { supabase } from "@/lib/supabase";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from 'zod';

const updateProfilePictureSchema = z.object({
  image: z.instanceof(FileList)
    .transform(list => list.item(0)! as File)
    .refine(file => ["image/png", "image/jpeg", "image/jpg"].some(type => type === file.type), "invalid picture type")
    .refine(file => file.size <= 5 * 1024 * 1024, "Picture must be less than 5 MB")
    .nullable()
})

type UpdateProfilePictureForm = z.infer<typeof updateProfilePictureSchema>

export function ProfilePage() {
  const { userCredentials: { username, role } } = useSession()
  const { toggleTheme } = useTheme()
  const { logoutUser } = useSession()

  const form = useForm<UpdateProfilePictureForm>({
    resolver: zodResolver(updateProfilePictureSchema),
    defaultValues: {
      image: null
    }
  })

  const handleSubmit = async () => {
    const images = form.getValues("image") as any as FileList
    const image = images.item(0)!

    await supabase.storage.from("snippetbox-profiles-pictures").upload(`avatars/avatar-${new Date()}-${username}`, image, {
      cacheControl: '3600',
      upsert: false,
      contentType: image.type
    })
  }

  const getImage = () => {
    const image = form.getValues("image") as any as FileList
    return image !== null ? URL.createObjectURL(image.item(0)!) : DEFAULT_USER_PFP
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
              src={getImage()}
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
              <Button disabled={form.watch("image") === null} type="submit">update!</Button>
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
