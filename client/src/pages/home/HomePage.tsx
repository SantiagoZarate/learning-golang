import { SnippetForm } from "./SnippetForm";
import { HomePageRightSide } from "./HomePageRightSide";

export function HomePage() {
  return (
    <>
      <section className="relative flex-1">
        <SnippetForm />
      </section>
      <section className="relative flex-1 flex flex-col max-h-full overflow-y-auto items-center justify-center">
        <HomePageRightSide />
      </section >
    </>
  )
}
