import { sessionContext } from "@/contexts/sessionContext";
import { useContext } from "react";

export function useGlobalContext() {
  const values = useContext(sessionContext);

  if (!values) {
    throw new Error("You must use this hook inside of the global provider contenxt")
  }

  return values
}