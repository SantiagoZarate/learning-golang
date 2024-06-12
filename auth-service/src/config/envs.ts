import dotenv from 'dotenv'
import { z } from 'zod'

dotenv.config()

const envsSchema = z.object({
  PORT: z.coerce.number(),
  DB_URL: z.string(),
  VERSION: z.string()
})

const envs = envsSchema.parse({
  PORT: process.env.PORT,
  VERSION: process.env.VERSION,
  DB_URL: process.env.DB_URL
})

console.log(envs)

export default envs