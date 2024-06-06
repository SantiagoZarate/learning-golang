import { z } from 'zod'

const API_URL = import.meta.env.VITE_API_URL ?? ""

const envsSchema = z.object({
  API_URL: z.string().trim()
});

export const envs = envsSchema.parse({ API_URL })