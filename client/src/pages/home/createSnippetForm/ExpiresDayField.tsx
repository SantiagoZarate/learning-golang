import { useFormContext } from "react-hook-form";
import { ExpireDayButton } from "../ExpireDayButton";

interface Props {
  onDecrementDay: () => void
  onIncrementDay: () => void
}

export function ExpiresDayField({ onDecrementDay, onIncrementDay }: Props) {
  const form = useFormContext()

  return (
    <label htmlFor="expires" className="flex flex-col items-center gap-1">
      <p className="text-xs text-secondary">expires in:</p>
      <div className="flex bg-muted rounded-xl overflow-hidden">
        <ExpireDayButton onClick={onDecrementDay}>-</ExpireDayButton>
        <input
          value={form.watch("expires")}
          className="max-w-10 bg-input p-0 m-0 w-full text-center"
          type="number"
          {...form.register("expires")} />
        <ExpireDayButton onClick={onIncrementDay}>+</ExpireDayButton>
      </div>
    </label>
  )
}
