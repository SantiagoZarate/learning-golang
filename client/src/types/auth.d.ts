export type LoginPayload = {
  username: string,
  password: string
}

export type RegisterPayload = {
  email: string
} & LoginPayload