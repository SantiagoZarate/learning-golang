import { Outlet } from "react-router-dom";

export function AppLayout() {
  return (
    <main className="relative max-w-screen-lg mx-auto flex md:flex-row w-full min-h-screen max-h-screen gap-4 pt-24">
      <Outlet />
    </main>
  )
}