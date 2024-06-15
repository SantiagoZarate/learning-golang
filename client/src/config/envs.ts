import { z } from 'zod'

console.log(import.meta.env)

const envsSchema = z.object({
  API_URL: z.string().trim(),
  DEVELOPMENT: z.boolean(),
  APP_VERSION: z.string(),
  AUTH_API_URL: z.string()
});

const envs = envsSchema.parse({
  API_URL: import.meta.env.VITE_API_URL ?? "",
  DEVELOPMENT: import.meta.env.DEV,
  APP_VERSION: import.meta.env.VITE_APP_VERSION,
  AUTH_API_URL: import.meta.env.VITE_AUTH_API_URL
})

export default envs;