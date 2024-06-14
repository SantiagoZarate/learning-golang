import dotenv from 'dotenv'
import { z } from 'zod'

dotenv.config()

const envsSchema = z.object({
  PORT: z.coerce.number(),
  DB_URL: z.string(),
  VERSION: z.string(),
  MODE: z.string(),
  SALT_ROUNDS: z.coerce.number().min(1).max(14),
  JWT_SECRET: z.string(),
  SEEDING: z.coerce.boolean().default(false)
})

const envs = envsSchema.parse({
  PORT: process.env.PORT,
  VERSION: process.env.VERSION,
  DB_URL: process.env.DB_URL,
  MODE: process.env.MODE,
  SALT_ROUNDS: process.env.SALT_ROUNDS,
  JWT_SECRET: process.env.JWT_SECRET,
  SEEDING: process.env.SEEDING
})

console.log(envs)

export default envs