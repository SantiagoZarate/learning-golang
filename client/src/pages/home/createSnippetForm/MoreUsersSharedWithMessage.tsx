import React from "react";
import { motion } from "framer-motion";

interface Props {
  totalUsers: number
}

export const MoreUsersMessage = React.forwardRef<HTMLParagraphElement, Props>(({ totalUsers }, ref) =>
  <motion.p
    ref={ref}
    animate={{ x: 0, opacity: 1 }}
    exit={{ x: -100, opacity: 0 }}
    initial={{ x: -100, opacity: 0 }}
    className="px-2 text-xs text-secondary min-w-24">
    and {totalUsers - 5} more...
  </motion.p>
)