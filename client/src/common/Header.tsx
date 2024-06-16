import { Button } from "@/components/ui/button";
import { useGlobalContext } from "@/hooks/useGlobalContext";
import { Link } from "react-router-dom";

export function Header() {
  const { userIsLogged } = useGlobalContext()

  return (
    <header className="z-50 absolute w-full">
      <div className="p-4 max-w-screen-lg flex justify-between items-center mx-auto">
        <p className="bg-stone-800 aspect-square p-4 rounded-xl">
          SB
        </p>
        {
          userIsLogged
            ?
            <Link to={"/account"}>
              <Button variant={'secondary'}>
                mi cuenta
              </Button>
            </Link>
            :
            <Link to={"/login"} className="underline">
              <Button>
                login
              </Button>
            </Link>
        }
      </div>
    </header>
  )
}
