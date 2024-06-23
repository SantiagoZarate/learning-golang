import { VialIcon } from "@/icons/VialIcon";
import { Outlet } from "react-router-dom";

export function AuthLayout() {
  return (
    <section className="grid grid-cols-5 gap-8 w-full">
      <article className="col-span-3 flex flex-col justify-center">
        <p className="text-secondary text-[72px]">Be part of the platform!</p>
      </article>
      <article className="w-full flex flex-col gap-4 col-span-2 py-32">
        <footer className="border-dotted border-4 border-green-700 bg-green-900/20 text-green-400 p-6 rounded-xl flex gap-4 items-center">
          <span className="w-fit">
            <VialIcon />
          </span>
          <h2 className="text-sm">This is a development platform, so dont hesitate to use your actual credentials.</h2>
        </footer>
        <Outlet />
      </article>
    </section>
  )
}
