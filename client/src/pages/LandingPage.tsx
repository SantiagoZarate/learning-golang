import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function LandingPage() {
  return (
    <section className="w-full">
      <div className="absolute h-[65%] w-3/4 my-44 bg-muted left-0 rounded-tr-full rounded-br-full" />
      <div className="min-h-screen max-w-screen-lg mx-auto h-full grid grid-cols-2">
        <article className="z-10 flex flex-col justify-center gap-2">
          <h1 className="text-[72px] font-bold text-accent">Snippetbox</h1>
          <p>Share what are you thinking at any time and check other people's snippets out!</p>
          <footer className="flex gap-4">
            <Link to={"/home"}>
              <Button variant={'secondary'} className="uppercase w-fit rounded-full font-bold bg-card text-secondary">
                Try it now!
              </Button>
            </Link>
            <Link to={"/login"}>
              <Button className="uppercase w-fit rounded-full font-bold bg-card text-secondary">
                Create an account
              </Button>
            </Link>
          </footer>
        </article>
        <article className="relative flex items-center p-8">
          <div className="shadow-xl w-full border-8 border-border rounded-3xl aspect-square overflow-hidden">
            <div className="w-full h-full bg-stone-900 p-4">

            </div>
            {/* <img
              className="w-full h-full object-cover bg-stone-950 rounded-xl"
              src=""
              alt="" /> */}
          </div>
        </article>
      </div>
    </section>
  )
}
