import { MoonIcon } from "@/components/icons/MoonIcon";
import { SunIcon } from "@/components/icons/SunIcon";
import { UpsideArrow } from "@/components/icons/UpsideArrow";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { useGlobalContext } from "@/hooks/useGlobalContext";
import { Link } from "react-router-dom";
import { motion } from 'framer-motion'

export function Header() {
  const { toggleTheme, isDarkTheme, userIsLogged, logoutUser } = useGlobalContext()

  return (
    <motion.header
      initial={{ y: -150 }}
      animate={{ y: 0 }}
      className="z-50 top-0 fixed w-full backdrop-blur-sm">
      <div className="p-4 max-w-screen-lg flex justify-between items-center mx-auto">
        <section className="flex items-center gap-4">
          <Link to={"/"}>
            <p className="bg-stone-800 aspect-square p-4 rounded-xl text-accent font-bold">
              SB
            </p>
          </Link>
          <nav>
            <Link to={"/home"}>
              <p className="text-sm hover:opacity-100 opacity-50 uppercase transition hover:-translate-y-1">
                home
              </p>
            </Link>
          </nav>
        </section>
        <section className="flex items-center divide-x">
          <Popover>
            <PopoverTrigger className="hover:translate-y-1 transition p-2 mx-2">
              <UpsideArrow />
            </PopoverTrigger>
            <PopoverContent className="flex flex-col w-fit p-0 bg-background">
              <ul className="flex flex-col divide-y text-sm">
                <li>
                  <p className="font-bold text-center py-1 text-xs bg-muted">Theme</p>
                  <button className="w-fit space-x-0 flex gap-2 hover:bg-muted transition px-8 py-2" onClick={toggleTheme}>
                    {
                      isDarkTheme
                        ? <MoonIcon />
                        : <SunIcon />
                    }
                    toggle
                  </button>
                </li>
                <li>
                  <p className="font-bold py-1 text-center capitalize text-xs bg-muted">language</p>
                  <ul className="flex flex-col divide-y *:px-4 *:py-2 *:text-center capitalize">
                    <li>spanish</li>
                    <li>english</li>
                  </ul>
                </li>
              </ul>
            </PopoverContent>
          </Popover>
          {
            userIsLogged
              ?
              <div className="px-2">
                <Button onClick={() => logoutUser()}>
                  log out
                </Button>
              </div>
              :
              <div className="flex gap-2 px-2">
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
              </div>
          }
        </section>
      </div>
    </motion.header>
  )
}
