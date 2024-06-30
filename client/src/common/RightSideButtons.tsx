import { Button } from "@/components/ui/button"
import { useSession } from "@/hooks/useSession"
import { Link } from "react-router-dom"

export function RightSideButtons() {
  const { userCredentials, userIsLogged } = useSession()

  return (
    <div className="px-2 flex gap-2 items-center border-l">
      {
        userIsLogged
          ?
          <Link to={"/profile"}>
            <Button variant={"link"}>
              <p className="text-xs text-card capitalize">{userCredentials!.username}</p>
            </Button>
          </Link>
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
    </div>
  )
}
