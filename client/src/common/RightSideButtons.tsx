import { Button } from "@/components/ui/button"
import { useSession } from "@/hooks/useSession"
import { Link } from "react-router-dom"

export function RightSideButtons() {
  const { logoutUser, userCredentials, userIsLogged } = useSession()

  return userIsLogged
    ?
    <>
      <Link to={"/profile"}>
        <Button variant={"link"}>
          <p className="text-xs text-card capitalize">{userCredentials!.username}</p>
        </Button>
      </Link>
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
