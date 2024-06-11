import dotenv from 'dotenv'
import { z } from 'zod'
dotenv.config()

const envsSchema = z.object({
  PORT: z.coerce.number(),
  DB_USER: z.string(),
  DB_PASS: z.string(),
  DB_PORT: z.coerce.number(),
  DB_HOST: z.string(),
  DB_NAME: z.string(),
  VERSION: z.string()
})

const envs = envsSchema.parse({
  PORT: process.env.PORT,
  VERSION: process.env.VERSION,
  DB_USER: process.env.DB_USER,
  DB_PASS: process.env.DB_PASS,
  DB_PORT: process.env.DB_PORT,
  DB_HOST: process.env.DB_HOST,
  DB_NAME: process.env.DB_NAME,
})

export default {
  port: envs.PORT,
  version: envs.VERSION,
  database_url: `postgresql://${envs.DB_USER}:${envs.DB_PASS}@${envs.DB_HOST}:${envs.DB_PORT}/${envs.DB_NAME}`
}

