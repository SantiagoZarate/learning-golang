import { InferSelectModel, eq } from "drizzle-orm";
import { hash, compare } from 'bcrypt'
import db from "@/utils/db";
import envs from "@/config/envs";
import { ValidationError } from "@/utils/errors";
import user from "./schema";

interface LoginType {
  username: string,
  password: string
}

interface RegisterType extends LoginType {
  email: string
}

export class UserRepository {
  static async findAll(): Promise<InferSelectModel<typeof user>[]> {
    const users = await db.query.user.findMany();
    return users
  }

  static async login({ password, username }: LoginType): Promise<InferSelectModel<typeof user>> {
    const foundUser = await db.select().from(user).where(eq(user.name, username));

    if (foundUser.length === 0) {
      throw new ValidationError("User not found")
    }

    const hasSamePassword = await compare(password, foundUser[0].password)

    if (!hasSamePassword) {
      throw new ValidationError("Incorrect password")
    }

    return foundUser[0];
  }

  static async register({ email, password, username }: RegisterType): Promise<number> {
    const foundUser = await db.select().from(user).where(eq(user.name, username));

    if (foundUser.length !== 0) {
      throw new ValidationError("Duplicated credentials")
    }

    const hashedPass = await hash(password, envs.SALT_ROUNDS)

    const result = await db.insert(user).values({
      email,
      password: hashedPass,
      name: username,
      role: 'default'
    }).returning()

    return result[0].id;
  }
}