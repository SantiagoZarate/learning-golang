import { Outlet } from "react-router-dom";
import { Header } from "../common/Header";
import { GlobalContextProvider } from "@/contexts/globalContext";

export function AppLayout() {
  return (
    <GlobalContextProvider>
      <div className=" bg-stone-900 text-stone-300">
        <Header />
        <main className="relative max-w-screen-lg mx-auto flex md:flex-row flex-col gap-4 w-full min-h-screen">
          <Outlet />
        </main>
      </div>
    </GlobalContextProvider>
  )
}