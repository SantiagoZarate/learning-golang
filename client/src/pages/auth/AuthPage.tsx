"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Loader } from "@/components/ui/Loader"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Toaster } from "@/components/ui/toaster"
import { toast } from "@/components/ui/use-toast"
import { useAuth } from "@/hooks/useAuth"
import { useLocation } from "react-router-dom"
import { PasswordField } from "./PasswordField"
import { UsernameField } from "./UsernameField"
import { EmailField } from "./EmailField"
import { RegisterFormType, loginSchema, registerSchema } from "@/helpers/formSchemas"

export function AuthPage() {
  const isRegisterPath = useLocation().pathname === "/register"
  const { isPending, logOn, signUp } = useAuth();
  const form = useForm<RegisterFormType>({
    resolver: zodResolver(isRegisterPath ? registerSchema : loginSchema),
  })

  function onSubmit(data: RegisterFormType) {
    isRegisterPath
      ? signUp(data)
        .catch(() => {
          toast({ title: "Internal error" })
          form.reset()
        })
      : logOn(data)
        .catch(() => {
          toast({ title: "Internal error" })
          form.reset()
        })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6 mx-auto">
        <PasswordField control={form.control} description="Type your password" />
        <UsernameField control={form.control} description="choose a good username" />
        {isRegisterPath && <EmailField control={form.control} description="it must be a valid emial" />}
        <Toaster />
        <Button
          disabled={isPending}
          type="submit">
          {
            isPending
              ? <Loader />
              : "submit"
          }
        </Button>
      </form>
    </Form>
  )
}
