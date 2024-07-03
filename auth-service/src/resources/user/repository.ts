import envs from "@/config/envs";
import db from "@/db/db";
import { LoginType, RegisterType } from "@/types/express/auth";
import { type User } from "@/types/user";
import { BadRequestError, ValidationError } from "@/utils/errors";
import { compare, hash } from 'bcrypt';
import { eq, or } from "drizzle-orm";
import user from "./schema";

export class UserRepository {
  static async findAll(): Promise<User[]> {
    const users = await (await db)!.query.user.findMany();
    return users
  }

  static async findOne({ username }: { username: string }): Promise<Pick<User, "id" | "role">> {
    const result = await (await db)!.select().from(user).where(eq(user.username, username));

    if (result.length === 0) {
      throw new ValidationError("User not found")
    }

    return {
      id: result[0].id,
      role: result[0].role,
    }
  }

  static async login({ password, username }: LoginType): Promise<User> {
    const foundUser = await (await db)!.select().from(user).where(eq(user.username, username));

    if (foundUser.length === 0) {
      throw new ValidationError("User not found")
    }

    const hasSamePassword = await compare(password, foundUser[0].password)

    if (!hasSamePassword) {
      throw new ValidationError("Incorrect password")
    }

    return foundUser[0];
  }

  static async register({ email, password, username }: RegisterType): Promise<Pick<User, "id">> {
    const foundUser = await (await db)!.select().from(user).where(or(eq(user.username, username), eq(user.email, email)));

    if (foundUser.length !== 0) {
      throw new ValidationError("Duplicated credentials")
    }

    const hashedPass = await hash(password, envs.SALT_ROUNDS)

    const result = await (await db)!.insert(user).values({
      email,
      username,
      password: hashedPass
    }).returning()

    return {
      id: result[0].id
    };
  }

  static async promoteRole(id: number): Promise<number> {
    const foundUser = await (await db)!.select().from(user).where(eq(user.id, id));

    if (foundUser.length === 0) {
      throw new ValidationError("user not found")
    }

    if (foundUser[0].role === 'admin') {
      throw new BadRequestError("user had already gotten admin priviliges")
    }

    const result = await (await db)!.update(user)
      .set({ role: 'admin' })
      .where(eq(user.id, id))
      .returning();

    return result[0].id
  }
}