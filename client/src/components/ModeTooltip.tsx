import { LightrayIcon } from "@/icons/LightrayIcon";
import { VialIcon } from "@/icons/VialIcon";

export function ModeTooltip() {
  return (
    <div className="fixed left-0 bottom-0 capitalize text-xs px-4 py-2 bg-muted text-border rounded-xl m-4">
      {
        import.meta.env.DEV
          ? <span className="flex gap-2 items-center">
            <VialIcon />
            Developmnent
          </span>
          : <span className="flex gap-2 items-center">
            <LightrayIcon />
            Production
          </span>
      }
    </div>
  )
}
