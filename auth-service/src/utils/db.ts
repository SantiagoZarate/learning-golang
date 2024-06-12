import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import envs from '@/config/envs';
import user from '@/resources/auth/schema';

const connection = postgres(envs.DB_URL)

const db = drizzle(connection, {
  logger: true,
  schema: {
    user
  }
})

export default db;