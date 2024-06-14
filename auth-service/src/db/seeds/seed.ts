import usersJson from './users.json'
import db from '@/utils/db'
import { InferInsertModel } from 'drizzle-orm'
import user from '@/resources/auth/schema'
import envs from '@/config/envs'

if (!envs.SEEDING) {
  console.log(">>> You're not in seeding mode, terminating process...")
  process.exit(1)
}

const users = usersJson as any[]

users.forEach((u: InferInsertModel<typeof user>) => {
  db.insert(user).values({
    email: u.email,
    name: u.name,
    password: u.password,
    role: u.role,
  }).then(() => console.log(`seed user: ${u.id}`))
})
