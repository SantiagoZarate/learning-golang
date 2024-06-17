import { Outlet } from "react-router-dom";

export function AppLayout() {
  return (
    <main className="relative max-w-screen-lg mx-auto flex md:flex-row flex-col gap-4 w-full min-h-screen pt-24">
      <Outlet />
    </main>
  )
}