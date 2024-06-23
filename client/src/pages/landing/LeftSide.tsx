import { Button } from "@/components/ui/button"
import { Variants } from "framer-motion"
import { Link } from "react-router-dom"
import { motion } from 'framer-motion'

const itemVariants: Variants = {
  animate: {
    zIndex: 0,
    y: 0,
    opacity: 1,
    scale: 1,
    filter: "blur(0px",
  },
  initial: {
    y: 40,
    scale: 0.8,
    opacity: 0,
    filter: "blur(3px)"
  }
}

const demoVariants: Variants = {
  animate: {
    transition: {
      bounce: 0,
      staggerChildren: 0.05,
      stiffness: 100
    },
  },
  initial: {
  }
};

export function LeftSide() {
  return (
    <motion.article
      variants={demoVariants}
      animate="animate"
      initial="initial"
      className="z-10 flex flex-col justify-center gap-2">
      <motion.h1 variants={itemVariants} className="text-[72px] font-bold text-accent">Snippetbox</motion.h1>
      <motion.p variants={itemVariants}>Share what are you thinking at any time and check other people's snippets out!</motion.p>
      <motion.footer variants={itemVariants} className="flex gap-4">
        <Link to={"/home"}>
          <Button variant={'secondary'} className="uppercase w-fit rounded-full font-bold bg-card text-secondary">
            Try it now!
          </Button>
        </Link>
        <Link to={"/login"}>
          <Button className="uppercase w-fit rounded-full font-bold bg-card text-secondary">
            Create an account
          </Button>
        </Link>
      </motion.footer>
    </motion.article>
  )
}
