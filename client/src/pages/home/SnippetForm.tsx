import { FormSectionHeader } from "@/components/FormSectionHeader";
import { SendIcon } from "@/components/icons/SendIcon";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/toaster";
import { SnippetFormType, createSnippetSchema } from "@/helpers/createSnippetSchema";
import { useGlobalContext } from "@/hooks/useGlobalContext";
import snippetAPI from "@/services/snippets";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from "react-hook-form";
import { HoverFormSaver } from "./HoverFormSaver";
import { PublicTag } from "@/components/snippet/PublicTag";
import { ExpireDayButton } from "./ExpireDayButton";
import { type Snippet as SnippetType } from "@/types/snippet";
import { PeopleList } from "./createSnippetForm/peopleList";
import { User } from "@/types/user";
import { useState } from "react";
import data from '@/data/users.json'

export function SnippetForm() {
  const { userIsLogged, getToken } = useGlobalContext()
  const form = useForm<SnippetFormType>({
    resolver: zodResolver(createSnippetSchema),
    defaultValues: {
      content: "",
      title: "",
      expires: 1,
      sharedWith: []
    }
  })
  const queryClient = useQueryClient()
  const [users, setUsers] = useState<{ available: User[], selected: User[] }>({ available: data, selected: [] })

  const { isPending, mutate } = useMutation({
    mutationKey: ["snippets"],
    mutationFn: (data: SnippetFormType) => snippetAPI.createSnippet(data, getToken()),
    onMutate: async (newSnippet: SnippetFormType) => {
      await queryClient.cancelQueries({ queryKey: ["snippets"] })
      const previousSnippets = queryClient.getQueryData(["snippets"])

      queryClient.setQueryData(["snippets"], (oldData: SnippetType[]) => {
        if (oldData === null) {
          return [newSnippet]
        }
        return [
          {
            ...newSnippet,
            id: oldData.length + 1,
            isRecentlyAdded: true
          },
          ...oldData,
        ]
      })
      return { previousSnippets }
    },
    onError: (error, _, context) => {
      console.log(error)
      if (context?.previousSnippets !== undefined) {
        queryClient.setQueryData(["snippets"], context.previousSnippets)
      }
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["snippets"]
      })
    },
    onSuccess: () => {
      console.log("Snippet added succesfully")
      form.reset()
    },
  });

  const incrementExpireDay = () => {
    const currentValue = form.getValues("expires")
    form.setValue("expires", Number(currentValue) + 1)
  }

  const decrementExpireDay = () => {
    const currentValue = form.getValues("expires")
    if (currentValue === undefined) {
      form.setValue("expires", 1)
      return
    }
    if (currentValue <= 1) {
      return
    }
    form.setValue("expires", Number(currentValue) - 1)
  }

  const addInvitedUser = (id: number) => {
    const user = users.available.find(u => u.id === id)
    if (user === undefined) {
      return
    }

    setUsers((prevState) => {
      return {
        available: prevState.available.filter(user => user.id !== id),
        selected: [...prevState.selected, user]
      }
    })

    // const prevState = form.getValues("sharedWith")
    // if (prevState === undefined) {
    //   form.setValue("sharedWith", [{ id: user.id }])
    //   return
    // }

    // form.setValue("sharedWith", [...prevState, { id: user.id }])
  }

  return (
    <section className="fixed w-1/4 flex flex-col gap-4 items-center justify-center">
      {!userIsLogged && <HoverFormSaver />}
      <article className="w-full flex flex-col gap-4">
        <FormSectionHeader
          icon={<SendIcon />}
          title="Create a new snippetbox."
          description="Up to 140 chars!" />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(data => mutate(data))}
            className="focus-within:scale-[103%] focus-within:shadow-xl hover:shadow-xl hover:scale-[103%] transition-all duration-300 relative w-full space-y-2 mx-auto p-2 border border-border bg-card-foreground rounded-xl">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      className="border-none bg-input rounded-none rounded-tl-xl rounded-tr-xl "
                      placeholder="Howdy" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      className="border-none bg-input rounded-none rounded-bl-xl rounded-br-xl min-h-20 text-left"
                      placeholder="it all started when i was 3 years old.." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <footer className="flex justify-between items-center ">
              {
                users.selected.length < 1
                  ? <PublicTag />
                  :
                  <ul className="flex">
                    {
                      users.selected.map(user => (
                        <li key={user.id} className="w-6 aspect-square overflow-hidden rounded-full border border-background bg-card">
                          <img src={user.pfp} alt="" />
                        </li>
                      ))
                    }
                  </ul>
              }
              <label htmlFor="expires" className="flex flex-col items-center gap-1">
                <p className="text-xs text-secondary">expires in:</p>
                <div className="flex bg-muted rounded-xl overflow-hidden">
                  <ExpireDayButton onClick={decrementExpireDay}>-</ExpireDayButton>
                  <input
                    value={form.watch("expires")}
                    className="max-w-10 bg-input p-0 m-0 w-full text-center"
                    type="number"
                    {...form.register("expires")} />
                  <ExpireDayButton onClick={incrementExpireDay}>+</ExpireDayButton>
                </div>
              </label>
            </footer>
            <Button
              disabled={isPending}
              className="uppercase w-fit rounded-full font-bold bg-card text-secondary min-w-24">
              {
                isPending
                  ? "sending"
                  : "post"
              }</Button>
          </form>
        </Form>
        <Toaster />
      </article>
      <PeopleList
        onSelectUser={addInvitedUser}
        users={users.available} />
    </section>
  )
}
