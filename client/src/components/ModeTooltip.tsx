import { LightrayIcon } from "@/icons/LightrayIcon";
import { VialIcon } from "@/icons/VialIcon";

export function ModeTooltip() {
  return (
    <div className="absolute left-0 bottom-0 capitalize text-xs px-4 py-2 bg-stone-800 text-stone-600 rounded-xl m-4">
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
