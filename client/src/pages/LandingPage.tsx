import { LeftSide } from "./landing/LeftSide";

export function LandingPage() {
  return (
    <section className="w-full">
      <div className="absolute h-[65%] w-3/4 my-44 bg-muted left-0 rounded-tr-full rounded-br-full" />
      <div className="min-h-screen max-w-screen-lg mx-auto h-full grid grid-cols-2">
        <LeftSide />
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
