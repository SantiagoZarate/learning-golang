import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

const user = pgTable("account", {
  id: serial("id").primaryKey(),
  username: text("username").unique().notNull(),
  email: text("email").unique().notNull(),
  password: text("password").notNull(),
  role: text("role").$type<"admin" | "user" | "premium">().$default(() => "user"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  pfp: text("pfp")
});

export default user;