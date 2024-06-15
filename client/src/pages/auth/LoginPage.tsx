"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Loader } from "@/components/ui/Loader"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Toaster } from "@/components/ui/toaster"
import { toast } from "@/components/ui/use-toast"
import { useAuth } from "@/hooks/useAuth"
import { useNavigate } from "react-router-dom"
import { PasswordField } from "./PasswordField"
import { UsernameField } from "./UsernameField"

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string()
    .min(2, { message: "Password must be at least 2 characters." })
    .max(12, { message: "Password must be shorter than 12 characters." })
})

export type LoginFormType = z.infer<typeof FormSchema>;

export function LoginPage() {
  const redirect = useNavigate()
  const { isPending, logOn, storeCredentials } = useAuth();
  const form = useForm<LoginFormType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      password: ""
    },
  })

  function onSubmit(data: LoginFormType) {
    console.log(data)
    logOn(data)
      .then(res => {
        if (res.status === 200) {
          storeCredentials()
          return redirect("/")
        }
        console.log("Invalid credentials")
      })
      .catch(() => {
        toast({ title: "Internal error" })
        form.reset()
      })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6 mx-auto">
        <UsernameField control={form.control} description="Choose a name" />
        <PasswordField control={form.control} description="Type your password" />
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
