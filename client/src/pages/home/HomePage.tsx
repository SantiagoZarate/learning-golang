import { SnippetForm } from "./SnippetForm";
import { HomePageRightSide } from "./HomePageRightSide";

export function HomePage() {
  return (
    <>
      <section className="relative flex-1">
        <SnippetForm />
      </section>
      <section className="relative flex-1 flex flex-col items-center justify-center">
        <HomePageRightSide />
      </section >
    </>
  )
}
