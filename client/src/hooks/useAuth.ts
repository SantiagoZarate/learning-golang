import { login } from "@/services/auth/login";
import { register } from "@/services/auth/register";
import { LoginPayload, RegisterPayload } from "@/types/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "./useGlobalContext";

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

  const logOn = (data: LoginPayload): Promise<any> => {
    setIsPending(true)
    return login(data)
      .then(res => {
        if (res.status === 200) {
          res.json()
            .then(res => {
              loginUser(res.token)
            })
            .then(() => {
              return redirect("/")
            })
        }
        console.log("Invalid credentials")
      })
      .finally(() => setIsPending(false))
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