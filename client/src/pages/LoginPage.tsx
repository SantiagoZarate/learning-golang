"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Toaster } from "@/components/ui/toaster"
import { toast } from "@/components/ui/use-toast"
import { useAuth } from "@/hooks/useAuth"
import { Loader } from "@/components/ui/Loader"
import { useNavigate } from "react-router-dom"

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string()
    .min(2, { message: "Password must be at least 2 characters." })
    .max(12, { message: "Password must be shorter than 12 characters." })
})

type LoginFormType = z.infer<typeof FormSchema>;

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
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input disabled={isPending} placeholder="LionelMessi2022" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input disabled={isPending} placeholder="******" {...field} />
              </FormControl>
              <FormDescription>
                This is going to be your password.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
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
