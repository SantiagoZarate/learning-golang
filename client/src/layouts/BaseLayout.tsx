import { Header } from "@/common/Header";
import { ModeTooltip } from "@/components/ModeTooltip";
import { GlobalContextProvider } from "@/contexts/globalContext";
import { Outlet } from "react-router-dom";

export function BaseLayout() {
  return (
    <GlobalContextProvider>
      <div className="font-geist bg-stone-900 text-stone-300">
        <Header />
        <Outlet />
        <ModeTooltip />
      </div>
    </GlobalContextProvider>
  )
}
