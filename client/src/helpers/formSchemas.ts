import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string()
    .min(2, { message: "Password must be at least 2 characters." })
    .max(12, { message: "Password must be shorter than 12 characters." }),
})

export const registerSchema = loginSchema.extend({
  email: z.string()
    .min(2, { message: "email must be at least 2 characters." })
    .email()
})

export type RegisterFormType = z.infer<typeof registerSchema>;

export type LoginFormType = z.infer<typeof loginSchema>;