import envs from '@/config/envs';
import user from '@/resources/user/schema';

import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

async function connectDB() {
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
    return db
  } catch (error) {
    console.log("Error connecting to the db:", error)
  }
}

async function testDB() {
  const { PGlite } = await import("@electric-sql/pglite")
  const pglite = await import("drizzle-orm/pglite")
  const sqlite = new PGlite()

  return pglite.drizzle(sqlite, {
    logger: true,
    schema: {
      user
    }
  });
};

export default envs.MODE === 'test' ? testDB()! : connectDB()!;