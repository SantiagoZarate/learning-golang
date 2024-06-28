import { LeftSide } from "./LeftSide";
import { RightSide } from "./RightSide";

export function LandingPage() {
  return (
    <section className="w-full">
      <div className="absolute h-[65%] w-3/4 my-44 bg-muted left-0 rounded-tr-full rounded-br-full" />
      <div className="min-h-screen max-w-screen-lg mx-auto h-full grid grid-cols-2">
        <LeftSide />
        <RightSide />
      </div>
    </section>
  )
}
