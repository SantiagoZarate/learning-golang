import { useTheme } from "@/hooks/useTheme";
import { MoonIcon, SunIcon } from "lucide-react";

export function AppMenuPopover() {
  const { isDarkTheme, toggleTheme } = useTheme()

  return (
    <ul className="flex flex-col divide-y text-sm">
      <li>
        <p className="font-bold text-center py-1 text-xs bg-muted">Theme</p>
        <button className="w-fit space-x-0 flex gap-2 hover:bg-muted text-xs text-primary/70 items-center transition px-8 py-2" onClick={toggleTheme}>
          {
            isDarkTheme
              ? <MoonIcon />
              : <SunIcon />
          }
          toggle
        </button>
      </li>
      <li>
        <p className="font-bold py-1 text-center capitalize text-xs bg-muted">language</p>
        <ul className="flex flex-col divide-y *:px-4 *:py-2 *:text-center capitalize">
          <li>spanish</li>
          <li>english</li>
        </ul>
      </li>
    </ul>
  )
}