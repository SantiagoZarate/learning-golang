import authAPI from "@/services/auth/index";
import { LoginPayload, RegisterPayload } from "@/types/auth";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { sessionContext } from "@/contexts/sessionContext";

export type UserCredentials = {
  username: string,
  role: string,
  pfp: string
}

export type LoginResponseApi = {
  token: string
} & UserCredentials

export function useSession() {
  const values = useContext(sessionContext)
  if (values === null) {
    throw new Error("useSession must be used within SessionProvider")
  }
  const { getToken, loginUser, logoutUser, userCredentials, userIsLogged } = values

  const redirect = useNavigate()
  const [isPending, setIsPending] = useState(false);

  const signUp = (data: RegisterPayload) => {
    setIsPending(true)
    return authAPI.register(data)
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
    return authAPI.login(data)
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
    userIsLogged,
    userCredentials,
    logoutUser,
    getToken
  }
}