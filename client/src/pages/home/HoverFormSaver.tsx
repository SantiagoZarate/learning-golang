import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function HoverFormSaver() {
  return (
    <div className="absolute z-20 flex flex-col gap-4 transition duration-300 opacity-0 hover:opacity-100 backdrop-blur-md inset-0 justify-center items-center">
      <p>You must log on to create a a new snippet</p>
      <Link to={"/login"}>
        <Button>
          log in
        </Button>
      </Link>
    </div>
  )
}
