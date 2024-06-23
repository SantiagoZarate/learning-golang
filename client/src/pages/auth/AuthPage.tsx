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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6 mx-auto">
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
          disabled={isPending}
          className="overflow-hidden"
          type="submit">
          {
            isPending
              ? <Loader />
              : "submit"
          }
        </Button>
      </form>
    </Form >
  )
}
