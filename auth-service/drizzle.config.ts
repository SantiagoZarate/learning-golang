import { defineConfig } from 'drizzle-kit'
import envs from './src/config/envs'

console.log(envs.database_url)

export default defineConfig({
  schema: './src/resources/**/schema.ts',
  out: './drizzle',
  verbose: true,
  strict: true,
  dialect: "postgresql",
  dbCredentials: {
    url: envs.database_url,
  }
})