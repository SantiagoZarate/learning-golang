import { globalContext } from "@/contexts/globalContext";
import { useContext } from "react";

export function useGlobalContext() {
  const values = useContext(globalContext);

  if (!values) {
    throw new Error("You must use this hook inside of the global provider contenxt")
  }

  return values
}