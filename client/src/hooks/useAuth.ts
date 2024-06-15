import { login } from "@/services/auth/login";
import { register } from "@/services/auth/register";
import { LoginPayload, RegisterPayload } from "@/types/auth";
import console from "console";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie'

export function useAuth() {
  const [_cookies, setCookie] = useCookies(['access_token'])
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

  const logOn = (data: LoginPayload): Promise<any> => {
    setIsPending(true)
    return login(data)
      .finally(() => setIsPending(false))
      .then(res => {
        if (res.status === 200) {
          res.json()
            .then(res => {
              setCookie("access_token", res.token)
            })
            .then(() => {
              return redirect("/")
            })
        }
        console.log("Invalid credentials")
      })
  }

  const isLogged = () => {
    return localStorage.getItem("logged") === "true";
  }

  const storeCredentials = (cookie: string) => {
    document.cookie = cookie;
  }

  const clearCredentials = () => {
    localStorage.removeItem("logged")
  }

  return {
    signUp,
    logOn,
    isPending,
    isLogged,
    storeCredentials,
    clearCredentials,
  }
}