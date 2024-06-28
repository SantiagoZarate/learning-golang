import { Header } from "@/common/Header";
import { ModeTooltip } from "@/components/ModeTooltip";
import { Toaster } from "@/components/ui/toaster";
import { SessionProvider } from "@/contexts/sessionContext";
import { ThemeProvider } from "@/contexts/themeContext";
import { Outlet } from "react-router-dom";

export function BaseLayout() {
  return (
    <SessionProvider>
      <ThemeProvider>
        <div className="font-geist bg-background text-primary">
          <Header />
          <Outlet />
          <ModeTooltip />
          <Toaster />
        </div>
      </ThemeProvider>
    </SessionProvider>
  )
}
