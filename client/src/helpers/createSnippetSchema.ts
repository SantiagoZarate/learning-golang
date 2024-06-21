import { z } from "zod"

export const createSnippetSchema = z.object({
  title: z.string(),
  content: z.string()
})

export type SnippetFormType = z.infer<typeof createSnippetSchema>