import { ComponentProps } from "react";
import { cva, VariantProps } from "class-variance-authority";

const styles = cva(
  "capitalize",
  {
    variants: {
      intent: {
        regular: "text-primary",
        title: "text-primary text-lg uppercase",
        details: "text-secondary text-xs",
        discrete: "text-border text-xs"
      },
      hoverable: {
        true: "text-primary/50 group-hover:text-primary hover:text-primary transition"
      }
    },
    defaultVariants: {
      intent: "regular",
      hoverable: false
    }
  }
)

type Props = VariantProps<typeof styles> & ComponentProps<"p">

export function Text({ intent, hoverable, ...args }: Props) {
  return <p className={styles({ intent, hoverable })} {...args} />
}