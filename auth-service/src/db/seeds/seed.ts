import usersJson from './users.json'
import db from '@/utils/db'
import { InferInsertModel } from 'drizzle-orm'
import user from '@/resources/auth/schema'
import envs from '@/config/envs'
import { UserRepository } from '@/resources/auth/repository'

if (!envs.SEEDING) {
  console.log(">>> You're not in seeding mode, terminating process...")
  process.exit(1)
}

const users = usersJson as any[]

// Remove all records and insert all users from json;
db.delete(user).then(() => {
  users.forEach((u: InferInsertModel<typeof user>) => {
    UserRepository.register({
      email: u.email,
      password: u.password,
      username: u.name
    }).then(() => console.log(`seed user: ${u.id}`))
  })
});

