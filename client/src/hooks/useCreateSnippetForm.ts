import { SnippetFormType, createSnippetSchema } from "@/helpers/createSnippetSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSnippets } from "./useSnippets";
import users from "@/services/users";

export function useCreateSnippetForm() {
  const form = useForm<SnippetFormType>({
    resolver: zodResolver(createSnippetSchema),
    defaultValues: {
      content: "",
      title: "",
      expires: 1,
      sharedWith: []
    }
  })
  const { createSnippet } = useSnippets()

  const incrementExpireDay = () => {
    const currentValue = form.getValues("expires")
    form.setValue("expires", Number(currentValue) + 1)
  }

  const decrementExpireDay = () => {
    const currentValue = form.getValues("expires")
    if (currentValue === undefined || currentValue <= 1) {
      form.setValue("expires", 1)
      return
    }
    form.setValue("expires", Number(currentValue) - 1)
  }

  const handleSubmit = (data: SnippetFormType, fn: () => void) => {
    console.log(data)
    createSnippet.mutateAsync(data).then(() => {
      form.reset()
      fn()
    })
  }

  return {
    handleSubmit,
    decrementExpireDay,
    incrementExpireDay,
    isPending: createSnippet.isPending,
    form,
    users,
  }
}