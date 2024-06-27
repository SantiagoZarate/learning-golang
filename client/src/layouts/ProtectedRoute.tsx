import { useGlobalContext } from "@/hooks/useGlobalContext"
import { Navigate, Outlet } from "react-router-dom"

export function ProtectedRoute() {
  const { userIsLogged } = useGlobalContext()
  return userIsLogged ? <Outlet /> : <Navigate to={"/home"} />
}
