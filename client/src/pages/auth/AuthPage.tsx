import { Loader } from "@/components/ui/Loader"
import { Button } from "@/components/ui/button"
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
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4 mx-auto flex flex-col">
          <InputField
            disabled={isPending}
            icon={<UserMicroIcon />}
            description="choose a good username"
            label="Username"
            name="username"
            control={form.control} />
          <InputField
            disabled={isPending}
            icon={<KeyMicroIcon />}
            description="Type your password"
            type="password"
            label="Password"
            name="password"
            control={form.control} />
          {isRegisterPath &&
            <InputField
              disabled={isPending}
              icon={<LetterMicroIcon />}
              name="email"
              description="it must be a valid email"
              label="Email"
              control={form.control} />}
          <Toaster />
          <Button
            hoverable
            variant={"primary"}
            disabled={isPending}
            className="overflow-hidden mx-auto">
            {
              isPending
                ? <Loader />
                : "submit"
            }
          </Button>
        </form>
      </Form >
      <footer className="flex justify-center text-sm">
        {
          isRegisterPath
            ? <p>You already have an account? <Link to={"/login"} className="text-secondary">click here!</Link></p>
            : <p>You don't have an account? <Link to={"/register"} className="text-secondary">sign up!</Link></p>
        }
      </footer>
    </>
  )
}
