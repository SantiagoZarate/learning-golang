import { Loader } from "@/components/ui/Loader"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Toaster } from "@/components/ui/toaster"
import { toast } from "@/components/ui/use-toast"
import { RegisterFormType, loginSchema, registerSchema } from "@/helpers/formSchemas"
import { useAuth } from "@/hooks/useAuth"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useLocation } from "react-router-dom"
import { InputField } from "./InputField"

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
        <InputField
          description="Type your password"
          label="Password"
          name="password"
          control={form.control} />
        <InputField
          description="choose a good username"
          label="Username"
          name="username"
          type="password"
          control={form.control} />
        {isRegisterPath &&
          <InputField
            name="email"
            description="it must be a valid email"
            label="Email"
            control={form.control} />}
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
