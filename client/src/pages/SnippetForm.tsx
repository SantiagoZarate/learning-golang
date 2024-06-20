import { PlusIcon } from "@/components/icons/PlusIcon";
import { SendIcon } from "@/components/icons/SendIcon";
import { UsersMicroIcon } from "@/components/icons/UsersMicroIcon";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/toaster";
import users from '@/data/users.json';
import { useGlobalContext } from "@/hooks/useGlobalContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from '@tanstack/react-query';
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";

const snippetSchema = z.object({
  title: z.string(),
  content: z.string()
})

type SnippetFormType = z.infer<typeof snippetSchema>

const createSnippet = (snippet: SnippetFormType) => {
  console.log("creando")

  return fetch('https://dummyjson.com/posts/add', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(snippet)
  })
}

export function SnippetForm() {
  const { userIsLogged } = useGlobalContext()
  const { isPending, mutate } = useMutation({
    mutationKey: ["snippets"],
    mutationFn: createSnippet,
    onMutate: () => {
      console.log("Enviando peticion")
    },
    onSuccess: () => {
      console.log("Snippet added succesfully")
    },
    onError: () => {
      console.log("There was an error while creating a snippetbox")
    }
  });
  const form = useForm<SnippetFormType>({
    resolver: zodResolver(snippetSchema)
  })

  const onSubmit = (data: SnippetFormType) => {
    mutate(data)
    console.log(data)
  }

  return (
    <section className="fixed w-1/4 flex flex-col gap-4 items-center justify-center">
      {
        userIsLogged &&
        <div className="absolute z-20 flex flex-col gap-4 transition duration-300 opacity-0 hover:opacity-100 backdrop-blur-md inset-0 justify-center items-center">
          <p>You must log on to create a a new snippet</p>
          <Link to={"/login"}>
            <Button>
              log in
            </Button>
          </Link>
        </div>
      }
      <article className="w-full flex flex-col gap-4">
        <header className="flex items-center border-b border-t divide-x">
          <span className="p-6">
            <SendIcon />
          </span>
          <span className="p-2 text-sm flex flex-col gap-1">
            <h2>Create a new snippetbox</h2>
            <p className="text-xs text-secondary">Up to 140 chars!</p>
          </span>
        </header>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
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
                      placeholder="howdy!" />
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
            <Toaster />
            <Button disabled={isPending} className="uppercase w-fit rounded-full font-bold bg-card text-secondary">post</Button>
          </form>
        </Form>
      </article>
      <article className="w-full flex flex-col gap-4">
        <header className="flex items-center divide-x border-b border-t">
          <span className="p-6">
            <UsersMicroIcon />
          </span>
          <span className="p-2 text-sm flex flex-col gap-1">
            <h2>Choose who you want to see it</h2>
            <p className="text-xs text-secondary">By default everybody it'll be public</p>
          </span>
        </header>
        <ul className="flex flex-wrap gap-8 justify-center">
          {
            users.map(n => (
              <li key={n.pfp} className="cursor-pointer aspect-square hover:-translate-y-1 transition w-16 rounded-full overflow-hidden border-border">
                <img className="w-full h-full bg-muted object-center" src={n.pfp} alt="" />
              </li>
            ))
          }
          <li className="cursor-pointer aspect-square w-16 rounded-full flex items-center hover:-translate-y-1 transition justify-center overflow-hidden border-border bg-border object-center">
            <PlusIcon />
          </li>
        </ul>
      </article>
    </section>
  )
}
