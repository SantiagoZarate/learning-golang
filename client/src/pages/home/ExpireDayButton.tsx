import { ComponentProps } from "react";

interface Props extends ComponentProps<"button"> {
}

export function ExpireDayButton(args: Props) {
  return (
    <button
      {...args}
      type="button"
      className="py-1 px-3 hover:bg-card transition">
      {args.children}
    </button>
  )
}
