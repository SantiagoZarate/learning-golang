import { Link } from "react-router-dom";
import { LightrayIcon } from "../icons/LightrayIcon";
import { VialIcon } from "../icons/VialIcon";

export function Header() {
  return (
    <header className="absolute p-4 flex justify-between items-center w-full">
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
      <div>
        <Link to={"/login"} className="underline">
          login
        </Link>
      </div>
    </header>
  )
}
