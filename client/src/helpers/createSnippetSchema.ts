import { z } from "zod"

export const createSnippetSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  expires: z.number().min(1),
  sharedWith: z.array(z.object({ id: z.number() })).optional()
})

export type SnippetFormType = z.infer<typeof createSnippetSchema>