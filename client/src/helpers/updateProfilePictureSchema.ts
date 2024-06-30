import { z } from "zod"

export const updateProfilePictureSchema = z.object({
  image: z.instanceof(FileList)
    .transform(list => list.item(0)! as File)
    .refine(file => ["image/png", "image/jpeg", "image/jpg"].some(type => type === file.type), "invalid picture type")
    .refine(file => file.size <= 5 * 1024 * 1024, "Picture must be less than 5 MB")
    .nullable()
})

export type UpdateProfilePictureForm = z.infer<typeof updateProfilePictureSchema>