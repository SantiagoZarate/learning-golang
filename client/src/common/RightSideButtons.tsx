import { Button } from "@/components/ui/button"
import { useGlobalContext } from "@/hooks/useGlobalContext"
import { Link } from "react-router-dom"

export function RightSideButtons() {
  const { logoutUser, userCredentials, userIsLogged } = useGlobalContext()

  return userIsLogged
    ?
    <>
      <p className="text-xs text-card capitalize">{userCredentials.username}</p>
      <Button onClick={() => logoutUser()}>
        log out
      </Button>
    </>
    :
    <>
      <Link to={"/login"}>
        <Button variant={'ghost'} className="capitalize">
          log in
        </Button>
      </Link>
      <Link to={"/register"}>
        <Button className="capitalize">
          sign up
        </Button>
      </Link>
    </>
}
