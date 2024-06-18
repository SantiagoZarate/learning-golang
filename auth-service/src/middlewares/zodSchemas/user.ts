import { z } from 'zod'

export const userLoginSchema = z.object({
  username: z.string().min(4).max(20),
  password: z.string().min(6).max(20)
})

export const userRegisterSchema = userLoginSchema.extend({
  email: z.string().email()
})