import { InferSelectModel, eq, or } from "drizzle-orm";
import { hash, compare } from 'bcrypt'
import envs from "@/config/envs";
import { ValidationError } from "@/utils/errors";
import { LoginType, RegisterType } from "@/types/express/auth";
import user from "./schema";
import db from "@/db/db";

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
    const foundUser = await db.select().from(user).where(or(eq(user.name, username), eq(user.email, email)));

    if (foundUser.length !== 0) {
      throw new ValidationError("Duplicated credentials")
    }

    const hashedPass = await hash(password, envs.SALT_ROUNDS)

    const result = await db.insert(user).values({
      email,
      password: hashedPass,
      name: username,
    }).returning()

    return result[0].id;
  }

  static async promoteRole(id: number): Promise<number> {
    const foundUser = await db.select().from(user).where(eq(user.id, id));

    if (foundUser.length === 0) {
      throw new ValidationError("user not found")
    }

    if (foundUser[0].role === 'admin') {
      throw new ValidationError("user had already gotten admin priviliges")
    }

    const result = await db.update(user)
      .set({ role: 'admin' })
      .where(eq(user.id, id))
      .returning();

    return result[0].id
  }
}