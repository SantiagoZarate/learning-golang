import { useState } from "react";

type LogInType = {
  username: string
  password: string
}

export function useAuth() {
  const [isPending, setIsPending] = useState(false);

  const logOn = (data: LogInType): Promise<any> => {
    console.log("sending dat...", data)
    setIsPending(true)
    return fetch("http://127.0.0.1:7000/")
      .finally(() => setIsPending(false))
  }

  const isLogged = () => {
    return localStorage.getItem("logged") === "true";
  }

  const storeCredentials = () => {
    localStorage.setItem("logged", "true")
  }

  const clearCredentials = () => {
    localStorage.removeItem("logged")
  }

  return {
    logOn,
    isPending,
    isLogged,
    storeCredentials,
    clearCredentials,
  }
}