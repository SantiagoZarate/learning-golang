import { useSession } from "@/hooks/useSession"
import { Navigate, Outlet } from "react-router-dom"

export function ProtectedRoute() {
  const { userIsLogged } = useSession()

  return userIsLogged ? <Outlet /> : <Navigate to={"/home"} />
}
