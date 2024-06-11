import { defineConfig } from 'drizzle-kit'
import envs from './src/config/envs'

export const config = defineConfig({
  dialect: 'postgresql',
  schema: './src/resources/**/schema.ts',
  out: './drizzle',
  verbose: true,
  strict: true,
  dbCredentials: {
    url: envs.database_url,
  }
})