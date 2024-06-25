import { login } from "@/services/auth/login";
import { register } from "@/services/auth/register";
import { LoginPayload, RegisterPayload } from "@/types/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "./useGlobalContext";

export type UserCredentials = {
  username: string,
  role: string
}

export type LoginResponseApi = {
  token: string
} & UserCredentials

export function useAuth() {
  const { loginUser } = useGlobalContext()
  const redirect = useNavigate()
  const [isPending, setIsPending] = useState(false);

  const signUp = (data: RegisterPayload) => {
    setIsPending(true)
    return register(data)
      .finally(() => setIsPending(false))
      .then(res => {
        if (res.status === 200) {
          return redirect("/")
        }
        console.log("There was an error")
      })
  }

  const logOn = (data: LoginPayload, fn: (msg: string) => any): Promise<any> => {
    setIsPending(true)
    return login(data)
      .then(res => {
        if (res.status === 200) {
          res.json()
            .then(res => {
              loginUser(res)
            })
            .then(() => {
              return redirect("/")
            })
        }
        if (res.status === 401) {
          fn("Invalid credentials")
        }
        if (res.status >= 500) {
          fn("We're having some issues, try again later")
        }
      })
      .finally(() => setIsPending(false))
  }

  return {
    signUp,
    logOn,
    isPending,
  }
}