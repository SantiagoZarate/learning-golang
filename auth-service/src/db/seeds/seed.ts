import usersJson from './users.json'
import { InferInsertModel } from 'drizzle-orm'
import user from '@/resources/user/schema'
import envs from '@/config/envs'
import { UserRepository } from '@/resources/user/repository'
import db from '../db'

if (!envs.SEEDING) {
  console.log(">>> You're not in seeding mode, terminating process...")
  process.exit(1)
}

const users = usersJson as any[]

// Remove all records and insert all users from json;
async function seedDB() {
  (await db)!.delete(user).then(() => {
    users.forEach((u: InferInsertModel<typeof user>) => {
      UserRepository.register({
        email: u.email,
        password: u.password,
        username: u.username
      }).then(() => console.log(`seed user: ${u.id}`))
    })
  });
}

seedDB()
