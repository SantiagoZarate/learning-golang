import { Link } from "react-router-dom";
import { LightrayIcon } from "../icons/LightrayIcon";
import { VialIcon } from "../icons/VialIcon";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

export function Header() {
  const { isLogged } = useAuth();
  const userAuthorized = isLogged();

  return (
    <header className="z-50 absolute w-full">
      <div className="p-4 max-w-screen-lg flex justify-between items-center mx-auto">
        <p className="capitalize text-xs px-4 py-2 bg-stone-800 text-stone-600 rounded-xl">
          {
            import.meta.env.DEV
              ? <span className="flex gap-2 items-center">
                <VialIcon />
                Developmnent
              </span>
              : <span className="flex gap-2 items-center">
                <LightrayIcon />
                Production
              </span>
          }
        </p>
        {
          userAuthorized
            ? <Button variant={'secondary'}>
              <Link to={"/account"}>
                mi cuenta
              </Link>
            </Button>
            :
            <Button>
              <Link to={"/login"} className="underline">
                login
              </Link>
            </Button>
        }
      </div>
    </header>
  )
}
