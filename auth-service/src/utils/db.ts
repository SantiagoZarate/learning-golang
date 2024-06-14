import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import envs from '@/config/envs';
import user from '@/resources/auth/schema';

function connectDB() {
  try {
    const connection = postgres(envs.DB_URL, {
      max: envs.SEEDING ? 1 : undefined,
    })

    const db = drizzle(connection, {
      logger: true,
      schema: {
        user
      }
    })
    return db;
  } catch (error) {
    console.log("Error connecting to the db:", error)
  }
}

export default connectDB()!;