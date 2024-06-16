import { MoonIcon } from "@/components/icons/MoonIcon";
import { SunIcon } from "@/components/icons/SunIcon";
import { Button } from "@/components/ui/button";
import { useGlobalContext } from "@/hooks/useGlobalContext";
import { Link } from "react-router-dom";

export function Header() {
  const { userIsLogged, toggleTheme, isDarkTheme } = useGlobalContext()

  return (
    <header className="z-50 absolute w-full">
      <div className="p-4 max-w-screen-lg flex justify-between items-center mx-auto">
        <p className="bg-stone-800 aspect-square p-4 rounded-xl">
          SB
        </p>
        <section className="flex items-center gap-2">
          <Button className="w-fit space-x-0" onClick={toggleTheme}>
            {
              isDarkTheme
                ? <MoonIcon />
                : <SunIcon />
            }
          </Button>
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
        </section>
      </div>
    </header>
  )
}
