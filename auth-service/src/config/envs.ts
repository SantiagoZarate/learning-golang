import dotenv from 'dotenv'
import { z } from 'zod'
dotenv.config()

const envsSchema = z.object({
  PORT: z.coerce.number(),
  DATABASE_URL: z.string().url()
})

const envs = envsSchema.parse({
  PORT: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL
})

export default envs

