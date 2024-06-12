import { defineConfig } from 'drizzle-kit'
import envs from './src/config/envs'

export default defineConfig({
  schema: './src/resources/**/schema.ts',
  out: './drizzle',
  verbose: true,
  strict: true,
  dialect: "postgresql",
  dbCredentials: {
    url: envs.DB_URL,
  }
})