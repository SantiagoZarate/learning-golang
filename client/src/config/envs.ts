import { z } from 'zod'

console.log(import.meta.env.MODE)

const envsSchema = z.object({
  API_URL: z.string().trim(),
  DEVELOPMENT: z.boolean(),
  APP_VERSION: z.string(),
  AUTH_API_URL: z.string(),
  SUPABASE_URL: z.string(),
  SUPABASE_KEY: z.string(),
  MODE: z.string()
});

const envs = envsSchema.parse({
  API_URL: import.meta.env.VITE_API_URL ?? "",
  DEVELOPMENT: import.meta.env.DEV,
  APP_VERSION: import.meta.env.VITE_APP_VERSION,
  AUTH_API_URL: import.meta.env.VITE_AUTH_API_URL,
  SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
  SUPABASE_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY,
  MODE: import.meta.env.MODE
})

export default envs;