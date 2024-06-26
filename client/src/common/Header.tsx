import { motion } from 'framer-motion';
import { Link } from "react-router-dom";
import { AppMenuPopover } from "./AppMenuPopover";
import { RightSideButtons } from "./RightSideButtons";

export function Header() {
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
        <section className="flex items-center">
          <AppMenuPopover />
          <RightSideButtons />
        </section>
      </div >
    </motion.header >
  )
}
