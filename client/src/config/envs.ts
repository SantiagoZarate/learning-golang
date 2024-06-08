import { z } from 'zod'

console.log(import.meta.env)

const API_URL = import.meta.env.VITE_API_URL ?? ""
const APP_VERSION = import.meta.env.VITE_APP_VERSION
const DEVELOPMENT = import.meta.env.DEV

const envsSchema = z.object({
  API_URL: z.string().trim(),
  DEVELOPMENT: z.boolean(),
  APP_VERSION: z.string()
});

export const envs = envsSchema.parse({ API_URL, DEVELOPMENT, APP_VERSION })