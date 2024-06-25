import { Loader } from "@/components/ui/Loader"
import { Form } from "@/components/ui/form"
import { Toaster } from "@/components/ui/toaster"
import { toast } from "@/components/ui/use-toast"
import { RegisterFormType, loginSchema, registerSchema } from "@/helpers/formSchemas"
import { useAuth } from "@/hooks/useAuth"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Link, useLocation } from "react-router-dom"
import { InputField } from "./InputField"
import { KeyMicroIcon } from "@/components/icons/KeyMicroIcon"
import { UserMicroIcon } from "@/components/icons/UserMicroIcon"
import { LetterMicroIcon } from "@/components/icons/LetterMicroIcon"
import { AnimatePresence, motion } from "framer-motion"
import { PropsWithChildren } from "react"

export function AuthPage() {
  const isRegisterPath = useLocation().pathname === "/register"
  const { isPending, logOn, signUp } = useAuth();
  const form = useForm<RegisterFormType>({
    resolver: zodResolver(isRegisterPath ? registerSchema : loginSchema),
    defaultValues: {
      email: "",
      password: "",
      username: ""
    }
  })

  function renderToaster(message: string) {
    toast({ title: message })
  }

  function onSubmit(data: RegisterFormType) {
    isRegisterPath
      ? signUp(data)
        .catch(() => {
          toast({ title: "Internal error" })
          form.reset()
        })
      : logOn(data, renderToaster)
        .catch(() => {
          toast({ title: "Internal error" })
          form.reset()
        })
  }

  return (
    <>
      <AnimatePresence mode="popLayout">
        <article className="relative rounded-xl w-full bg-gradient-to-t from-transparent to-muted  flex py-10 px-6 flex-col gap-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4 mx-auto flex flex-col">
              <InputField
                key={"username"}
                disabled={isPending}
                icon={<UserMicroIcon />}
                description="choose a good username"
                name="username"
                control={form.control} />
              <InputField
                key={"password"}
                disabled={isPending}
                icon={<KeyMicroIcon />}
                description="Type your password"
                type="password"
                name="password"
                control={form.control} />
              {isRegisterPath &&
                <InputField
                  key={"email"}
                  disabled={isPending}
                  icon={<LetterMicroIcon />}
                  name="email"
                  description="it must be a valid email"
                  control={form.control} />}
              <motion.button
                key={"button"}
                className="mx-auto uppercase text-sm px-4 py-2 w-fit rounded-full font-bold bg-card text-secondary hover:bg-secondary/80"
                disabled={isPending}
                layout>
                {
                  isPending
                    ? <Loader />
                    :
                    isRegisterPath
                      ? <AnimatedBlurry key={"Sign up!"}>Sign up!</AnimatedBlurry>
                      : <AnimatedBlurry key={"Sign in!"}>Sign in!</AnimatedBlurry>
                }
              </motion.button>
            </form>
          </Form >
          <motion.footer layout className="flex justify-center text-sm">
            {
              isRegisterPath
                ? <AnimatedBlurry key={"login"}>You already have an account?<Link to={"/login"} className="text-secondary"> click here!</Link></AnimatedBlurry>
                : <AnimatedBlurry key={"register"}>You don't have an account?<Link to={"/register"} className="text-secondary"> sign up!</Link></AnimatedBlurry>
            }
          </motion.footer>
        </article>
      </AnimatePresence >
      <Toaster />
    </>
  )
}

export function AnimatedBlurry({ children }: PropsWithChildren) {
  return (
    <motion.p
      exit={{ filter: "blur(4px)" }}
      initial={{ filter: "blur(4px)" }}
      animate={{ filter: "blur(0px)" }}>
      {children}
    </motion.p>
  )
}
