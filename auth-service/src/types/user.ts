import user from "@/resources/user/schema";
import { InferSelectModel } from "drizzle-orm";

export type User = InferSelectModel<typeof user>