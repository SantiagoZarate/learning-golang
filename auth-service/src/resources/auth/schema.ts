import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

const user = pgTable("user", {
  id: serial("id"),
  name: text("name").unique().notNull(),
  email: text("email").unique().notNull(),
  password: text("password").notNull(),
  role: text("role").$type<"admin" | "user">().$default(() => "user"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export default user;