import { Variants, motion } from "framer-motion";
import { PropsWithChildren } from "react";
import React from "react";

const variants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0,
    transition: {
      duration: 0.1
    }
  },
  visible: {
    opacity: 1,
    scale: 1
  },
}

interface Props extends PropsWithChildren {
  zIndex?: number,
  skeleton?: boolean,
  onClick?: () => void
}

export const UserSelectedAvatar = React.forwardRef<HTMLLIElement, Props>(({ onClick, skeleton, children, zIndex }, ref) => (
  <motion.li
    ref={ref}
    layout
    variants={variants}
    initial={"hidden"}
    animate={"visible"}
    exit={"hidden"}
    whileHover={skeleton ? {} : { y: -4 }}
    onClick={onClick}
    className={`w-8 aspect-square overflow-hidden rounded-full border border-background bg-muted ${zIndex === 0 ? "" : "-ml-2 "} ${skeleton ? "" : "cursor-pointer"}`}
    style={{ zIndex }}
  >
    {children}
  </motion.li>
))