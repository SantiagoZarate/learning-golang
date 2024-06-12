import { InferSelectModel, eq } from "drizzle-orm";
import db from "../../utils/db";
import user from "./schema";
import { ValidationError } from "../../utils/errors";

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

    if (foundUser[0].password !== password) {
      throw new ValidationError("Incorrect password")
    }

    return foundUser[0];
  }

  static async register({ email, password, username }: RegisterType): Promise<number> {
    const foundUser = await db.select().from(user).where(eq(user.name, username));
    console.log("Ya busque el usuario")
    if (foundUser.length !== 0) {
      throw new ValidationError("Duplicated credentials")
    }
    console.log("aca no deberia llegar")

    const result = await db.insert(user).values({
      password,
      email,
      name: username,
      role: 'default'
    }).returning()

    return result[0].id;
  }
}